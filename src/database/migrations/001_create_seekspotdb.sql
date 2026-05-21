-- Run this on the CVM MySQL before first sandbox deployment
-- Usage: mysql -u root -p < 001_create_seekspotdb.sql

CREATE DATABASE IF NOT EXISTS seekspotdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE seekspotdb;

CREATE TABLE IF NOT EXISTS users (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  username      VARCHAR(255) NOT NULL UNIQUE,
  email         VARCHAR(255) NOT NULL UNIQUE,
  password      VARCHAR(255) NOT NULL,
  phone_number  VARCHAR(20),
  user_type     ENUM('individual', 'agent', 'administrator', 'school') NOT NULL DEFAULT 'individual',
  createdAt     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
