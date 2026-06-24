package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	catalogapp "alliance-system/backend-go/internal/application/catalog"
	"alliance-system/backend-go/internal/application/ports"
)

type Catalog struct {
	service *catalogapp.Service
}

func NewCatalog(dataStore ports.Store) *Catalog {
	return &Catalog{service: catalogapp.NewService(dataStore)}
}

func (h *Catalog) GetParameters(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"parameters": h.service.Parameters()})
}

func (h *Catalog) GetPlans(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"plans": h.service.Plans()})
}
