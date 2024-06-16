// server.js
const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const dbConfig = require('./dbConfig');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to SQL Server
sql.connect(dbConfig, (err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Route to handle form submission
app.post('/delete-account', (req, res) => {
  const { email, reason } = req.body;

  // Validate input
  if (!email || !reason) {
    return res.status(400).send('Email and reason are required');
  }

  // Query to insert deletion request
  const query = `
    INSERT INTO AccountDeletionRequests (Email, Reason)
    VALUES (@Email, @Reason)
  `;

  // Create a new request
  const request = new sql.Request();
  request.input('Email', sql.VarChar, email);
  request.input('Reason', sql.VarChar, reason);

  request.query(query, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.send('Account deletion request submitted successfully');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
