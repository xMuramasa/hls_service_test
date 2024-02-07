# HLS service test demo

## Description

<img src="resources/landing.png" alt="landing" width="500"></img>


This is a demo to test a HLS service.
It uses a golang server to serve the HLS files and a next.js app to handle the user interactions.
The golang API handles all HTTP requests and allows users to log in using JWT auth and serves the HLS files.
The next.js app to handle the user interactions, such as:

- create account
- login
- logout
- list of available videos
- video player

### Requirements

- docker to run the containers

- Or if you want to run locally
  - docker (for the postgres database)
  - golang
  - node.js
  - yarn

## How to run

- Change the connection string in `./backend/db/db.go` file to the correct database connection string depending on your setup

```go
// psqlInfo := os.Getenv("DATABASE_URL")
psqlInfo := fmt.Sprintf("port=%d user=%s password=%s dbname=%s sslmode=disable", port, dbuser, dbpass, dbname)
```

### How to run with docker

- `docker compose build`
- `docker compose up`

### How to run locally without docker

- Run the database with `docker compose up postgres` (needs docker installed)
- On one terminal, run `cd ./backend` and run `go run .` for the golang server
- On another terminal, run `cd ./frontend` and run `yarn dev` for the next.js app
