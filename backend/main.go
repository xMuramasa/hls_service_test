package main

import (
	"example.com/backend/db"
	"example.com/backend/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {

	db.InitDB()

	server := gin.Default()

	config := cors.DefaultConfig()

	config.AllowAllOrigins = true
	config.AllowCredentials = true

	config.ExposeHeaders = []string{"Authorization", "Accept-Encoding", "Content-Type"}

	config.AddAllowHeaders("Authorization")

	server.Use(cors.New(config))

	routes.RegisterRoutes(server)

	server.Run(":8080") // localhost

}
