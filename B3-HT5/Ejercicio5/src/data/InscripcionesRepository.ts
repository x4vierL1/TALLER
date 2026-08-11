import { readFile, writeFile } from 'fs/promises';
import { Inscripciones } from '../model/InscripcionesModel.js';

export class InscripcionesRepository {
    private route = "./src/data/inscripciones.json";

    async obtenerInscripciones(): Promise<Inscripciones[]> {
        try {
            const data = await readFile(this.route, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async guardarInscripciones(inscripcion: Inscripciones[]): Promise<void> {
        try {
            await writeFile(this.route, JSON.stringify(inscripcion, null, 4));
        } catch (error) {
            console.error('Error al guardar las inscripciones:', error);
            throw error;
        }
    }
}