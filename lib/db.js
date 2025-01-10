import mysql from 'mysql2/promise';

const connectToDatabase=async()=> {
  try {
    console.log('Attempting to connect to the database...');
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log("Connected to the database successfully!");
    return connection;
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
}

export default connectToDatabase;