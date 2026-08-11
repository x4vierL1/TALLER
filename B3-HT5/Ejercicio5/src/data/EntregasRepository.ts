import { readFile, writeFile } from "fs/promises";
import { Entrega } from "../model/EntregasModel.js";

export class EntregasRepository {

    private route = "./src/data/entregas.json";


    async obtenerEntregas(): Promise<Entrega[]> {

        try {

            const data = await readFile(this.route, "utf-8");

            return JSON.parse(data);

        } catch (error) {

            return [];

        }
    }



    async guardarEntregas(entregas: Entrega[]): Promise<void> {

        try {

            await writeFile(
                this.route,
                JSON.stringify(entregas, null, 4)
            );

        } catch (error) {

            console.error("Error al guardar las entregas:", error);

            throw error;
        }
    }
}