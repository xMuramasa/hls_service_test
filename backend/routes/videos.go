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
		// match, _ := regexp.MatchString("([a-z]+).m3u8", e.Name())
		// if match {
		// 	videos = append(videos, e.Name())
		// }

	}
	ctx.JSON(
		http.StatusOK,
		gin.H{"videos": videos},
	)
}

/*

func getEvents(ctx *gin.Context) {

	events, err := models.GetAllEvents()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError,
			gin.H{
				"message": "Could not fetch events",
			},
		)
		return
	}
	ctx.JSON(
		http.StatusOK,
		events,
	)
}


func createEvent(ctx *gin.Context) {

	id := ctx.GetInt64("id")

	var event models.Event
	err := ctx.ShouldBindJSON(&event)
	if err != nil {
		fmt.Println(err)
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{
				"message": "Could not parse data",
			},
		)
		return
	}

	event.UserId = id

	err = event.Save()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError,
			gin.H{
				"message": "Could not create events",
			},
		)
		return
	}

	ctx.JSON(
		http.StatusCreated,
		gin.H{
			"message": "Event created",
		},
	)

}

func updateEvent(ctx *gin.Context) {
	eId, err := strconv.ParseInt(ctx.Param("id"), 10, 64)
	if err != nil {
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"message": "Invalid id"},
		)
		return
	}

	id := ctx.GetInt64("id")

	e, err := models.GetEventById(eId)
	if err != nil {
		ctx.JSON(
			http.StatusInternalServerError,
			gin.H{"message": "Event does not exist"},
		)
		return
	}

	if e.UserId != id {
		ctx.JSON(http.StatusUnauthorized, gin.H{"message": "unauthorized delete"})
		return
	}

	var updatedEvent models.Event
	err = ctx.ShouldBindJSON(&updatedEvent)
	if err != nil {
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{
				"message": "Could not parse data",
			},
		)
		return
	}

	updatedEvent.Id = eId
	err = updatedEvent.Update()
	if err != nil {
		fmt.Println(err)
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{
				"message": "Could not update event",
			},
		)
		return
	}

	ctx.JSON(
		http.StatusOK,
		gin.H{
			"message": "Event updated",
		},
	)
}

func deleteEvent(ctx *gin.Context) {
	id := ctx.GetInt64("id")

	eId, err := strconv.ParseInt(ctx.Param("id"), 10, 64)
	if err != nil {
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"message": "Invalid id"},
		)
		return
	}

	event, err := models.GetEventById(eId)
	if err != nil {
		ctx.JSON(
			http.StatusInternalServerError,
			gin.H{"message": "Event does not exist"},
		)
		return
	}

	if event.UserId != id {
		ctx.JSON(http.StatusUnauthorized, gin.H{"message": "unauthorized update"})
		return
	}

	err = event.Delete()
	if err != nil {
		ctx.JSON(
			http.StatusInternalServerError,
			gin.H{"message": "Event could not be deleted"},
		)
		return
	}

	ctx.JSON(
		http.StatusOK,
		gin.H{"message": "Event deleted"},
	)

}
*/
