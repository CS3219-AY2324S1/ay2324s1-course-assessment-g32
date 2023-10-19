-- For testing/demo purposes, sample accounts are created.
-- This MUST NOT be here during production.
USE user_profiles;

-- Login Credentials
-- Email: admin@email.com
-- Password: password
INSERT INTO users (username, email, password, isMaintainer)
VALUES('admin', 'admin@test.com', '$2b$10$b.yHMk1XCm3wEDfQbuM2w.3RC15YCWCrfO/ArhvC3NuqeQwl0.vY6', 1);

-- Login Credentials
-- Email: user@test.com
-- Password: password
INSERT INTO users (username, email, password)
VALUES('user', 'user@test.com', '$2b$10$b.yHMk1XCm3wEDfQbuM2w.3RC15YCWCrfO/ArhvC3NuqeQwl0.vY6');