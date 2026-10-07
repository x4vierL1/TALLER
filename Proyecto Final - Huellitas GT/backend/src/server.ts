import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db } from './config/database.js';
import rolesRoutes from './routes/roles.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js';
import authRoutes from './routes/auth.routes.js';
import mascotasRoutes from './routes/mascotas.routes.js';
dotenv.config();
import refugiosRoutes from './routes/refugios.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    mensaje: 'API de Huellitas GT funcionando'
  });
});

// Verifica que el backend pueda comunicarse con MySQL.
app.get('/api/health', async (_req, res) => {
  try {
    await db.query('SELECT 1');

    res.json({
      estado: 'ok',
      base_de_datos: 'conectada'
    });
  } catch (error) {
    console.error('Error de conexión con MySQL:', error);

    res.status(500).json({
      estado: 'error',
      base_de_datos: 'desconectada'
    });
  }
});

// Rutas relacionadas con los roles del sistema.
app.use('/api/roles', rolesRoutes);

// Rutas relacionadas con los usuarios del sistema.
app.use('/api/usuarios', usuariosRoutes);

// Rutas relacionadas con autenticación.
app.use('/api/auth', authRoutes);

// Rutas relacionadas con las mascotas.
app.use('/api/mascotas', mascotasRoutes);

// Rutas relacionadas con los refugios.
app.use('/api/refugios', refugiosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});