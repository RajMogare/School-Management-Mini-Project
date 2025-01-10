import connectToDatabase from '@/lib/db';
import { NextResponse } from 'next/server';


export async function GET() {
  let connection;
  try {
    connection = await connectToDatabase();
    const [schools] = await connection.query('SELECT * FROM schools');
    return NextResponse.json(schools);
  } catch (error) {
    console.error('Error fetching schools:', error);
    return NextResponse.json({ error: 'Failed to fetch schools: ' + error.message }, { status: 500 });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

export async function POST(request) {
  let connection;
  try {
    const { name, address, city, state, contact, email_id, image } = await request.json();
    connection = await connectToDatabase();
    const [result] = await connection.query(
      'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, address, city, state, contact, image, email_id]
    );
    return NextResponse.json({ success: true, id: result.insertId });
  } catch (error) {
    console.error('Error adding school:', error);
    return NextResponse.json({ error: 'Failed to add school: ' + error.message }, { status: 500 });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

