import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../config/database.js';

// Inicia sesión y genera un token para el usuario.
export async function iniciarSesion(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { correo, password } = req.body;

    if (!correo || !password) {
      res.status(400).json({
        mensaje: 'Correo y contraseña son obligatorios'
      });
      return;
    }

    // Busca al usuario junto con su rol.
    const [usuarios] = await db.query(
      `SELECT
        u.id_usuario,
        u.nombre,
        u.apellido,
        u.correo,
        u.password,
        u.id_rol,
        r.nombre AS rol,
        u.estado
       FROM usuarios u
       INNER JOIN roles r ON u.id_rol = r.id_rol
       WHERE u.correo = ?`,
      [correo]
    );

    if (!Array.isArray(usuarios) || usuarios.length === 0) {
      res.status(401).json({
        mensaje: 'Correo o contraseña incorrectos'
      });
      return;
    }

    const usuario = usuarios[0] as {
      id_usuario: number;
      nombre: string;
      apellido: string;
      correo: string;
      password: string;
      id_rol: number;
      rol: string;
      estado: number;
    };

    if (!usuario.estado) {
      res.status(403).json({
        mensaje: 'La cuenta está desactivada'
      });
      return;
    }

    // Compara la contraseña recibida con el hash almacenado.
    const passwordValida = await bcrypt.compare(
      password,
      usuario.password
    );

    if (!passwordValida) {
      res.status(401).json({
        mensaje: 'Correo o contraseña incorrectos'
      });
      return;
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      res.status(500).json({
        mensaje: 'JWT_SECRET no está configurado'
      });
      return;
    }

    // El token identifica al usuario durante las siguientes peticiones.
    const token = jwt.sign(
      {
        id_usuario: usuario.id_usuario,
        id_rol: usuario.id_rol,
        rol: usuario.rol
      },
      secret,
      {
        expiresIn: '2h'
      }
    );

    res.json({
      mensaje: 'Inicio de sesión exitoso',
      token,
      usuario: {
        id_usuario: usuario.id_usuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo,
        id_rol: usuario.id_rol,
        rol: usuario.rol
      }
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);

    res.status(500).json({
      mensaje: 'Error al iniciar sesión'
    });
  }
}