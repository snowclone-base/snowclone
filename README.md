## Setup & Instructions

**updated commands for starting via docker**
- start docker desktop
- run `docker compose up` to start the client, server, database, and web socket server

**commands for running locally**

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
('Test notifications', false, 'user1', 1);
    `
