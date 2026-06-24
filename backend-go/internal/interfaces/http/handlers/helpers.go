package handlers

import "strings"

func trimWrappedError(err error, prefix string) string {
	return strings.TrimPrefix(err.Error(), prefix)
}
