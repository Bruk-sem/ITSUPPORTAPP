import express, {Request, Response, NextFunction } from 'express';
import pool from './db/db';
import mysql, { Connection } from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Next } from 'mysql2/typings/mysql/lib/parsers/typeCast';

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use(cors()); // Enable CORS for all routes

// Routes to get a user from database

///////////////////// connecting to the database //////////////////////

const db: Connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'BSSMbafm@22',
  database: 'user',
});

db.connect((err: Error | null) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    return;
  }
  console.log('Connected to ikram');
});

app.post('/userlogin', async (req: Request, res: Response,next: NextFunction) => {
  const { username, password }: { username: string; password: string } = req.body;
  const query = 'SELECT * FROM usertable WHERE USER_NAEM = ? AND PASS_WORD = ?';

  try {
    // Properly destructure the result and assert the correct type for rows
    const [rows] = await pool.execute<[any[], any]>(query, [username, password]);
    if (rows.length > 0) {
      return res.json({ success: true, message: 'loggedin:true}' });
    } else {
      return res.json({ success: false, message: 'Invalid credentials. Please try again.' });
    }
  } catch (err) {
    next(err);
    //return res.status(500).json({ success: false, message: 'Database error', error: (err as Error).message }).send();
  }
});

// error handling middleware for the "userlogin" url request 
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  if (!res.headersSent) {
      return res.status(500).json({ error: 'Internal server error' });
  } else {
      next(err); // Delegate to default Express error handler if headers already sent
  }
});

// Route to add a new user




  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });