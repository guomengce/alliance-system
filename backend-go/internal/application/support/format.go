package support

import (
	"crypto/rand"
	"strings"
	"time"
)

func NowText() string {
	return time.Now().Format("2006-01-02 15:04:05")
}

func RandomDigits(length int) string {
	data := make([]byte, length)
	_, _ = rand.Read(data)
	var b strings.Builder
	for _, item := range data {
		b.WriteByte(byte('0' + item%10))
	}
	return b.String()
}
