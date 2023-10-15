-- For testing/demo purposes, sample accounts are created.
-- This MUST NOT be here during production.
USE user_profiles;

INSERT INTO users (username, email, password, isMaintainer)
VALUES('admin', 'admin@email.com', 'password', 1);

INSERT INTO users (username, email, password)
VALUES('user1', 'user1@email.com', 'password');

INSERT INTO users (username, email, password)
VALUES('user2', 'user2@email.com', 'password');