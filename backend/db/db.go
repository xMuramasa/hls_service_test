package db

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

var DB *sql.DB

const (
	host   = "posgres"
	port   = 5432
	dbname = "postgres"
	dbuser = "postgres"
	dbpass = "mysecretpassword"
)

func InitDB() {
	// psqlInfo := os.Getenv("DATABASE_URL")
	psqlInfo := fmt.Sprintf("port=%d user=%s password=%s dbname=%s sslmode=disable", port, dbuser, dbpass, dbname)

	var err error

	DB, err = sql.Open("postgres", psqlInfo)
	if err != nil {
		panic("Could not conect to postgres")
	}

	DB.SetMaxOpenConns(10)
	DB.SetMaxIdleConns(5)

	createTables()
}

func createTables() {
	createUsersTable := `
	create table if not exists users(
		id serial primary key,
		email text not null unique,
		name text not null,
		password text not null
	)`

	_, err := DB.Exec(createUsersTable)
	if err != nil {
		panic("Could not create users table")
	}

	createVideosTable := `
	create table if not exists videos(
		id serial primary key,
		name text not null,
		metadata text not null
	)`

	_, err = DB.Exec(createVideosTable)
	if err != nil {
		panic("Could not create videos table")
	}

	// createRegistrationsTable := `
	// create table if not exists registrations(
	// 	id serial primary key,
	// 	user_id serial references users(id),
	// 	event_id serial references events(id)
	// )`

	// _, err = DB.Exec(createRegistrationsTable)
	// if err != nil {
	// 	panic("Could not create registrations table")
	// }
}
