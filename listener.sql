-- Create a function to notify on todos changes
CREATE OR REPLACE FUNCTION notify_todos_change()
RETURNS TRIGGER AS $$
BEGIN
    PERFORM pg_notify('todos_change', '');
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to execute the function on todos changes
CREATE TRIGGER todos_change_trigger
AFTER INSERT OR UPDATE OR DELETE ON todos
FOR EACH ROW
EXECUTE FUNCTION notify_todos_change();
