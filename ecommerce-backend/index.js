const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());



app.get('/', (req,res) => {
    res.json({"health": "ready"});
});
	// Routes
// Get all products
app.get('/api/products', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Add a new product
app.post('/api/products', (req, res) => {
    const { name, price, description, image } = req.body;
    const query = 'INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)';
    db.query(query, [name, price, description, image], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: result.insertId, name, price, description, image });
    });
});

// Get product details by ID
app.get('/api/products/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(results[0]);
    });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

