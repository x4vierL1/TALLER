import { Request, Response } from 'express';
import { db } from '../config/database.js';

// Obtiene todos los refugios activos.
export async function obtenerRefugios(
  _req: Request,
  res: Response
): Promise<void> {
  try {
    const [refugios] = await db.query(`
      SELECT
        r.id_refugio,
        r.nombre,
        r.descripcion,
        r.telefono,
        r.correo,
        r.direccion,
        r.zona,
        r.municipio,
        r.departamento,
        r.id_usuario,
        CONCAT(u.nombre, ' ', u.apellido) AS responsable,
        r.fecha_registro,
        r.estado
      FROM refugios r
      INNER JOIN usuarios u
        ON r.id_usuario = u.id_usuario
      WHERE r.estado = TRUE
      ORDER BY r.fecha_registro DESC
    `);

    res.json(refugios);
  } catch (error) {
    console.error('Error al obtener los refugios:', error);

    res.status(500).json({
      mensaje: 'Error al obtener los refugios'
    });
  }
}

// Registra un nuevo refugio.
export async function crearRefugio(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const {
      nombre,
      descripcion,
      telefono,
      correo,
      direccion,
      zona,
      municipio,
      departamento,
      id_usuario
    } = req.body;

    // Validamos los datos mínimos necesarios.
    if (
      !nombre ||
      !direccion ||
      !zona ||
      !municipio ||
      !departamento ||
      !id_usuario
    ) {
      res.status(400).json({
        mensaje: 'Faltan datos obligatorios para registrar el refugio'
      });
      return;
    }

    const [resultado] = await db.query(
      `INSERT INTO refugios
        (
          nombre,
          descripcion,
          telefono,
          correo,
          direccion,
          zona,
          municipio,
          departamento,
          id_usuario,
          fecha_registro,
          estado
        )
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), TRUE)`,
      [
        nombre,
        descripcion ?? null,
        telefono ?? null,
        correo ?? null,
        direccion,
        zona,
        municipio,
        departamento,
        id_usuario
      ]
    );

    const insertId = (resultado as { insertId: number }).insertId;

    res.status(201).json({
      mensaje: 'Refugio registrado correctamente',
      id_refugio: insertId
    });
  } catch (error) {
    console.error('Error al crear el refugio:', error);

    res.status(500).json({
      mensaje: 'Error al registrar el refugio'
    });
  }
}