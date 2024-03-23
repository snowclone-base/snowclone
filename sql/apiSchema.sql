create schema api;

create role authenticator noinherit login password 'mysecretpassword';

-- Create web anon role and grant usage on schema api, and then grant default read privileges
-- on all tables in schema api to allow viewing openAPI spec from browser at localhost:3000
-- without a token.

create role anon noinherit;
grant anon to authenticator;
grant usage on schema api to anon;

create role member noinherit;
grant member to authenticator;
grant usage on schema api to member;

alter default privileges in schema api
grant select on tables to member;

-- creating placeholder account for admin, dev_admin ,  with full access
-- to api schema. making sure that JWT setup is working. 
create role dev_admin nologin;
grant usage on schema api to dev_admin;
grant dev_admin to authenticator;

-- These ALTER DEFAULT PRIVILEGES do what I thought the commented out grant
-- options did below-- grant all access in schema api EVEN FOR OBJECTS THAT
-- AREN'T YET CREATED. Grant only works on previously created objects.
alter default privileges in schema api grant all on TABLES TO dev_admin;
alter default privileges in schema api grant all on SEQUENCES TO dev_admin;
alter default privileges in schema api grant all on FUNCTIONS TO dev_admin;

alter default privileges in schema api grant SELECT, UPDATE, INSERT, DELETE on TABLES TO member;
alter default privileges in schema api grant SELECT, UPDATE on SEQUENCES TO member;
-- grant all on all tables in schema api to dev_admin;
-- grant all on all sequences in schema api to dev_admin;

-- Automatic reloading of schema on ddl_command_end
-- Create an event trigger function
CREATE OR REPLACE FUNCTION pgrst_watch() RETURNS event_trigger
  LANGUAGE plpgsql
  AS $$
BEGIN
  NOTIFY pgrst, 'reload schema';
END;
$$;

-- This event trigger will fire after every ddl_command_end event
CREATE EVENT TRIGGER pgrst_watch
  ON ddl_command_end
  EXECUTE PROCEDURE pgrst_watch();

-- Need to do:
-- look more into security. locking down db to only our dev_admin and 
-- web_anon users.


--  Below is instructions for initializing schema in postgres docker image

/* If you would like to do additional initialization in an image derived from this one, 
add one or more *.sql, *.sql.gz, or *.sh scripts under /docker-entrypoint-initdb.d 
(creating the directory if necessary). After the entrypoint calls initdb to create 
the default postgres user and database, it will run any *.sql files, run any executable 
*.sh scripts, and source any non-executable *.sh scripts found in that directory to do 
further initialization before starting the service.
*/