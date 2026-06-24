package presenters

import (
	"testing"

	"alliance-system/backend-go/internal/business/domain"
)

func TestSanitizeUserRemovesPassword(t *testing.T) {
	user := SanitizeUser(domain.User{Email: "client@example.com", Password: "secret"})

	if user.Password != "" {
		t.Fatalf("expected password to be removed, got %q", user.Password)
	}
}

func TestSanitizeDownlinesRemovesPasswordsWithoutMutatingInput(t *testing.T) {
	input := []domain.Downline{{Email: "client@example.com", Password: "secret"}}

	out := SanitizeDownlines(input)

	if out[0].Password != "" {
		t.Fatalf("expected password to be removed, got %q", out[0].Password)
	}
	if input[0].Password != "secret" {
		t.Fatalf("expected input not to be mutated, got %q", input[0].Password)
	}
}
