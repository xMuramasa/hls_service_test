package routes

import (
	"net/http"
	"os"
	"strconv"

	"example.com/backend/models"
	"github.com/gin-gonic/gin"
)

type Video struct {
	Name string `json:"name"`
}

func getVideo(ctx *gin.Context) {
	eId, err := strconv.ParseInt(ctx.Param("id"), 10, 64)
	if err != nil {
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"message": "Invalid id"},
		)
		return
	}
	event, err := models.GetVideoById(eId)
	if err != nil {
		ctx.JSON(
			http.StatusInternalServerError,
			gin.H{"message": "Could not fetch event"},
		)
		return
	}

	ctx.JSON(
		http.StatusOK,
		event,
	)

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
