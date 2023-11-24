const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'taskify',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password, passwordConfirm } = req.body;

    if (!username || !email || !password) {
      return res.json({ status: 0, message: 'All fields must be filled' });
    }

    if (password.length < 8) {
      return res.json({ status: 0, message: 'Password must contain at least 8 characters' });
    }

    const checkUsernameQuery = 'SELECT username FROM users WHERE username = ?';
    const [usernameRows] = await db.promise().execute(checkUsernameQuery, [username]);

    const checkEmailQuery = 'SELECT email FROM users WHERE email = ?';
    const [emailRows] = await db.promise().execute(checkEmailQuery, [email]);

    if (usernameRows.length > 0) {
      return res.json({ status: 0, message: 'Username already exists' });
    } else if (emailRows.length > 0) {
      return res.json({ status: 0, message: 'Email already exists' });
    }

    if (password === passwordConfirm) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const create_at = new Date().toISOString().slice(0, 19).replace('T', ' ');

      const insertUserQuery = 'INSERT INTO users (username, email, password, create_at) VALUES (?, ?, ?, ?)';
      const [results] = await db.promise().execute(insertUserQuery, [username, email, hashedPassword, create_at]);

      return res.json({ status: 1, message: 'Record created successfully', userId: results.insertId });
    } else {
      return res.json({ status: 0, message: 'Password and confirm password do not match' });
    }
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ status: 0, message: 'Internal Server Error' });
  }
});

const PORT = 9000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
