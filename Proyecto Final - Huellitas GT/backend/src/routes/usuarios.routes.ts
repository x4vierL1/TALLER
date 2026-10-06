import { Router } from 'express';
import {
  obtenerUsuarios,
  crearUsuario
} from '../controllers/usuarios.controller.js';

const router = Router();

// Obtiene todos los usuarios registrados.
router.get('/', obtenerUsuarios);

// Registra un nuevo usuario.
router.post('/', crearUsuario);

export default router;