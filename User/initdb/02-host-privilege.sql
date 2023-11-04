-- Resolves ER_HOST_NOT_PRIVILEGED 
USE mysql;
UPDATE user SET host='%' WHERE user='root';
FLUSH PRIVILEGES;

