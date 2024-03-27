## Setup & Instructions

**updated commands for starting via docker**

- start docker desktop
- run `docker compose up` to start the admin, schema server, database, and event server
- on command line, run `export TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiZGV2X2FkbWluIn0.AGT3mJ9MB8HEBBOvuOWtjSWvA4PALfzhbaaOB-qFD8I` (no quotes!)
- the above is your JWT Token for the newly created role: `dev_admin`. Now you can run curl commands against the new API!
  - dev_admin role on our database by default has ALL privileges to ALL tables and ALL sequences (necessary for inserting new data) in schema 'api'. (see /sql/apiSchema.sql for exact privileges granted)
- database is currently empty but you can upload the /sql/testSchema.sql to our admin interface if you want to try out the below examples. same goes for uploading /sql/listener.sql if you want to demo the realtime features.

  ex1: add a todo `curl -X POST -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"username":"Elvis Presley", "title":"Thank ya very much", "todolist_id":"3", "done":"true"}' http://localhost:3000/todos`

  ex2: view all todos `curl -H "Authorization: Bearer $TOKEN" http://localhost:3000/todos`

- to upload sql files: `curl -H "Authorization: Bearer blizzard" -F 'file=@test.sql' http://localhost:5175/schema` from the directory the sql file is in

- to test login functionality: `curl -X POST -H 'Content-Type: application/json' -d '{"email": "user@snowclone.com", "pass": "snowclone"}' http://localhost:3000/rpc/login`

  - use the JWT in the response to make a POST request to the postgrest api

<!-- current Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiZGV2X2FkbWluIn0.AGT3mJ9MB8HEBBOvuOWtjSWvA4PALfzhbaaOB-qFD8I -->
