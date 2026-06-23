package presenters

import "alliance-system/backend-go/internal/business/domain"

func SanitizeUser(user domain.User) domain.User {
	user.Password = ""
	return user
}

func SanitizeDownlines(downlines []domain.Downline) []domain.Downline {
	out := make([]domain.Downline, len(downlines))
	copy(out, downlines)
	for i := range out {
		out[i].Password = ""
	}
	return out
}
