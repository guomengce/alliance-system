package domain

import "testing"

func TestRound2RoundsToTwoDecimalPlaces(t *testing.T) {
	if got := Round2(12.345); got != 12.35 {
		t.Fatalf("expected 12.35, got %.2f", got)
	}
}

func TestRound2KeepsWholeValuesStable(t *testing.T) {
	if got := Round2(100); got != 100 {
		t.Fatalf("expected 100, got %.2f", got)
	}
}
