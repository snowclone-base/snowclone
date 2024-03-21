create schema api;

create role authenticator noinherit login password 'mysecretpassword';

-- Create web anon role and grant usage on schema api, and then grant default read privileges
-- on all tables in schema api to allow viewing openAPI spec from browser at localhost:3000
-- without a token.
create role web_anon nologin;
grant usage on schema api to web_anon;
grant web_anon to authenticator;

alter default privileges in schema api
grant select on tables to web_anon;


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