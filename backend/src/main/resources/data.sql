INSERT INTO tb_user (name, email, password, img_Url) VALUES ('Alex', 'alex@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://xsgames.co/randomusers/assets/avatars/male/47.jpg');
INSERT INTO tb_user (name, email, password, img_Url) VALUES ('Maria', 'maria@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://i.pinimg.com/originals/76/ef/b7/76efb7c94755748d695d3d46cf11d08d.jpg');
INSERT INTO tb_user (name, email, password, img_Url) VALUES ('Bob', 'bob@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://xsgames.co/randomusers/assets/avatars/male/62.jpg');

INSERT INTO tb_role (authority) VALUES ('ROLE_OPERATOR');
INSERT INTO tb_role (authority) VALUES ('ROLE_ADMIN');

INSERT INTO tb_user_role (user_id, role_id) VALUES (1, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 2);
INSERT INTO tb_user_role (user_id, role_id) VALUES (3, 1);

INSERT INTO tb_book (title, author, year, img_Url) VALUES ('Harry Potter e a Câmara Secreta', 'J.K. Rowling', 2001, 'https://livrariakadernus.com.br/wp-content/uploads/2021/09/81jbivNEVML1.jpg');
INSERT INTO tb_book (title, author, year, img_Url) VALUES ('Percy Jackson e o Ladrão de raios', 'Rick Riordan', 2002, 'https://m.media-amazon.com/images/I/61JenSx3wKL._AC_UF1000,1000_QL80_.jpg');
INSERT INTO tb_book (title, author, year, img_Url) VALUES ('A sociedade do anel', 'J.R.R Tolkien', 2003, 'https://http2.mlstatic.com/D_NQ_NP_956499-MLU50423691640_062022-O.webp');
INSERT INTO tb_book (title, author, year, img_Url) VALUES ('Dom Quixote', 'Miguel de Cervantes', 1605, 'https://www.lpm.com.br/livros/imagens/dom_quixote_hq_9788525433633_hd.jpg');
INSERT INTO tb_book (title, author, year, img_Url) VALUES ('Orgulho e Preconceito', 'Jane Austen', 1813, 'https://m.media-amazon.com/images/I/61JosO2tkdL._AC_UF1000,1000_QL80_.jpg');
INSERT INTO tb_book (title, author, year, img_Url) VALUES ('1984', 'George Orwell', 1949, 'https://m.media-amazon.com/images/I/5126eSrThKL._AC_UF1000,1000_QL80_.jpg');
INSERT INTO tb_book (title, author, year, img_Url) VALUES ('Cem Anos de Solidão', 'Gabriel García Márquez', 1967, 'https://m.media-amazon.com/images/I/51cfxI-51mL.jpg');
INSERT INTO tb_book (title, author, year, img_Url) VALUES ('Crime e Castigo', 'Fiódor Dostoiévski', 1866, 'https://m.media-amazon.com/images/I/41SXsI+ahpL.jpg');
INSERT INTO tb_book (title, author, year, img_Url) VALUES ('O Pequeno Príncipe', 'Antoine de Saint-Exupéry', 1943, 'https://www.gruponovoseculo.com.br/image/cache/catalog/9/7/9788542805956-480x672.jpg');

INSERT INTO tb_user_mybooks (user_id, book_id) VALUES (1, 1);
INSERT INTO tb_user_mybooks (user_id, book_id) VALUES (2, 2);
INSERT INTO tb_user_mybooks (user_id, book_id) VALUES (3, 3);
INSERT INTO tb_user_mybooks (user_id, book_id) VALUES (1, 4);
INSERT INTO tb_user_mybooks (user_id, book_id) VALUES (2, 5);
INSERT INTO tb_user_mybooks (user_id, book_id) VALUES (3, 6);
INSERT INTO tb_user_mybooks (user_id, book_id) VALUES (1, 7);
INSERT INTO tb_user_mybooks (user_id, book_id) VALUES (2, 8);
INSERT INTO tb_user_mybooks (user_id, book_id) VALUES (2, 9);

INSERT INTO tb_user_wishlist (user_id, book_id) VALUES (1, 2);
INSERT INTO tb_user_wishlist (user_id, book_id) VALUES (2, 3);
INSERT INTO tb_user_wishlist (user_id, book_id) VALUES (3, 1);
INSERT INTO tb_user_wishlist (user_id, book_id) VALUES (2, 4);
INSERT INTO tb_user_wishlist (user_id, book_id) VALUES (2, 6);
INSERT INTO tb_user_wishlist (user_id, book_id) VALUES (2, 7);

INSERT INTO tb_exchange (status, creation_Time, creator_id, receiver_id, book_Offered_id, book_Received_id) VALUES (0, TIMESTAMP WITHOUT TIME ZONE '2023-06-12T22:30:12', 2, null, 2, null);
INSERT INTO tb_exchange (status, creation_Time, creator_id, receiver_id, book_Offered_id, book_Received_id) VALUES (1, TIMESTAMP WITHOUT TIME ZONE '2023-06-12T22:30:12', 2, 1, 2, 1);
INSERT INTO tb_exchange (status, creation_Time, creator_id, receiver_id, book_Offered_id, book_Received_id) VALUES (0, TIMESTAMP WITHOUT TIME ZONE '2023-07-15T10:00:00', 1, null, 2, null);
INSERT INTO tb_exchange (status, creation_Time, creator_id, receiver_id, book_Offered_id, book_Received_id) VALUES (1, TIMESTAMP WITHOUT TIME ZONE '2023-07-15T10:30:00', 3, 2, 1, 3);
INSERT INTO tb_exchange (status, creation_Time, creator_id, receiver_id, book_Offered_id, book_Received_id) VALUES (2, TIMESTAMP WITHOUT TIME ZONE '2023-07-15T11:00:00', 2, 1, 3, 2);
INSERT INTO tb_exchange (status, creation_Time, creator_id, receiver_id, book_Offered_id, book_Received_id) VALUES (0, TIMESTAMP WITHOUT TIME ZONE '2023-07-16T14:00:00', 3, null, 3, null);
INSERT INTO tb_exchange (status, creation_Time, creator_id, receiver_id, book_Offered_id, book_Received_id) VALUES (1, TIMESTAMP WITHOUT TIME ZONE '2023-07-16T14:30:00', 2, 3, 1, 2);
INSERT INTO tb_exchange (status, creation_Time, creator_id, receiver_id, book_Offered_id, book_Received_id) VALUES (2, TIMESTAMP WITHOUT TIME ZONE '2023-07-16T15:00:00', 3, 1, 3, 1);

INSERT INTO tb_notification (description, read, moment, user_id) VALUES ('First notification', false, TIMESTAMP WITHOUT TIME ZONE '2023-06-12T22:30:12', 2);

