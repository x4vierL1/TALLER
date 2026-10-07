import { Router } from 'express';
import {
  obtenerMascotas,
  obtenerMascotaPorId,
  crearMascota
} from '../controllers/mascotas.controller.js';
import { autenticarToken } from '../middlewares/auth.middleware.js';
import { autorizarRoles } from '../middlewares/role.middleware.js';

const router = Router();

// Obtiene todas las mascotas activas.
router.get('/', obtenerMascotas);

// Obtiene una mascota específica por su ID.
router.get('/:id', obtenerMascotaPorId);

// Registra mascotas. Solo pueden hacerlo refugios y administradores.
router.post(
  '/',
  autenticarToken,
  autorizarRoles('Refugio', 'Administrador'),
  crearMascota
);

export default router;