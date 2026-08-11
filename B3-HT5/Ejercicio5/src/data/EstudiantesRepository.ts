import { readFile, writeFile } from 'fs/promises';
import { Estudiantes } from '../model/estudiantesModel.js';

export class EstudiantesRepository {
    private route = "./src/data/estudiantes.json";

    async obtenerEstudiantes(): Promise<Estudiantes[]> {
        try {
            const data = await readFile(this.route, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async guardarEstudiantes(estudiante: Estudiantes[]): Promise<void> {
        try {
            await writeFile(this.route, JSON.stringify(estudiante, null, 4));
        } catch (error) {
            console.error('Error al guardar los estudiantes:', error);
            throw error;
        }
    }
}