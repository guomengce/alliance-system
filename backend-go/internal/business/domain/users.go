package domain

import (
	"errors"
	"strings"
)

func SameEmail(left string, right string) bool {
	return strings.EqualFold(strings.TrimSpace(left), strings.TrimSpace(right))
}

func UpdateUser(db *Database, email string, update func(*User)) (User, error) {
	for i := range db.Users {
		if SameEmail(db.Users[i].Email, email) {
			update(&db.Users[i])
			syncDownlineUser(&db.Downlines, db.Users[i])
			return db.Users[i], nil
		}
	}
	return User{}, errors.New("用户未找到")
}

func syncDownlineUser(downlines *[]Downline, user User) {
	for i := range *downlines {
		if (*downlines)[i].Email != "" && SameEmail((*downlines)[i].Email, user.Email) {
			(*downlines)[i].Nickname = user.Nickname
			(*downlines)[i].Password = ""
			(*downlines)[i].USDTBalance = user.USDTBalance
			(*downlines)[i].TROOBalance = user.TROOBalance
			(*downlines)[i].PendingBalance = user.PendingBalance
		}
	}
}
