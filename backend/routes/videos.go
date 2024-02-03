package routes

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

type Video struct {
	Name string `json:"name"`
}

func getVideoList(ctx *gin.Context) {
	entries, err := os.ReadDir("./static/videos")
	if err != nil {
		ctx.JSON(
			http.StatusInternalServerError,
			gin.H{"message": "Could not fetch videos"},
		)
		return
	}
	var videos []Video

	for _, e := range entries {
		var video Video
		video.Name = e.Name()
		videos = append(videos, video)
	}
	ctx.JSON(
		http.StatusOK,
		gin.H{"videos": videos},
	)
}
