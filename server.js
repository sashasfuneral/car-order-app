// server.js
require('dotenv').config();
const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Подключение к MSSQL
const config = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    server: process.env.SQL_SERVER,
    database: process.env.SQL_DATABASE,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

// Обработка формы заказа
app.post('/api/order', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const d = req.body;

        await pool.request()
            .input('fullName', sql.NVarChar, d.fullName)
            .input('phone', sql.NVarChar, d.phone)
            .input('email', sql.NVarChar, d.email)
            .input('comments', sql.NVarChar, d.comments)
            .input('services', sql.NVarChar, d.services)
            .input('carModel', sql.NVarChar, d.carModel)
            .input('deliveryAddress', sql.NVarChar, d.deliveryAddress)
            .input('startDate', sql.Date, new Date(d.startDate))
            .input('endDate', sql.Date, new Date(d.endDate))
            .query(`
                INSERT INTO CarOrders
                (fullName, phone, email, comments, services, carModel, deliveryAddress, startDate, endDate)
                VALUES (@fullName, @phone, @email, @comments, @services, @carModel, @deliveryAddress, @startDate, @endDate)
            `);

        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка при записи в БД');
    }
});

// Обработка формы обратной связи
app.post('/api/feedback', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const d = req.body;

        await pool.request()
            .input('name', sql.NVarChar, d.name)
            .input('contactPhone', sql.NVarChar, d.contactPhone)
            .input('contactEmail', sql.NVarChar, d.contactEmail)
            .input('message', sql.NVarChar, d.message)
            .query(`
                INSERT INTO Feedback
                (name, contactPhone, contactEmail, message)
                VALUES (@name, @contactPhone, @contactEmail, @message)
            `);

        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка при записи в БД');
    }
});

// Запускаем сервер
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});

sql.connect(config).then(() => {
    console.log('Успех');
}).catch(err => {
    console.error('Ошибка подключения:', err);
});