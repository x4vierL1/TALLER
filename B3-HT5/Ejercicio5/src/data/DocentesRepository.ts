import { readFile, writeFile } from 'fs/promises';
import { Docentes } from '../model/docentesModel.js';

export class DocentesRepository {
    private route = "./src/data/docentes.json";

    async obtenerDocentes(): Promise<Docentes[]> {
        try {
            const data = await readFile(this.route, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async guardarDocentes(docentes: Docentes[]): Promise<void> {
        try {
            await writeFile(this.route, JSON.stringify(docentes, null, 4));
        } catch (error) {
            console.error('Error al guardar los docentes:', error);
            throw error;
        }
    }
}