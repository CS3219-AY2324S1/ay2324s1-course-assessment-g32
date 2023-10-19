-- enter lines 2 to 10 in mysql shell to create database and table
CREATE DATABASE assignmentdb;

USE assignmentdb;

CREATE TABLE attempts (
  userId INT NOT NULL,
  questionId VARCHAR(50) NOT NULL,
  timeStamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

