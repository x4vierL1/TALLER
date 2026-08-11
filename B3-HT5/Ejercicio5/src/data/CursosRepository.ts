import { readFile, writeFile } from "fs/promises";
import { Curso } from "../model/cursosModel.js";

export class CursosRepository {

    private route = "./src/data/cursos.json";


    async obtenerCursos(): Promise<Curso[]> {

        try {

            const data = await readFile(this.route, "utf-8");

            return JSON.parse(data);

        } catch (error) {

            return [];

        }
    }


    async guardarCursos(cursos: Curso[]): Promise<void> {

        try {

            await writeFile(
                this.route,
                JSON.stringify(cursos, null, 4)
            );

        } catch (error) {

            console.error("Error al guardar los cursos:", error);

            throw error;
        }
    }
}