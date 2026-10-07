import { Router } from 'express';
import { iniciarSesion } from '../controllers/auth.controller.js';

const router = Router();

// Inicia sesión y devuelve un token JWT.
router.post('/login', iniciarSesion);

export default router;