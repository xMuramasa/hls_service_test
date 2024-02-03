package models

import (
	"fmt"

	"example.com/backend/db"
)

type Video struct {
	Id       int64
	Name     string `binding:"required"`
	Metadata string
}

func GetVideoById(id int64) (Video, error) {

	query := "select * from events where id = $1"
	var v Video

	row := db.DB.QueryRow(query, id)
	err := row.Scan(&v.Id, &v.Name, &v.Metadata)
	if err != nil {
		fmt.Println(err)
		return v, err
	}

	return v, nil
}

func (v Video) Register(uId int64) error {
	query := "insert into registrations (user_id, video_id) values ($1, $2) returning id"
	var returningId int64
	err := db.DB.QueryRow(
		query,
		uId,
		v.Id,
	).Scan(&returningId)

	return err
}

func (v Video) CancelRegistration(uId int64) error {
	query := "delete from registrations where user_id=$1 and video_id=$2"
	stmt, err := db.DB.Prepare(query)
	if err != nil {
		fmt.Println(err)
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(uId, v.Id)
	return err
}
