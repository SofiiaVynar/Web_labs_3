-- Створіть базу даних, якщо вона ще не існує
CREATE DATABASE IF NOT EXISTS perfume;

-- Використовуйте новостворену базу даних
USE perfume;

-- Створіть таблицю "perfumes"
CREATE TABLE IF NOT EXISTS perfumes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    volume INT,
    price INT,
    manufacturer VARCHAR(255),
    imageName VARCHAR(255),
    perfumeName VARCHAR(255)
);


INSERT INTO perfumes (volume, price, manufacturer, imageName, perfumeName) VALUES (30, 9037, 'Dior', 'dior1', 'Poison');
INSERT INTO perfumes (volume, price, manufacturer, imageName, perfumeName) VALUES (200, 13355, 'Chanel', 'chanel1', 'No. 5');
INSERT INTO perfumes (volume, price, manufacturer, imageName, perfumeName) VALUES (50, 3616, 'Dior', 'dior', 'Miss Dior');
INSERT INTO perfumes (volume, price, manufacturer, imageName, perfumeName) VALUES (35, 2014, 'Givenchy', 'givenchy', 'L\'internit');
INSERT INTO perfumes (volume, price, manufacturer, imageName, perfumeName) VALUES (100, 16091, 'Tom Ford', 'tomford', 'Tom Ford Lost Cherry');
INSERT INTO perfumes (volume, price, manufacturer, imageName, perfumeName) VALUES (90, 3461, 'Y Saint Laurent', 'blackopium_', 'Black Opium');

SELECT * FROM perfumes;