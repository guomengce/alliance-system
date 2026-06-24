package security

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"errors"
	"strings"
	"time"

	"alliance-system/backend-go/internal/business/domain"
)

const TokenTTL = 8 * time.Hour

type Payload struct {
	Email      string       `json:"email"`
	PortalMode string       `json:"portalMode"`
	Role       *domain.Role `json:"role"`
	Exp        int64        `json:"exp"`
}

func CreateToken(user domain.User, secret string) (string, error) {
	payload := Payload{
		Email:      user.Email,
		PortalMode: user.PortalMode,
		Role:       user.Role,
		Exp:        time.Now().Add(TokenTTL).Unix(),
	}
	data, err := json.Marshal(payload)
	if err != nil {
		return "", err
	}
	encoded := base64.RawURLEncoding.EncodeToString(data)
	return encoded + "." + sign(encoded, secret), nil
}

func VerifyToken(token string, secret string) (Payload, error) {
	parts := strings.Split(token, ".")
	if len(parts) != 2 || parts[0] == "" || parts[1] == "" {
		return Payload{}, errors.New("invalid token")
	}
	if !hmac.Equal([]byte(parts[1]), []byte(sign(parts[0], secret))) {
		return Payload{}, errors.New("invalid signature")
	}
	raw, err := base64.RawURLEncoding.DecodeString(parts[0])
	if err != nil {
		return Payload{}, err
	}
	var payload Payload
	if err := json.Unmarshal(raw, &payload); err != nil {
		return Payload{}, err
	}
	if payload.Email == "" || payload.Exp < time.Now().Unix() {
		return Payload{}, errors.New("expired token")
	}
	return payload, nil
}

func sign(data string, secret string) string {
	mac := hmac.New(sha256.New, []byte(secret))
	mac.Write([]byte(data))
	return base64.RawURLEncoding.EncodeToString(mac.Sum(nil))
}
