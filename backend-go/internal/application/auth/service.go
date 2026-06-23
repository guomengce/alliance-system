package auth

import (
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"encoding/hex"
	"errors"
	"strings"
	"time"

	"alliance-system/backend-go/internal/application/ports"
	"alliance-system/backend-go/internal/application/presenters"
	"alliance-system/backend-go/internal/application/support"
	"alliance-system/backend-go/internal/business/domain"
	"alliance-system/backend-go/internal/infrastructure/config"
	"alliance-system/backend-go/internal/infrastructure/security"
)

var (
	ErrMissingCredentials = errors.New("missing credentials")
	ErrUserNotFound       = errors.New("user not found")
	ErrBadPassword        = errors.New("bad password")
	ErrTokenCreation      = errors.New("token creation failed")
	ErrIncompleteRequest  = errors.New("incomplete request")
	ErrDuplicateEmail     = errors.New("duplicate email")
	ErrPasswordHash       = errors.New("password hash failed")
	ErrBadResetCode       = errors.New("bad reset code")
	ErrBadCurrentPassword = errors.New("bad current password")
)

type Service struct {
	cfg   config.Config
	store ports.Store
}

func NewService(cfg config.Config, dataStore ports.Store) *Service {
	return &Service{cfg: cfg, store: dataStore}
}

type LoginCommand struct {
	Email    string
	Password string
}

type AuthResult struct {
	User  domain.User
	Token string
}

func (s *Service) Login(cmd LoginCommand) (AuthResult, error) {
	if strings.TrimSpace(cmd.Email) == "" || cmd.Password == "" {
		return AuthResult{}, ErrMissingCredentials
	}
	user, ok := s.store.FindUser(cmd.Email)
	if !ok {
		return AuthResult{}, ErrUserNotFound
	}
	if !security.VerifyPassword(cmd.Password, user.Password) {
		return AuthResult{}, ErrBadPassword
	}
	if !security.IsPasswordHash(user.Password) {
		hash, err := security.HashPassword(cmd.Password)
		if err == nil {
			_ = s.store.Update(func(db *domain.Database) error {
				_, updateErr := domain.UpdateUser(db, user.Email, func(u *domain.User) {
					u.Password = hash
				})
				return updateErr
			})
			user.Password = hash
		}
	}
	token, err := security.CreateToken(user, s.cfg.AuthSecret)
	if err != nil {
		return AuthResult{}, ErrTokenCreation
	}
	return AuthResult{User: presenters.SanitizeUser(user), Token: token}, nil
}

func (s *Service) CurrentUser(email string) (domain.User, error) {
	user, ok := s.store.FindUser(email)
	if !ok {
		return domain.User{}, ErrUserNotFound
	}
	return presenters.SanitizeUser(user), nil
}

type RegisterCommand struct {
	Email    string
	Nickname string
	Password string
}

func (s *Service) Register(cmd RegisterCommand) (AuthResult, error) {
	cmd.Email = strings.TrimSpace(cmd.Email)
	cmd.Nickname = strings.TrimSpace(cmd.Nickname)
	if cmd.Email == "" || cmd.Nickname == "" || cmd.Password == "" {
		return AuthResult{}, ErrIncompleteRequest
	}
	if _, exists := s.store.FindUser(cmd.Email); exists {
		return AuthResult{}, ErrDuplicateEmail
	}
	passwordHash, err := security.HashPassword(cmd.Password)
	if err != nil {
		return AuthResult{}, ErrPasswordHash
	}

	var role *domain.Role
	portalMode := "client"
	nickname := cmd.Nickname
	if strings.HasSuffix(strings.ToLower(cmd.Email), "@alliance.system") {
		portalMode = "admin"
		operator := domain.RoleOperator
		role = &operator
		nickname += " (运营专员)"
	}

	user := domain.User{
		Email: cmd.Email, Password: passwordHash, Nickname: nickname, PortalMode: portalMode, Role: role,
		USDTBalance: 10000, TROOBalance: 20000, LockedQueueAmount: 3000, OriginalLockedQueue: 10000,
		ReleasedQueueAmount: 7000, CommissionPoolLimit: 40000, CommissionPoolRemaining: 5000,
		TotalCredit: 40000, RemainingCredit: 35000, TwoFAEnabled: true,
	}

	if err := s.store.Update(func(db *domain.Database) error {
		db.Users = append(db.Users, user)
		if portalMode == "client" {
			uid := uniqueDownlineUID(*db, func() string { return support.RandomDigits(6) })
			db.Downlines = append(db.Downlines, domain.Downline{
				UID: uid, Level: "L1", Tier: "标准账户",
				RegistrationDate: support.NowText()[:16], AvatarLetter: firstLetters(cmd.Nickname),
				Nickname: cmd.Nickname, Email: cmd.Email, Sponsor: "client@alliance.com",
				Status: "normal", USDTBalance: 10000, TROOBalance: 20000,
				KYCL1: "verified", KYCL2: "unverified", UserEmail: "client@alliance.com",
			})
		}
		return nil
	}); err != nil {
		return AuthResult{}, err
	}

	token, err := security.CreateToken(user, s.cfg.AuthSecret)
	if err != nil {
		return AuthResult{}, ErrTokenCreation
	}
	return AuthResult{User: presenters.SanitizeUser(user), Token: token}, nil
}

