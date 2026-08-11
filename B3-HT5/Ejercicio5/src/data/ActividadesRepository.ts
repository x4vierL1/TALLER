import { readFile, writeFile } from 'fs/promises';
import { Actividad } from '../model/ActividadesModel.js';

export class ActividadesRepository {
    private route = "./src/data/actividades.json";

    async obtenerActividades(): Promise<Actividad[]> {
        try {
            const data = await readFile(this.route, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async guardarActividades(actividad: Actividad[]): Promise<void> {
        try {
            await writeFile(this.route, JSON.stringify(actividad, null, 4));
        } catch (error) {
            console.error('Error al guardar las actividades:', error);
            throw error;
        }
    }
}