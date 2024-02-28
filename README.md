## Setup & Instructions

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
- connect to the database from another psql terminal and issue NOTIFY commands to channel
    ```sql
        NOTIFY 'channel', '{"message": "hello"}';
    ```