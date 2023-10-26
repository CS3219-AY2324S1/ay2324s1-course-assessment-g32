-- enter lines 2 to 10 in mysql shell to create database and table
CREATE DATABASE assignmentdb;

USE assignmentdb;

CREATE TABLE attempts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  questionId VARCHAR(50) NOT NULL,
  timeStamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  code TEXT NOT NULL
);

