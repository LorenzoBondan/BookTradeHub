INSERT INTO tb_user (name, email, password, img_Url) VALUES ('Alex', 'alex@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://xsgames.co/randomusers/assets/avatars/male/47.jpg');
INSERT INTO tb_user (name, email, password, img_Url) VALUES ('Maria', 'maria@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://i.pinimg.com/originals/76/ef/b7/76efb7c94755748d695d3d46cf11d08d.jpg');
INSERT INTO tb_user (name, email, password, img_Url) VALUES ('Bob', 'bob@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://xsgames.co/randomusers/assets/avatars/male/62.jpg');

INSERT INTO tb_role (authority) VALUES ('ROLE_OPERATOR');
INSERT INTO tb_role (authority) VALUES ('ROLE_ADMIN');

INSERT INTO tb_user_role (user_id, role_id) VALUES (1, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 2);
INSERT INTO tb_user_role (user_id, role_id) VALUES (3, 1);

INSERT INTO tb_book (title, author, year, img_Url) VALUES ('Book 1', 'Author 1', 2001, 'https://img1.com');
INSERT INTO tb_book (title, author, year, img_Url) VALUES ('Book 2', 'Author 2', 2002, 'https://img2.com');
INSERT INTO tb_book (title, author, year, img_Url) VALUES ('Book 3', 'Author 3', 2003, 'https://img3.com');

INSERT INTO tb_user_mybooks (user_id, book_id) VALUES (1, 1);
INSERT INTO tb_user_mybooks (user_id, book_id) VALUES (2, 2);
INSERT INTO tb_user_mybooks (user_id, book_id) VALUES (3, 3);

INSERT INTO tb_user_wishlist (user_id, book_id) VALUES (1, 2);
INSERT INTO tb_user_wishlist (user_id, book_id) VALUES (2, 3);
INSERT INTO tb_user_wishlist (user_id, book_id) VALUES (3, 1);

INSERT INTO tb_exchange (status, creation_Time, creator_id, receiver_id, book_Offered_id, book_Received_id) VALUES (1, TIMESTAMP WITHOUT TIME ZONE '2023-06-12T22:30:12', 2, 1, 2, 1);

INSERT INTO tb_notification (description, read, moment, user_id) VALUES ('First notification', false, TIMESTAMP WITHOUT TIME ZONE '2023-06-12T22:30:12', 2);