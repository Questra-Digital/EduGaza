package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func main() {
	r := gin.Default()

	// Simple endpoint
	r.GET("/notifications", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Parental Control Notifications working 🚀",
		})
	})

	// run on 8085 so no conflict
	r.Run(":8085")
}
