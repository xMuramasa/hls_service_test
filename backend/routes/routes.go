package routes

import (
	"net/http"

	"example.com/backend/middlewares"
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(server *gin.Engine) {

	server.GET("/", getAPIUp)

	authenticated := server.Group("/")
	authenticated.Use(middlewares.Authenticate)

	authenticated.GET("/users", getUsers)
	authenticated.PUT("/users/:id", updateUser)

	authenticated.GET("/videos", getVideoList)
	server.StaticFS("/videos", http.Dir("./static/videos"))

	server.POST("/signup", signup)
	server.POST("/login", login)

}

func getAPIUp(ctx *gin.Context) {
	ctx.JSON(
		http.StatusOK,
		gin.H{
			"message": "API is up and running",
		})
}
