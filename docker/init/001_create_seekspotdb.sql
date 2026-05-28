CREATE DATABASE IF NOT EXISTS seekspotdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE seekspotdb;

CREATE TABLE IF NOT EXISTS users (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  username      VARCHAR(255) NOT NULL UNIQUE,
  email         VARCHAR(255) NOT NULL UNIQUE,
  password      VARCHAR(255) NOT NULL,
  phone_number  VARCHAR(20),
  user_type     ENUM('individual', 'agent', 'administrator', 'school-recruiter', 'school-accountant', 'school-admin') NOT NULL DEFAULT 'individual',
  createdAt     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS schools (
  id          CHAR(6) NOT NULL PRIMARY KEY,
  title       VARCHAR(255) NOT NULL,
  name        VARCHAR(255),
  address     VARCHAR(255),
  phone       VARCHAR(255),
  email       VARCHAR(255),
  latitude    DECIMAL(10,6),
  longitude   DECIMAL(10,6),
  image1      VARCHAR(255),
  quota       INT,
  comment     TEXT,
  createdAt   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
