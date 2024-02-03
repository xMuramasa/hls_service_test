# HlsVideo Backend

## Project for a streaming service api using docker + golang

This is a [Go](https://go.dev/) project

## How to run

- Change the connection string in `./backend/db/db.go` file to the correct database connection string depending on your setup

```go
// psqlInfo := os.Getenv("DATABASE_URL")
psqlInfo := fmt.Sprintf("port=%d user=%s password=%s dbname=%s sslmode=disable", port, dbuser, dbpass, dbname)
```

### Localhost

- Run the app with `go run .`

### Docker

- cd to the root of the project and run `docker compose build backend`
- And then `docker compose up backend`