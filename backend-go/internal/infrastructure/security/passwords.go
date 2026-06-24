package security

import (
	"crypto/rand"
	"crypto/subtle"
	"encoding/base64"
	"strings"

	"golang.org/x/crypto/scrypt"
)

const keyLength = 64

func IsPasswordHash(value string) bool {
	return strings.HasPrefix(value, "scrypt$")
}

func HashPassword(password string) (string, error) {
	saltBytes := make([]byte, 16)
	if _, err := rand.Read(saltBytes); err != nil {
		return "", err
	}
	salt := base64.RawURLEncoding.EncodeToString(saltBytes)
	hash, err := scrypt.Key([]byte(password), []byte(salt), 16384, 8, 1, keyLength)
	if err != nil {
		return "", err
	}
	return "scrypt$" + salt + "$" + base64.RawURLEncoding.EncodeToString(hash), nil
}

func VerifyPassword(password string, stored string) bool {
	if !IsPasswordHash(stored) {
		return stored == password
	}

	parts := strings.Split(stored, "$")
	if len(parts) != 3 {
		return false
	}

	hash, err := scrypt.Key([]byte(password), []byte(parts[1]), 16384, 8, 1, keyLength)
	if err != nil {
		return false
	}
	storedHash, err := base64.RawURLEncoding.DecodeString(parts[2])
	if err != nil || len(storedHash) != len(hash) {
		return false
	}
	return subtle.ConstantTimeCompare(storedHash, hash) == 1
}
