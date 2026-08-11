import { CursosRepository } from "../data/CursosRepository.js";
import { Curso } from "../model/cursosModel.js";

export class CursosService {

    private repository = new CursosRepository();

    private validarCurso(curso: Curso): void {
        if (curso.id < 0) {

            throw new Error("El ID no puede ser negativo.");
        }

        if (!curso.nombre || curso.nombre.trim() === "") {

            throw new Error("El nombre del curso es obligatorio.");
        }

        if (!curso.descripcion || curso.descripcion.trim() === "") {

            throw new Error("La descripción es obligatoria.");
        }

        if (curso.docenteId < 0) {

            throw new Error("El ID del docente es obligatorio.");
        }
    }

    async listar(): Promise<Curso[]> {
        return await this.repository.obtenerCursos();

    }

    async agregar(curso: Curso): Promise<void> {
        this.validarCurso(curso);

        const cursos = await this.repository.obtenerCursos();
        const existeId = cursos.some(c => c.id === curso.id);

        if (existeId) {

            throw new Error("Ya existe un curso con ese ID.");

        }

        cursos.push(curso);

        await this.repository.guardarCursos(cursos);
    }

    async buscar(id: number): Promise<Curso | undefined> {
        const cursos = await this.repository.obtenerCursos();

        return cursos.find(c => c.id === id);

    }

    async actualizar(curso: Curso): Promise<void> {
        this.validarCurso(curso);

        const cursos = await this.repository.obtenerCursos();
        const indice = cursos.findIndex(c => c.id === curso.id);

        if (indice === -1) {

            throw new Error("Curso no encontrado.");

        }

        cursos[indice] = curso;

        await this.repository.guardarCursos(cursos);
    }

    async eliminar(id: number): Promise<void> {

        try {
            const cursos = await this.repository.obtenerCursos();
            const nuevo = cursos.filter(c => c.id !== id);

            if (nuevo.length === cursos.length) {

                throw new Error("Curso no encontrado.");

            }

            await this.repository.guardarCursos(nuevo);

            console.log("Curso eliminado");
        } catch (error) {
            throw new Error("Error al eliminar el curso.");

        }

    }

}