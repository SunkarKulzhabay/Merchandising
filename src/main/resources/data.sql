-- 👤 Аккаунты админов
INSERT INTO users (username, password, role) VALUES
                                                 ('admin1', '{noop}adminpass1', 'ADMIN'),
                                                 ('admin2', '{noop}adminpass2', 'ADMIN');

-- 👤 Аккаунты мерчандайзеров
INSERT INTO users (username, password, role) VALUES
                                                 ('user1', '{noop}userpass1', 'MERCH'),
                                                 ('user2', '{noop}userpass2', 'MERCH'),
                                                 ('user3', '{noop}userpass3', 'MERCH'),
                                                 ('user4', '{noop}userpass4', 'MERCH'),
                                                 ('user5', '{noop}userpass5', 'MERCH');

-- 🏪 Торговые точки
INSERT INTO store (name) VALUES
                             ('Small (ALA01)'),
                             ('Small (ALA03)'),
                             ('Small (ALA09)'),
                             ('Small (ALA10)'),
                             ('Small (ALA14)'),
                             ('Small (ALA17)'),
                             ('Small (ALA19)'),
                             ('Small (ALA22)'),
                             ('Small (ALA23)'),
                             ('Small (ALA24)'),
                             ('Small (ALA25)'),
                             ('Small (ALA26)'),
                             ('Small (ALA28)'),
                             ('Small (ALA31)'),
                             ('Small (ALA32)'),
                             ('Small (ALA34)'),
                             ('Small (ALA35)'),
                             ('Small (ALA36)'),
                             ('Small (ALA37)'),
                             ('Small (ALA38)');
