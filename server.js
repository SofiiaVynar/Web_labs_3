const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const dbConfig = require('./db.config.js');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DATABASE,
});

connection.connect((error) => {
    if (error) {
        console.error('Помилка підключення до бази даних:', error);
        return;
    }
    console.log('Підключення до бази даних прошло успішно');
});

app.get('/perfumes', (req, res) => {
    const query = 'SELECT * FROM perfumes';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Помилка при запиті до бази даних:', error);
            res.status(500).send('Помилка на сервері');
        } else {
            res.json(results);
        }
    });
});

app.post('/perfumes', (req, res) => {
    const newPerfume = req.body;
    const query = 'INSERT INTO perfumes (volume, price, manufacturer, imageName, perfumeName) VALUES (?, ?, ?, ?, ?)';
    const values = [newPerfume.volume, newPerfume.price, newPerfume.manufacturer, newPerfume.imageName, newPerfume.perfumeName]; 

    connection.query(query, values, (error, result) => {
        if (error) {
            console.error('Помилка при додаванні парфюма:', error);
            res.status(500).send('Помилка на сервері');
        } else {
            newPerfume.id = result.insertId;
            res.status(201).json(newPerfume);
        }
    });
});


app.put('/perfumes/:id', (req, res) => {
    const perfumeId = req.params.id;
    const updatedData = req.body;

    const query = 'UPDATE perfumes SET volume = ?, price = ?, manufacturer = ?, imageName = ?, perfumeName = ? WHERE id = ?';
    const values = [updatedData.volume, updatedData.price, updatedData.manufacturer, updatedData.imageName, updatedData.perfumeName, perfumeId];

    connection.query(query, values, (error, result) => {
        if (error) {
            console.error('Помилка при обновлені парфюма:', error);
            res.status(500).send('Помилка на сервері');
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
            console.error('Помилка при видаленні парфюма:', error);
            res.status(500).send('Помилка на сервері');
        } else {
            res.sendStatus(204);
        }
    });
});

app.listen(3000, () => {
    console.log('Сервер запущений на порті 3000');
});



