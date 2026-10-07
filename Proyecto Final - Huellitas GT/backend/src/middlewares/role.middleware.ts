import { Response, NextFunction } from 'express';
import {
  RequestAutenticado
} from './auth.middleware.js';

// Permite acceder a una ruta únicamente a los roles indicados.
export function autorizarRoles(...rolesPermitidos: string[]) {
  return (
    req: RequestAutenticado,
    res: Response,
    next: NextFunction
  ): void => {
    if (!req.usuario) {
      res.status(401).json({
        mensaje: 'Usuario no autenticado'
      });
      return;
    }

    if (!rolesPermitidos.includes(req.usuario.rol)) {
      res.status(403).json({
        mensaje: 'No tienes permisos para realizar esta acción'
      });
      return;
    }

    next();
  };
}