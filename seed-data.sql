-- Insert sample users
INSERT INTO users (username, password) VALUES
('user1', 'password1'),
('user2', 'password2'),
('user3', 'password3');

-- Insert sample todolists
INSERT INTO todolists (title, username) VALUES
('Grocery List', 'user1'),
('Work Tasks', 'user1'),
('Home Projects', 'user2'),
('Travel Plans', 'user3');

-- Insert sample todos
INSERT INTO todos (title, done, username, todolist_id) VALUES
('Buy milk', false, 'user1', 1),
('Finish report', false, 'user1', 2),
('Paint the living room', true, 'user2', 3),
('Book flight tickets', false, 'user3', 4),
('Pack suitcase', false, 'user3', 4);