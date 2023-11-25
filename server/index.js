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

// Fetch user details
app.get('/api/users/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Query user details for the specific user using userId
    // Modify this query based on your database structure
    const [users] = await db.promise().query('SELECT * FROM users WHERE id = ?', [userId]);

    res.json(users);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Modify the /api/tasks/ endpoint to accept a userId parameter
app.get('/api/tasks/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Query tasks for the specific user using userId
    // Modify this query based on your database structure
    const [tasks] = await db.promise().query('SELECT * FROM event WHERE user_id = ?', [userId]);

    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// User login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ status: 0, message: 'All fields must be filled' });
    }

    const getUserQuery = 'SELECT id, password FROM users WHERE email = ?';
    const [userRows] = await db.promise().execute(getUserQuery, [email]);

    if (userRows.length === 0) {
      return res.status(401).json({ status: 0, message: 'User not found' });
    }

    const hashedPassword = userRows[0].password;
    const userId = userRows[0].id;

    const isPasswordValid = await bcrypt.compare(password, hashedPassword);

    if (isPasswordValid) {
      return res.json({ status: 1, message: 'Login successful', userId });
    } else {
      return res.status(401).json({ status: 0, message: 'Invalid password' });
    }
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ status: 0, message: 'Internal Server Error' });
  }
});


// register
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


// Task creation endpoint
app.post('/api/create-task', async (req, res) => {
  try {
    const { user_id, title, startDate, endDate, taskType, priority, description, selectedProject } = req.body;

    

    const checkTaskQuery = "SELECT user_id FROM event WHERE user_id = ? AND task_name = ?";
    const checkTaskStmt = db.promise().execute(checkTaskQuery, [user_id, title]);
    const [taskResult] = await checkTaskStmt;

    if (taskResult && taskResult.length > 0) {
      return res.json({ status: 0, message: 'Task with the same title already exists for this user' });
    }

    const insertTaskQuery = "INSERT INTO event (user_id, task_name, start_date, end_date, task_type, priority, description, task_progress, task_done, project_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, 0, 0, ?, NOW(), NOW())";

    const insertTaskStmt = db.promise().execute(insertTaskQuery, [user_id, title, startDate, endDate, taskType, priority, description, selectedProject || null]);

    await insertTaskStmt;

    return res.json({ status: 1, message: 'Task created successfully' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ status: 0, message: 'Internal Server Error' });
  }
});



// Project creation endpoint
app.post('/api/create-project', async (req, res) => {
  try {
    const { user_id, projectName, projectDescription } = req.body;

    // Your existing project creation logic here
    // ...

    // Example placeholder logic
    const checkProjectQuery = "SELECT project_id FROM project WHERE user_id = ? AND project_name = ?";
    const checkProjectStmt = db.promise().execute(checkProjectQuery, [user_id, projectName]);
    const [projectResult] = await checkProjectStmt;

    if (projectResult && projectResult.length > 0) {
      return res.json({ status: 0, message: 'Project with the same name already exists for this user' });
    }

    const insertProjectQuery = "INSERT INTO project (user_id, project_name, project_description) VALUES (?, ?, ?)";
    const insertProjectStmt = db.promise().execute(insertProjectQuery, [user_id, projectName, projectDescription]);
    await insertProjectStmt;

    return res.json({ status: 1, message: 'Project created successfully' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ status: 0, message: 'Internal Server Error' });
  }
});


const PORT = 9000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
