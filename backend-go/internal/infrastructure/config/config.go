package config

import (
	"errors"
	"os"
	"strconv"
	"strings"
)

const developmentAuthSecret = "dev-alliance-secret-change-me"

type Config struct {
	Mode           string
	Port           string
	AuthSecret     string
	SQLitePath     string
	JSONSeedPath   string
	PublicDir      string
	AllowedOrigins []string
}

func Load(validateProduction bool) (Config, error) {
	mode := getenv("NODE_ENV", "development")
	port := getenv("PORT", "3001")
	if n, err := strconv.Atoi(port); err != nil || n < 1 || n > 65535 {
		return Config{}, errors.New("PORT must be an integer between 1 and 65535")
	}

	cfg := Config{
		Mode:           mode,
		Port:           port,
		AuthSecret:     getenv("AUTH_SECRET", developmentAuthSecret),
		SQLitePath:     getenv("ALLIANCE_SQLITE_PATH", "./alliance.sqlite"),
		JSONSeedPath:   getenv("ALLIANCE_JSON_SEED_PATH", "./db.json"),
		PublicDir:      getenv("ALLIANCE_PUBLIC_DIR", "../dist/public"),
		AllowedOrigins: parseOrigins(os.Getenv("ALLIANCE_ALLOWED_ORIGINS")),
	}

	if validateProduction && cfg.Mode == "production" {
		if cfg.AuthSecret == "" || cfg.AuthSecret == developmentAuthSecret || len(cfg.AuthSecret) < 32 {
			return Config{}, errors.New("AUTH_SECRET must be set to a production-only secret with at least 32 characters")
		}
		if os.Getenv("ALLIANCE_ALLOWED_ORIGINS") == "" {
			return Config{}, errors.New("ALLIANCE_ALLOWED_ORIGINS must be set explicitly in production")
		}
	}

	return cfg, nil
}

func getenv(key string, fallback string) string {
	value := os.Getenv(key)
	if value == "" {
		return fallback
	}
	return value
}

func parseOrigins(value string) []string {
	if value == "" {
		return []string{"http://localhost:3000", "http://localhost:5173"}
	}
	parts := strings.Split(value, ",")
	origins := make([]string, 0, len(parts))
	for _, part := range parts {
		origin := strings.TrimSpace(part)
		if origin != "" {
			origins = append(origins, origin)
		}
	}
	return origins
}
