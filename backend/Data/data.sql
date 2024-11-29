/* Seed Data */

INSERT INTO users (fullName, username, password) VALUES ('Viktor Ahmeti', 'admin', 'admin');

INSERT INTO genres (name) VALUES ('romance'), ('dystopian'), ('horror'), ('historical'), ('philosophical'), ('psychological'), ('classic'), ('satire'), ('biography'), ('fantasy'), ('adventure'), ('fiction');

INSERT INTO authors (fullName) VALUES ('Ismail Kadare');

INSERT INTO books (isbn, title, authorId, genreId, rating, createdBy, description)
VALUES ('9928-186-67-6', 'Kronike ne Gur', 1, 9, 4.3, 1, 'Nje liber shume interesante per Gjirokastren');