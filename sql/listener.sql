CREATE OR REPLACE FUNCTION notify_db_changes()
RETURNS TRIGGER AS $$
BEGIN
    PERFORM pg_notify('db_changes', json_build_object(
        'action', TG_OP,
        'id', NEW.id,
        'title', NEW.title,
        'done', NEW.done,
        'username', NEW.username,
        'todolist_id', NEW.todolist_id
    )::text);
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to execute the function on todos changes
CREATE TRIGGER db_changes_trigger
AFTER INSERT OR UPDATE OR DELETE ON api.todos -- changed 'todos' to api.todos
FOR EACH ROW
EXECUTE FUNCTION notify_db_changes();