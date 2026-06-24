package main

import (
	"log"

	"alliance-system/backend-go/internal/infrastructure/config"
	"alliance-system/backend-go/internal/infrastructure/persistence/sqlite"
	"alliance-system/backend-go/internal/interfaces/http"
)

func main() {
	cfg, err := config.Load(true)
	if err != nil {
		log.Fatal(err)
	}

	store := sqlite.New(cfg.SQLitePath)
	if err := store.Load(); err != nil {
		log.Fatal(err)
	}

	router := http.NewRouter(cfg, store)
	if err := router.Run("0.0.0.0:" + cfg.Port); err != nil {
		log.Fatal(err)
	}
}
