package models

import (
	"errors"
	"fmt"

	"example.com/backend/db"
	"example.com/backend/utils"
)

type User struct {
	Id       int64
	Email    string `binding:"required"`
	Name     string
	Password string `binding:"required"`
}

func GetUsers() ([]User, error) {
	query := "select * from users"

	rows, err := db.DB.Query(query)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}

	defer rows.Close()

	var users []User
	for rows.Next() {
		var u User
		err = rows.Scan(&u.Id, &u.Email, &u.Name, &u.Password)
		if err != nil {
			panic(err)
		}

		users = append(users, u)
	}

	return users, nil
}

func (u User) Save() (*User, error) {
	query := "insert into users (email, name, password) values ($1, $2, $3) returning id"

	hashedPassword, err := utils.HashPassword(u.Password)
	if err != nil {
		return nil, err
	}

	var returningId int64
	err = db.DB.QueryRow(
		query,
		u.Email,
		u.Name,
		hashedPassword,
	).Scan(&returningId)

	u.Id = returningId

	return &u, err
}

func GetUserById(id int64) (*User, error) {
	query := "select * from users where id=$1"

	var u User
	err := db.DB.QueryRow(query, id).Scan(&u.Id, &u.Email, &u.Name, &u.Password)

	return &u, err
}

func (u User) Update() error {
	query := "update users set email=$1, name=$2, password=$3 where id=$4"

	hashedPassword, err := utils.HashPassword(u.Password)
	if err != nil {
		return err
	}

	_, err = db.DB.Exec(
		query,
		u.Email,
		u.Name,
		hashedPassword,
		u.Id,
	)

	return err
}

func (u *User) ValidateCredentials() error {
	query := `select id, password from users where email=$1`

	r := db.DB.QueryRow(query, u.Email)

	var retrievedPassword string
	err := r.Scan(&u.Id, &retrievedPassword)
	if err != nil {
		return err
	}

	passwordIsValid := utils.CheckPasswordHash(u.Password, retrievedPassword)

	if !passwordIsValid {
		return errors.New("Invalid credentials")
	}

	return nil
}
