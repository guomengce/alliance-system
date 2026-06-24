package main

import (
	"encoding/json"
	"log"
	"os"

	"alliance-system/backend-go/internal/business/domain"
	"alliance-system/backend-go/internal/infrastructure/config"
	"alliance-system/backend-go/internal/infrastructure/persistence/sqlite"
)

func main() {
	cfg, err := config.Load(false)
	if err != nil {
		log.Fatal(err)
	}

	payload, err := os.ReadFile(cfg.JSONSeedPath)
	if err != nil {
		log.Fatal(err)
	}

	var data domain.Database
	if err := json.Unmarshal(payload, &data); err != nil {
		log.Fatal(err)
	}

	store := sqlite.New(cfg.SQLitePath)
	if err := store.Load(); err != nil {
		log.Fatal(err)
	}
	if err := store.Replace(data); err != nil {
		log.Fatal(err)
	}

	log.Printf("migrated %d users into %s", len(data.Users), cfg.SQLitePath)
}
