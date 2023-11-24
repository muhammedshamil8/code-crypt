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

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});
// ... (previous code)

app.get('/api/users', async (req, res) => {
  try {
    // Fetch all users from the database
    const getUsersQuery = 'SELECT * FROM users';
    const [users] = await db.promise().execute(getUsersQuery);

    // Send the users as a JSON response
    res.json({ status: 1, data: users });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ status: 0, message: 'Internal Server Error' });
  }
});

// ... (remaining code)

app.post('/api/register', async (req, res) => {
  try {
    const user = req.body;

   

    if (user.password === user.passwordConfirm) {
      const hashedPassword = await bcrypt.hash(user.password, 10); // Use bcrypt to hash the password

      const create_at = new Date().toISOString().slice(0, 19).replace('T', ' '); // Format date as YYYY-MM-DD HH:MM:SS

      const insertUserQuery = 'INSERT INTO users (username, email, password, create_at) VALUES (?, ?, ?, ?)';
      const [results] = await db.promise().execute(insertUserQuery, [
        user.username,
        user.email,
        hashedPassword,
        create_at, // <-- Ensure that this value is defined
      ]);
      

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




/*
<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="registerUser">
      <label for="username">Username:</label>
      <input v-model="formData.username" type="text" id="username" name="username" required>

      <label for="email">Email:</label>
      <input v-model="formData.email" type="email" id="email" name="email" required>

      <label for="password">Password:</label>
      <input v-model="formData.password" type="password" id="password" name="password" required>

      <label for="passwordConfirm">Confirm Password:</label>
      <input v-model="formData.passwordConfirm" type="password" id="passwordConfirm" name="passwordConfirm" required>
      <br />

      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  data() {
    return {
      formData: {
        username: '',
        email: '',
        password: '',
        passwordConfirm: '', 
      },
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await fetch('http://localhost:9000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.formData.username,
            email: this.formData.email,
            password: this.formData.password,
            passwordConfirm: this.formData.passwordConfirm,
          }),
        });

        const data = await response.json();

        if (data.status === 1) {
          this.$router.push('/login');
        } else {
          console.error('Registration failed:', data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
  },
};
</script>

*/