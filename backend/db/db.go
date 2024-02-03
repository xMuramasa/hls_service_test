package db

import (
	"database/sql"
	"os"

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
	psqlInfo := os.Getenv("DATABASE_URL")
	// psqlInfo := fmt.Sprintf("port=%d user=%s password=%s dbname=%s sslmode=disable", port, dbuser, dbpass, dbname)

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

}
