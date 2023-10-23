-- enter lines 2 to 14 in mysql shell to create database and table
CREATE DATABASE assignmentdb;

USE assignmentdb;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  display_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(200) NOT NULL,
  is_maintainer BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
