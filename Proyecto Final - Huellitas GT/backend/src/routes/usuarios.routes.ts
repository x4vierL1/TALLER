import { Router } from 'express';
import {
  obtenerUsuarios,
  crearUsuario
} from '../controllers/usuarios.controller.js';
import {
  autenticarToken,
  RequestAutenticado
} from '../middlewares/auth.middleware.js';
import { autorizarRoles } from '../middlewares/role.middleware.js';

const router = Router();

// Obtiene todos los usuarios registrados.
router.get('/', obtenerUsuarios);

// Registra un nuevo usuario.
router.post('/', crearUsuario);

// Ruta protegida para comprobar autenticación y autorización.
router.get(
  '/perfil',
  autenticarToken,
  autorizarRoles('Administrador'),
  (req: RequestAutenticado, res) => {
    res.json({
      mensaje: 'Token válido y rol autorizado',
      usuario: req.usuario
    });
  }
);

export default router;