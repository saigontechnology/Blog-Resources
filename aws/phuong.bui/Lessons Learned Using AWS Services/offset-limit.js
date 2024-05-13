// server.js
const express = require("express");
const mysql = require("mysql2/promise"); // Use 'mysql2' for MySQL or 'pg' for PostgreSQL

const app = express();
const PORT = process.env.PORT || 3000;

// Database configuration (adjust as needed)
const dbConfig = {
  host: "localhost",
  user: "your_db_user",
  password: "your_db_password",
  database: "your_database",
};

// Create a database connection pool
const pool = mysql.createPool(dbConfig);

// API route for paginated data
app.get("/api/data", async (req, res) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const offset = (page - 1) * pageSize;

    // Query the database with LIMIT and OFFSET
    const [rows] = await pool.query(
      "SELECT * FROM your_table LIMIT ? OFFSET ?",
      [Number(pageSize), Number(offset)]
    );

    res.json(rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
