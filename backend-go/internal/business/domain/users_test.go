package domain

import "testing"

func TestUpdateUserSynchronizesMatchingDownline(t *testing.T) {
	db := Database{
		Users: []User{{
			Email:       "client@example.com",
			Nickname:    "Old",
			Password:    "old-password",
			USDTBalance: 10,
			TROOBalance: 20,
		}},
		Downlines: []Downline{{
			Email:       "CLIENT@example.com",
			Nickname:    "Old",
			Password:    "old-password",
			USDTBalance: 10,
			TROOBalance: 20,
		}},
	}

	user, err := UpdateUser(&db, " client@example.com ", func(u *User) {
		u.Nickname = "New"
		u.Password = "new-password"
		u.USDTBalance = 35
		u.TROOBalance = 45
		u.PendingBalance = 55
	})
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if user.Nickname != "New" {
		t.Fatalf("expected updated user nickname, got %q", user.Nickname)
	}
	if db.Downlines[0].Nickname != "New" {
		t.Fatalf("expected downline nickname to sync, got %#v", db.Downlines[0])
	}
	if db.Downlines[0].Password != "" {
		t.Fatalf("expected downline password to be omitted, got %#v", db.Downlines[0])
	}
	if db.Downlines[0].USDTBalance != 35 || db.Downlines[0].TROOBalance != 45 || db.Downlines[0].PendingBalance != 55 {
		t.Fatalf("expected downline balances to sync, got %#v", db.Downlines[0])
	}
}

func TestSameEmailTrimsAndIgnoresCase(t *testing.T) {
	if !SameEmail(" Client@Example.com ", "client@example.com") {
		t.Fatal("expected emails to match regardless of spaces and case")
	}
}
