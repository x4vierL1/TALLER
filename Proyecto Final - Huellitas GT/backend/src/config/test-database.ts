import { db } from './database.js';

async function testConnection() {
  try {
    const connection = await db.getConnection();

    console.log('Conexión a MySQL establecida correctamente.');

    connection.release();
    await db.end();
  } catch (error) {
    console.error('Error al conectar con MySQL:', error);
  }
}

testConnection();