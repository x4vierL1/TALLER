import { Router } from 'express';
import {
  obtenerRefugios,
  crearRefugio
} from '../controllers/refugios.controller.js';
import { autenticarToken } from '../middlewares/auth.middleware.js';
import { autorizarRoles } from '../middlewares/role.middleware.js';

const router = Router();

// Obtiene todos los refugios activos.
router.get('/', obtenerRefugios);

// Registra un refugio. Solo pueden hacerlo administradores.
router.post(
  '/',
  autenticarToken,
  autorizarRoles('Administrador'),
  crearRefugio
);

export default router;