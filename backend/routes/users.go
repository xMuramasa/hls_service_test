package routes

import (
	"fmt"
	"net/http"
	"strconv"

	"example.com/backend/models"
	"example.com/backend/utils"
	"github.com/gin-gonic/gin"
)

func getUsers(ctx *gin.Context) {
	users, err := models.GetUsers()
	if err != nil {
		ctx.JSON(
			http.StatusInternalServerError,
			gin.H{"message": "Could not fetch users"},
		)
		return
	}

	ctx.JSON(
		http.StatusOK,
		gin.H{"users": users},
	)
}

func signup(ctx *gin.Context) {
	var user models.User

	err := ctx.ShouldBindJSON(&user)
	if err != nil {
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{
				"message": "Could not parse user data",
			},
		)
		return
	}

	u, err := user.Save()
	if err != nil {
		ctx.JSON(
			http.StatusInternalServerError,
			gin.H{
				"user":    nil,
				"message": "Could not create user",
			},
		)
		return
	}

	ctx.JSON(
		http.StatusOK,
		gin.H{
			"message": "User created",
			"user":    u,
		},
	)

}

func updateUser(ctx *gin.Context) {

	uId, err := strconv.ParseInt(ctx.Param("id"), 10, 64)
	if err != nil {
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"message": "Invalid id"},
		)
		return
	}

	id := ctx.GetInt64("id")
	if id != uId {
		ctx.JSON(
			http.StatusUnauthorized,
			gin.H{"message": "Unauthorized"},
		)
		return
	}

	// check if user Exists
	prevInfo, err := models.GetUserById(uId)
	if err != nil {
		ctx.JSON(
			http.StatusInternalServerError,
			gin.H{"message": "User does not exist"},
		)
		return
	}

	var user models.User
	// parse new user data
	err = ctx.ShouldBindJSON(&user)
	if err != nil {
		fmt.Println(err)
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"message": "Could not parse data"},
		)
		return
	}

	// complete user info
	user.Id = uId
	if user.Email == "" {
		user.Email = prevInfo.Email
	}
	if user.Name == "" {
		user.Name = prevInfo.Name
	}
	if user.Password == "" {
		user.Password = prevInfo.Password
	}

	// update user info
	err = user.Update()
	if err != nil {
		ctx.JSON(
			http.StatusInternalServerError,
			gin.H{"message": "Could not update user"},
		)
		return
	}

	ctx.JSON(
		http.StatusOK,
		gin.H{"message": "User updated"},
	)
}

func login(ctx *gin.Context) {
	var user models.User

	err := ctx.ShouldBindJSON(&user)
	if err != nil {
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"message": "Could not parse data"},
		)
		return
	}

	err = user.ValidateCredentials()
	if err != nil {
		ctx.JSON(
			http.StatusUnauthorized,
			gin.H{"mesasge": err.Error()},
		)
		return
	}

	tok, err := utils.GenerateToken(user.Email, user.Id)
	if err != nil {
		ctx.JSON(
			http.StatusInternalServerError,
			gin.H{"mesasge": err.Error()},
		)
		return
	}

	ctx.JSON(
		http.StatusOK,
		gin.H{"message": "login succesful", "token": tok},
	)

}
