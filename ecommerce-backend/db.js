const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'ecouser', // Replace with your MySQL username
    password: 'Balli@123', // Replace with your MySQL password
    database: 'ecommerce' // Replace with your database name
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
        return;
    }
    console.log('Connected to MySQL database');
});

module.exports = db;

