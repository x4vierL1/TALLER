import { Router } from 'express';
import { db } from '../config/database.js';

const router = Router();

// Obtiene todos los roles registrados.
router.get('/', async (_req, res) => {
  try {
    const [roles] = await db.query(
      'SELECT id_rol, nombre, descripcion FROM roles'
    );

    res.json(roles);
  } catch (error) {
    console.error('Error al obtener los roles:', error);

    res.status(500).json({
      mensaje: 'Error al obtener los roles'
    });
  }
});

export default router;