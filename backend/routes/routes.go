package routes

import (
	"net/http"

	"example.com/backend/middlewares"
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(server *gin.Engine) {

	server.GET("/", getAPIUp)

	server.POST("/signup", signup)
	server.POST("/login", login)

	authenticated := server.Group("/")
	authenticated.Use(middlewares.Authenticate)

	authenticated.PUT("/users/:id", updateUser)

	authenticated.GET("/videos", getVideoList)
	authenticated.StaticFS("/video/play", http.Dir("./static/videos"))
	authenticated.GET("/video/:name", getStream)

}

func getAPIUp(ctx *gin.Context) {
	ctx.JSON(
		http.StatusOK,
		gin.H{
			"message": "API is up and running",
		})
}
