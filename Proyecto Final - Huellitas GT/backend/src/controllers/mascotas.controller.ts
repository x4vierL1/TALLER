import { Request, Response } from 'express';
import { db } from '../config/database.js';

// Obtiene todas las mascotas activas con su especie, raza y refugio.
export async function obtenerMascotas(
  _req: Request,
  res: Response
): Promise<void> {
  try {
    const [mascotas] = await db.query(`
      SELECT
        m.id_mascota,
        m.nombre,
        m.id_especie,
        e.nombre AS especie,
        m.id_raza,
        r.nombre AS raza,
        m.edad_valor,
        m.unidad_edad,
        m.sexo,
        m.tamano,
        m.descripcion,
        m.ubicacion,
        m.id_refugio,
        ref.nombre AS refugio,
        m.estado_adopcion,
        m.fecha_registro
      FROM mascotas m
      INNER JOIN especies e
        ON m.id_especie = e.id_especie
      LEFT JOIN razas r
        ON m.id_raza = r.id_raza
      INNER JOIN refugios ref
        ON m.id_refugio = ref.id_refugio
      WHERE m.estado = TRUE
      ORDER BY m.fecha_registro DESC
    `);

    res.json(mascotas);
  } catch (error) {
    console.error('Error al obtener las mascotas:', error);

    res.status(500).json({
      mensaje: 'Error al obtener las mascotas'
    });
  }
}

// Obtiene una mascota específica por su ID.
export async function obtenerMascotaPorId(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({
        mensaje: 'El ID de la mascota no es válido'
      });
      return;
    }

    const [mascotas] = await db.query(
      `
      SELECT
        m.id_mascota,
        m.nombre,
        m.id_especie,
        e.nombre AS especie,
        m.id_raza,
        r.nombre AS raza,
        m.edad_valor,
        m.unidad_edad,
        m.sexo,
        m.tamano,
        m.descripcion,
        m.ubicacion,
        m.id_refugio,
        ref.nombre AS refugio,
        m.estado_adopcion,
        m.fecha_registro
      FROM mascotas m
      INNER JOIN especies e
        ON m.id_especie = e.id_especie
      LEFT JOIN razas r
        ON m.id_raza = r.id_raza
      INNER JOIN refugios ref
        ON m.id_refugio = ref.id_refugio
      WHERE m.id_mascota = ?
        AND m.estado = TRUE
      `,
      [id]
    );

    if (!Array.isArray(mascotas) || mascotas.length === 0) {
      res.status(404).json({
        mensaje: 'Mascota no encontrada'
      });
      return;
    }

    res.json(mascotas[0]);
  } catch (error) {
    console.error('Error al obtener la mascota:', error);

    res.status(500).json({
      mensaje: 'Error al obtener la mascota'
    });
  }
}

// Registra una nueva mascota.
export async function crearMascota(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const {
      nombre,
      id_especie,
      id_raza,
      edad_valor,
      unidad_edad,
      sexo,
      tamano,
      descripcion,
      ubicacion,
      id_refugio
    } = req.body;

    // Validamos los datos mínimos necesarios.
    if (
      !nombre ||
      !id_especie ||
      edad_valor === undefined ||
      !unidad_edad ||
      !sexo ||
      !tamano ||
      !ubicacion ||
      !id_refugio
    ) {
      res.status(400).json({
        mensaje: 'Faltan datos obligatorios para registrar la mascota'
      });
      return;
    }

    const [resultado] = await db.query(
      `INSERT INTO mascotas
        (
          nombre,
          id_especie,
          id_raza,
          edad_valor,
          unidad_edad,
          sexo,
          tamano,
          descripcion,
          ubicacion,
          id_refugio,
          estado_adopcion,
          fecha_registro,
          estado
        )
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Disponible', NOW(), TRUE)`,
      [
        nombre,
        id_especie,
        id_raza ?? null,
        edad_valor,
        unidad_edad,
        sexo,
        tamano,
        descripcion ?? null,
        ubicacion,
        id_refugio
      ]
    );

    const insertId = (resultado as { insertId: number }).insertId;

    res.status(201).json({
      mensaje: 'Mascota registrada correctamente',
      id_mascota: insertId
    });
  } catch (error) {
    console.error('Error al crear la mascota:', error);

    res.status(500).json({
      mensaje: 'Error al registrar la mascota'
    });
  }
}