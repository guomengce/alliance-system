package support

import (
	"regexp"
	"testing"
)

func TestNowTextUsesSystemTimestampFormat(t *testing.T) {
	got := NowText()
	if !regexp.MustCompile(`^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$`).MatchString(got) {
		t.Fatalf("unexpected timestamp format: %q", got)
	}
}

func TestRandomDigitsReturnsRequestedLength(t *testing.T) {
	got := RandomDigits(10)
	if len(got) != 10 {
		t.Fatalf("expected 10 digits, got %d in %q", len(got), got)
	}
	if !regexp.MustCompile(`^\d{10}$`).MatchString(got) {
		t.Fatalf("expected only digits, got %q", got)
	}
}
