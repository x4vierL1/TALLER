import { readFile, writeFile } from "fs/promises";
import { Calificacion } from "../model/CalificacionesModel.js";

export class CalificacionesRepository {

    private route = "./src/data/calificaciones.json";

    async obtenerCalificaciones(): Promise<Calificacion[]> {
        try {
            const data = await readFile(this.route, "utf-8");
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async guardarCalificaciones(calificaciones: Calificacion[]): Promise<void> {
        try {
            await writeFile(
                this.route,
                JSON.stringify(calificaciones, null, 4)
            );
        } catch (error) {
            console.error("Error al guardar las calificaciones:", error);
            throw error;
        }
    }
}