func (s *Service) RequestReset(email string) (string, error) {
	email = strings.TrimSpace(email)
	if email == "" {
		return "", ErrIncompleteRequest
	}
	if _, ok := s.store.FindUser(email); !ok {
		return "", ErrUserNotFound
	}

	token := randomToken()
	entry := domain.ResetToken{
		Email: email, TokenHash: sha256Hex(token),
		ExpiresAt: time.Now().Add(15 * time.Minute).UTC().Format(time.RFC3339),
		CreatedAt: time.Now().UTC().Format(time.RFC3339),
	}
	_ = s.store.Update(func(db *domain.Database) error {
		filtered := db.ResetTokens[:0]
		for _, item := range db.ResetTokens {
			if !strings.EqualFold(item.Email, email) || item.ConsumedAt != "" {
				filtered = append(filtered, item)
			}
		}
		db.ResetTokens = append(filtered, entry)
		return nil
	})
	return token, nil
}

type ResetPasswordCommand struct {
	Email       string
	Code        string
	NewPassword string
}

func (s *Service) ResetPassword(cmd ResetPasswordCommand) error {
	if strings.TrimSpace(cmd.Email) == "" || strings.TrimSpace(cmd.Code) == "" || cmd.NewPassword == "" {
		return ErrIncompleteRequest
	}
	hash, err := security.HashPassword(cmd.NewPassword)
	if err != nil {
		return ErrPasswordHash
	}
	err = s.store.Update(func(db *domain.Database) error {
		matched := false
		for i := range db.ResetTokens {
			item := &db.ResetTokens[i]
			if strings.EqualFold(item.Email, cmd.Email) && item.TokenHash == sha256Hex(cmd.Code) && item.ConsumedAt == "" {
				if expires, parseErr := time.Parse(time.RFC3339, item.ExpiresAt); parseErr != nil || expires.Before(time.Now()) {
					return ErrBadResetCode
				}
				item.ConsumedAt = time.Now().UTC().Format(time.RFC3339)
				matched = true
			}
		}
		if !matched {
			return ErrBadResetCode
		}
		_, updateErr := domain.UpdateUser(db, cmd.Email, func(u *domain.User) { u.Password = hash })
		return updateErr
	})
	if err != nil {
		return ErrBadResetCode
	}
	return nil
}

type UpdateProfileCommand struct {
	Email        string
	Nickname     *string
	TwoFAEnabled *bool
	Password     string
	NewPassword  string
}

func (s *Service) UpdateProfile(cmd UpdateProfileCommand) (domain.User, error) {
	var updated domain.User
	err := s.store.Update(func(db *domain.Database) error {
		var passwordErr error
		user, updateErr := domain.UpdateUser(db, cmd.Email, func(u *domain.User) {
			if cmd.Nickname != nil {
				u.Nickname = *cmd.Nickname
			}
			if cmd.TwoFAEnabled != nil {
				u.TwoFAEnabled = *cmd.TwoFAEnabled
			}
			if cmd.NewPassword != "" {
				if cmd.Password == "" || !security.VerifyPassword(cmd.Password, u.Password) {
					passwordErr = ErrBadCurrentPassword
					return
				}
				if hash, hashErr := security.HashPassword(cmd.NewPassword); hashErr == nil {
					u.Password = hash
				} else {
					passwordErr = hashErr
				}
			}
		})
		if updateErr == nil && passwordErr != nil {
			updateErr = passwordErr
		}
		updated = user
		return updateErr
	})
	if err != nil {
		return domain.User{}, err
	}
	return presenters.SanitizeUser(updated), nil
}

func uniqueDownlineUID(db domain.Database, next func() string) string {
	seen := map[string]bool{}
	for _, downline := range db.Downlines {
		uid := strings.TrimSpace(downline.UID)
		if uid != "" {
			seen[uid] = true
		}
	}
	for {
		uid := strings.TrimSpace(next())
		if uid == "" || seen[uid] {
			continue
		}
		return uid
	}
}

func randomToken() string {
	data := make([]byte, 24)
	_, _ = rand.Read(data)
	return base64.RawURLEncoding.EncodeToString(data)
}

func sha256Hex(value string) string {
	sum := sha256.Sum256([]byte(value))
	return hex.EncodeToString(sum[:])
}

func firstLetters(value string) string {
	trimmed := strings.TrimSpace(value)
	if len([]rune(trimmed)) >= 2 {
		return strings.ToUpper(string([]rune(trimmed)[:2]))
	}
	return strings.ToUpper(trimmed)
}
