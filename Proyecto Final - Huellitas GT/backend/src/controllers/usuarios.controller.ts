import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { db } from '../config/database.js';

// Obtiene todos los usuarios registrados.
export async function obtenerUsuarios(
  _req: Request,
  res: Response
): Promise<void> {
  try {
    const [usuarios] = await db.query(`
      SELECT
        u.id_usuario,
        u.nombre,
        u.apellido,
        u.correo,
        u.telefono,
        u.id_rol,
        r.nombre AS rol,
        u.fecha_registro,
        u.estado
      FROM usuarios u
      INNER JOIN roles r ON u.id_rol = r.id_rol
    `);

    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);

    res.status(500).json({
      mensaje: 'Error al obtener los usuarios'
    });
  }
}

// Registra un nuevo usuario.
export async function crearUsuario(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const {
      nombre,
      apellido,
      correo,
      password,
      telefono,
      id_rol
    } = req.body;

    // Validamos los datos mínimos necesarios para crear la cuenta.
    if (!nombre || !apellido || !correo || !password || !id_rol) {
      res.status(400).json({
        mensaje: 'Nombre, apellido, correo, contraseña e id_rol son obligatorios'
      });
      return;
    }

    // Evita registrar dos cuentas con el mismo correo.
    const [usuarioExistente] = await db.query(
      'SELECT id_usuario FROM usuarios WHERE correo = ?',
      [correo]
    );

    if (Array.isArray(usuarioExistente) && usuarioExistente.length > 0) {
      res.status(409).json({
        mensaje: 'El correo ya está registrado'
      });
      return;
    }

    // La contraseña se guarda como hash, nunca en texto plano.
    const passwordHash = await bcrypt.hash(password, 10);

    const [resultado] = await db.query(
      `INSERT INTO usuarios
        (nombre, apellido, correo, password, telefono, id_rol, fecha_registro, estado)
       VALUES (?, ?, ?, ?, ?, ?, NOW(), TRUE)`,
      [
        nombre,
        apellido,
        correo,
        passwordHash,
        telefono ?? null,
        id_rol
      ]
    );

    const insertId = (resultado as { insertId: number }).insertId;

    res.status(201).json({
      mensaje: 'Usuario creado correctamente',
      id_usuario: insertId
    });
  } catch (error) {
    console.error('Error al crear el usuario:', error);

    res.status(500).json({
      mensaje: 'Error al crear el usuario'
    });
  }
}