package wallet

import (
	"strings"

	"alliance-system/backend-go/internal/business/domain"
)

type MarkNotificationsCommand struct {
	Email   string
	ID      string
	MarkAll bool
}

type NotificationsResult struct {
	Notifications []domain.Notification
}

func (s *Service) MarkNotificationsRead(cmd MarkNotificationsCommand) (NotificationsResult, error) {
	if strings.TrimSpace(cmd.Email) == "" {
		return NotificationsResult{}, ErrMissingEmail
	}

	var notifications []domain.Notification
	_ = s.store.Update(func(db *domain.Database) error {
		for i := range db.Notifications {
			if domain.SameEmail(db.Notifications[i].UserEmail, cmd.Email) && (cmd.MarkAll || db.Notifications[i].ID == cmd.ID) {
				db.Notifications[i].IsUnread = false
			}
			if domain.SameEmail(db.Notifications[i].UserEmail, cmd.Email) {
				notifications = append(notifications, db.Notifications[i])
			}
		}
		return nil
	})
	return NotificationsResult{Notifications: notifications}, nil
}

func (s *Service) ClearNotifications(email string) (NotificationsResult, error) {
	if strings.TrimSpace(email) == "" {
		return NotificationsResult{}, ErrMissingEmail
	}
	_ = s.store.Update(func(db *domain.Database) error {
		filtered := db.Notifications[:0]
		for _, item := range db.Notifications {
			if !domain.SameEmail(item.UserEmail, email) {
				filtered = append(filtered, item)
			}
		}
		db.Notifications = filtered
		return nil
	})
	return NotificationsResult{Notifications: []domain.Notification{}}, nil
}
