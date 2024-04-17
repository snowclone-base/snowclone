create schema api;

create role authenticator noinherit login password 'mysecretpassword';

create role anon nologin;
grant anon to authenticator;
grant usage on schema api to anon;

create role webuser nologin;
grant webuser to authenticator;
grant usage on schema api to webuser;

alter default privileges in schema api grant all on TABLES TO webuser;
alter default privileges in schema api grant all on SEQUENCES TO webuser;

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