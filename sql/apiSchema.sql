create schema api;

create role authenticator noinherit login password 'mysecretpassword';

-- creating placeholder account for admin, with full access
-- to api schema. making sure that JWT setup is working. 
create role dev_admin nologin;
grant dev_admin to authenticator;

grant usage on schema api to dev_admin;
grant all on all tables in schema api to dev_admin;
grant all on all sequences in schema api to dev_admin;


/* If you would like to do additional initialization in an image derived from this one, 
add one or more *.sql, *.sql.gz, or *.sh scripts under /docker-entrypoint-initdb.d 
(creating the directory if necessary). After the entrypoint calls initdb to create 
the default postgres user and database, it will run any *.sql files, run any executable 
*.sh scripts, and source any non-executable *.sh scripts found in that directory to do 
further initialization before starting the service.
*/