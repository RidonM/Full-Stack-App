/* Create the Database */
CREATE DATABASE bookmanagement;

USE bookmanagement;

/* Genres Table */
CREATE TABLE genres(
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    PRIMARY KEY (id)
);

/* Authors Table */
CREATE TABLE authors(
    id BIGINT NOT NULL AUTO_INCREMENT,
    fullName VARCHAR(100) NOT NULL,
    nationality VARCHAR(30) NULL,
    biography MEDIUMTEXT NULL,
    yearOfBirth INT NULL,
    imageUrl VARCHAR(255) NULL,
    PRIMARY KEY (id)
);

/* Users Table */
CREATE TABLE users(
    id BIGINT NOT NULL AUTO_INCREMENT,
    fullName VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

/* Books Table */
CREATE TABLE books(
    id BIGINT NOT NULL AUTO_INCREMENT,
    isbn VARCHAR(13) NOT NULL,
    title VARCHAR(255) NOT NULL,
    authorId BIGINT NOT NULL,
    publishedAt DATE,
    genreId BIGINT NULL,
    rating DOUBLE DEFAULT NULL,
    noOfPages INT NULL,
    imageUrl VARCHAR(255) NULL,
    description TEXT NOT NULL,
    createdBy BIGINT NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (authorId) REFERENCES authors(id),
    FOREIGN KEY (genreId) REFERENCES genres(id),
    FOREIGN KEY (createdBy) REFERENCES users(id)
);