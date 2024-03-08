## Setup & Instructions

**updated commands for starting via docker**

- start docker desktop
- run `docker compose up` to start the client, server, database, and web socket server
- run `docker exec -it [container_id] psql --username=postgres` to login to psql server
  - inside psql instance, execute commands from within postgrest-schema.sql and listener.sql
  - exit psql with `\q`
- on command line, run `export TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidG9kb191c2VyIn0.87F2LFUD9xibzcf0NpdjwuS-3fDXVv48QF2cGU3VXyA"`

- the above is your JWT Token for the newly created todo_user in postgREST. now you can run curl commands against the new API!
  ex1: add a todo `curl -X POST -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"username":"Elvis Presley", "title":"Thank ya very much", "todolist_id":"3", "done":"true"}' http://localhost:3000/todos`

  ex2: view all todos `curl -H "Authorization: Bearer $TOKEN" http://localhost:3000/todos`

<!-- **commands for running locally**

- Run `createdb supaSkateboard`
- Connect to db using `psql supaSkateboard`
- Run the SQL in supaSchema.sql to create tables
- Run the SQL in seed-data.sql to populate the tables
- Run the SQL in listener.sql to attach a listener for any updates in todos
- Run `LISTEN todos_change;` while connected to the supaSkateboard database
- Connect to supaSkateboard from a different terminal and perform insert / update / delete on a todo
- From the listening terminal, run any sql command `;` and you should receive the notification

- run `npm install`
- start the listener client with `npm start`
- create a .env file with the following:
  - PG_HOST
  - PG_PORT
  - PG_DATABASE
  - PG_USER
  - PG_PASSWORD
- PG_DATABASE=supaSkateboard
- The other env variables you can find by running `\conninfo` while connected to psql
- connect to the database from another psql terminal and test by adding a record to the todos table:
  `sql
        INSERT INTO todos (title, done, username, todolist_id) VALUES
('Test notifications', false, 'user1', 1); -->

    `
