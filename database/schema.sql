-- Create the database
CREATE DATABASE IF NOT EXISTS store_rating_platform;

-- Use the database
USE store_rating_platform;

-- Users Table
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    address VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    role ENUM('Admin', 'Normal User', 'Store Owner') NOT NULL,
    INDEX (email)
);

-- Stores Table
CREATE TABLE Stores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    address VARCHAR(255) NOT NULL,
    owner_id INT,
    FOREIGN KEY (owner_id) REFERENCES Users(id) ON DELETE SET NULL,
    INDEX (name),
    INDEX (address)
);

-- Ratings Table
CREATE TABLE Ratings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    store_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (store_id) REFERENCES Stores(id) ON DELETE CASCADE,
    UNIQUE KEY (user_id, store_id)
);
