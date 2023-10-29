const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const dbConfig = require('./db.config.js');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Подключение к базе данных
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DATABASE,
});

connection.connect((error) => {
    if (error) {
        console.error('Ошибка подключения к базе данных:', error);
        return;
    }
    console.log('Подключение к базе данных прошло успешно');
});

// Обработка запроса на получение списка парфюмов
app.get('/perfumes', (req, res) => {
    const query = 'SELECT * FROM perfumes';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Ошибка при запросе к базе данных:', error);
            res.status(500).send('Ошибка на сервере');
        } else {
            res.json(results);
        }
    });
});

// Обработка запроса на добавление нового парфюма
app.post('/perfumes', (req, res) => {
    const newPerfume = req.body;
    const query = 'INSERT INTO perfumes (volume, price, manufacturer, imageName, perfumeName) VALUES (?, ?, ?, ?, ?)';
    const values = [newPerfume.volume, newPerfume.price, newPerfume.manufacturer, newPerfume.imageName, newPerfume.perfumeName]; // Додайте imageName

    connection.query(query, values, (error, result) => {
        if (error) {
            console.error('Ошибка при добавлении парфюма:', error);
            res.status(500).send('Ошибка на сервере');
        } else {
            newPerfume.id = result.insertId;
            res.status(201).json(newPerfume);
        }
    });
});


// Обработка запроса на обновление элемента
app.put('/perfumes/:id', (req, res) => {
    const perfumeId = req.params.id;
    const updatedData = req.body; // Новые данные для обновления

    const query = 'UPDATE perfumes SET volume = ?, price = ?, manufacturer = ?, imageName = ?, perfumeName = ? WHERE id = ?';
    const values = [updatedData.volume, updatedData.price, updatedData.manufacturer, updatedData.imageName, updatedData.perfumeName, perfumeId];

    connection.query(query, values, (error, result) => {
        if (error) {
            console.error('Ошибка при обновлении парфюма:', error);
            res.status(500).send('Ошибка на сервере');
        } else {
            res.json(updatedData);
        }
    });
});

app.delete('/perfumes/:id', (req, res) => {
    const perfumeId = req.params.id;

    const query = 'DELETE FROM perfumes WHERE id = ?';
    const values = [perfumeId];

    connection.query(query, values, (error, result) => {
        if (error) {
            console.error('Ошибка при удалении парфюма:', error);
            res.status(500).send('Ошибка на сервере');
        } else {
            res.sendStatus(204);
        }
    });
});

app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});



