-- enter lines 2 to 14 in mysql shell to create database and table
CREATE DATABASE user_profiles;
USE user_profiles;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(200) NOT NULL,     -- to be hashed
  isMaintainer BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- For testing/demo purposes, a generic admin account is created.
-- This MUST NOT be here during production.
INSERT IGNORE INTO users (username, email, password, isMaintainer)
VALUES('admin', 'admin@email.com', 'password', 1);

-- use this to change normal user to maintainer manually
-- UPDATE users SET isMaintainer = TRUE WHERE id = ?;

-- Resolves ER_HOST_NOT_PRIVILEGED 
USE mysql;
UPDATE user SET host='%' WHERE user='root';
FLUSH PRIVILEGES;
