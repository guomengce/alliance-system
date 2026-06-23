package ports

import "alliance-system/backend-go/internal/business/domain"

type Store interface {
	Load() error
	View(func(domain.Database) error) error
	Update(func(*domain.Database) error) error
	FindUser(email string) (domain.User, bool)
}
