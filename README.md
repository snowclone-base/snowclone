## Setup & Instructions

**updated commands for starting via docker**

- start docker desktop
- run `docker compose up` to start the admin, server, database, and eventserver
- on command line, run `export TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiZGV2X2FkbWluIn0.AGT3mJ9MB8HEBBOvuOWtjSWvA4PALfzhbaaOB-qFD8I` (no quotes!)
- the above is your JWT Token for the newly created role: `dev_admin`. Now you can run curl commands against the new API!
  - dev_admin role on our database by default has ALL privileges to ALL tables and ALL sequences (necessary for inserting new data) in schema 'api'. (see /sql/apiSchema.sql for exact privileges granted)
- database is currently empty but you can upload the /sql/testSchema.sql to our admin interface if you want to try out the below examples. same goes for uploading /sql/listener.sql if you want to demo the realtime features.

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

<!-- current Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiZGV2X2FkbWluIn0.AGT3mJ9MB8HEBBOvuOWtjSWvA4PALfzhbaaOB-qFD8I -->
