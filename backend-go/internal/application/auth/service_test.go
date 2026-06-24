package auth

import (
	"testing"

	"alliance-system/backend-go/internal/business/domain"
	"alliance-system/backend-go/internal/infrastructure/config"
	"alliance-system/backend-go/internal/infrastructure/security"
)

func TestRegisterStoresPasswordOnlyOnUser(t *testing.T) {
	store := newMemoryStore(domain.Database{})
	service := NewService(config.Config{AuthSecret: "test-secret"}, store)

	result, err := service.Register(RegisterCommand{
		Email:    "client@example.com",
		Nickname: "Client",
		Password: "secret",
	})
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if result.User.Password != "" {
		t.Fatal("expected response user to be sanitized")
	}
	if len(store.db.Users) != 1 {
		t.Fatalf("expected one user, got %d", len(store.db.Users))
	}
	if !security.VerifyPassword("secret", store.db.Users[0].Password) {
		t.Fatal("expected user password to be hashed")
	}
	if len(store.db.Downlines) != 1 {
		t.Fatalf("expected one downline, got %d", len(store.db.Downlines))
	}
	if store.db.Downlines[0].Password != "" {
		t.Fatal("expected downline password to be omitted")
	}
}

func TestUniqueDownlineUIDSkipsExistingUIDs(t *testing.T) {
	db := domain.Database{Downlines: []domain.Downline{{UID: "111111"}, {UID: "222222"}}}
	candidates := []string{"111111", "222222", "333333"}
	index := 0

	uid := uniqueDownlineUID(db, func() string {
		candidate := candidates[index]
		index++
		return candidate
	})

	if uid != "333333" {
		t.Fatalf("expected unique uid 333333, got %q", uid)
	}
}

type memoryStore struct {
	db domain.Database
}

func newMemoryStore(db domain.Database) *memoryStore {
	return &memoryStore{db: db}
}

func (s *memoryStore) Load() error {
	return nil
}

func (s *memoryStore) View(fn func(domain.Database) error) error {
	return fn(s.db)
}

func (s *memoryStore) Update(fn func(*domain.Database) error) error {
	return fn(&s.db)
}

func (s *memoryStore) FindUser(email string) (domain.User, bool) {
	for _, user := range s.db.Users {
		if domain.SameEmail(user.Email, email) {
			return user, true
		}
	}
	return domain.User{}, false
}
