package catalog

import (
	"alliance-system/backend-go/internal/application/ports"
	"alliance-system/backend-go/internal/business/domain"
)

type Service struct {
	store ports.Store
}

func NewService(dataStore ports.Store) *Service {
	return &Service{store: dataStore}
}

func (s *Service) Parameters() *domain.Parameters {
	var params *domain.Parameters
	_ = s.store.View(func(db domain.Database) error {
		params = db.Parameters
		return nil
	})
	return params
}

func (s *Service) Plans() []domain.Plan {
	var plans []domain.Plan
	_ = s.store.View(func(db domain.Database) error {
		plans = append(plans, db.Plans...)
		return nil
	})
	return plans
}
