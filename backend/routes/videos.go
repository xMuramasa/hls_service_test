package routes

import (
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

type Video struct {
	Name string `json:"name"`
}

const videoPath = "./static/videos/"

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

var segments []string = []string{"segment0.ts\n", "segment1.ts\n", "segment2.ts\n"}

func getStream(ctx *gin.Context) {

	videoID := ctx.Param("name")
	segmentString := "segment%d.ts\n"
	totalSegments := 0

	sgmtsFp, err := os.ReadDir(videoPath + videoID)
	if err != nil {
		ctx.JSON(
			http.StatusInternalServerError,
			gin.H{"message": "Could not fetch video segments"},
		)
		return
	}

	for _, e := range sgmtsFp {
		fExt := strings.Split(e.Name(), ".")
		if len(fExt) != 1 && strings.Contains(fExt[0], "seg") && fExt[1] != "m3u8" {
			totalSegments++
		}
	}

	segmentDuration := 10.0

	fileString := "#EXTM3U"
	fileString += "\n#EXT-X-VERSION:3"
	fileString += "\n#EXT-X-TARGETDURATION:" + fmt.Sprint(segmentDuration)
	fileString += "\n#EXT-X-MEDIA-SEQUENCE:%d\n"

	// first secuence
	seqId := 0
	fileStringFirst := fmt.Sprintf(fileString, seqId)
	seqId++

	segCount := 0
	for segCount = 0; segCount < 3; segCount++ {
		fileStringFirst += fmt.Sprintf("#EXTINF: %.6f,\n", segmentDuration)
		fileStringFirst += fmt.Sprintf(segmentString, segCount)
	}

	err = os.WriteFile(videoPath+videoID+"/video_"+videoID+".m3u8", []byte(fileStringFirst), 0666)
	if err != nil {
		ctx.JSON(
			http.StatusInternalServerError,
			gin.H{"message": "Could not write m3u8 file"},
		)
		return
	}

	// update file every 10 seconds
	tk := time.NewTicker(10 * time.Second)

	// segments starts from 3
	fmt.Println()
	go func() {
		for i := segCount; i < totalSegments; i++ {
			select {
			case <-tk.C:
				// remove first segment from list and add new
				segments = append(segments[1:], fmt.Sprintf(segmentString, segCount))
				// create new m3u8 file
				fileStringLoop := fmt.Sprintf(fileString, seqId)
				for _, seg := range segments {
					fileStringLoop += fmt.Sprintf("#EXTINF: %.6f,\n", segmentDuration)
					fileStringLoop += seg
				}
				if i+1 == totalSegments {
					fileStringLoop += "#EXT-X-ENDLIST"
				}

				err = os.WriteFile(videoPath+videoID+"/video_"+videoID+".m3u8", []byte(fileStringLoop), 0666)
				if err != nil {
					ctx.JSON(
						http.StatusInternalServerError,
						gin.H{"message": "Could not write m3u8 file"},
					)
					return
				}
			}
			seqId++
			segCount++

		}
	}()

	ctx.JSON(
		http.StatusOK,
		gin.H{
			"message": "Video is being streamed",
		},
	)
}
