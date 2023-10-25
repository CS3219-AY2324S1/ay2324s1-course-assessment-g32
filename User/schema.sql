-- enter lines 2 to 14 in mysql shell to create database and table
CREATE DATABASE assignmentdb;

USE assignmentdb;

-- Creates table for users
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  display_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(200) NOT NULL,
  is_maintainer BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Creates 1 sample admin account and 1 sample normal user account

-- Login Credentials
-- Email: admin@test.com
-- Password: password
INSERT INTO users (display_name, email, password, is_maintainer)
VALUES('admin', 'admin@test.com', '$2b$10$b.yHMk1XCm3wEDfQbuM2w.3RC15YCWCrfO/ArhvC3NuqeQwl0.vY6', 1);

-- Login Credentials
-- Email: user@test.com
-- Password: password
INSERT INTO users (display_name, email, password)
VALUES('user', 'user@test.com', '$2b$10$b.yHMk1XCm3wEDfQbuM2w.3RC15YCWCrfO/ArhvC3NuqeQwl0.vY6');
