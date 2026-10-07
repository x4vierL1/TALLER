import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface UsuarioAutenticado {
  id_usuario: number;
  id_rol: number;
  rol: string;
}

// Agrega la información del usuario autenticado a la petición.
export interface RequestAutenticado extends Request {
  usuario?: UsuarioAutenticado;
}

export function autenticarToken(
  req: RequestAutenticado,
  res: Response,
  next: NextFunction
): void {
  const encabezado = req.headers.authorization;

  if (!encabezado || !encabezado.startsWith('Bearer ')) {
    res.status(401).json({
      mensaje: 'Token de autenticación requerido'
    });
    return;
  }

  const token = encabezado.split(' ')[1];
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    res.status(500).json({
      mensaje: 'JWT_SECRET no está configurado'
    });
    return;
  }

  try {
    const usuario = jwt.verify(token, secret) as UsuarioAutenticado;

    req.usuario = usuario;

    next();
  } catch (error) {
    res.status(401).json({
      mensaje: 'Token inválido o expirado'
    });
  }
}