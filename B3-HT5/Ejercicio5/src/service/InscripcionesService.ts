import { InscripcionesRepository } from "../data/InscripcionesRepository.js";
import { Inscripciones } from "../model/InscripcionesModel.js";
import { EstudiantesRepository } from "../data/EstudiantesRepository.js";
import { CursosRepository } from "../data/CursosRepository.js";

export class InscripcionesService {

    private repository = new InscripcionesRepository();
    private estudiantesRepository = new EstudiantesRepository();
    private cursosRepository = new CursosRepository();

    private validarInscripcion(inscripcion: Inscripciones): void {
        if (inscripcion.id < 0) {

            throw new Error("El ID no puede ser negativo.");
        }

        if (inscripcion.estudianteId <= 0) {

            throw new Error("El estudiante es obligatorio.");
        }

        if (inscripcion.cursoId <= 0) {

            throw new Error("El curso es obligatorio.");
        }

        if (!inscripcion.fecha || inscripcion.fecha.trim() === "") {

            throw new Error("La fecha de inscripción es obligatoria.");
        }
    }

    private async validarExistencia(inscripcion: Inscripciones): Promise<void> {
        const estudiantes = await this.estudiantesRepository.obtenerEstudiantes();
        const existeEstudiante = estudiantes.some(e => e.id === inscripcion.estudianteId);

        if (!existeEstudiante) {

            throw new Error("El estudiante no existe.");

        }

        const cursos = await this.cursosRepository.obtenerCursos();
        const existeCurso = cursos.some(c => c.id === inscripcion.cursoId);

        if (!existeCurso) {

            throw new Error("El curso no existe.");

        }
    }

    async listar(): Promise<Inscripciones[]> {
        return await this.repository.obtenerInscripciones();

    }

    async agregar(inscripcion: Inscripciones): Promise<void> {
        this.validarInscripcion(inscripcion);
        await this.validarExistencia(inscripcion);

        const inscripciones = await this.repository.obtenerInscripciones();
        const existeId = inscripciones.some(i => i.id === inscripcion.id);

        if (existeId) {

            throw new Error("Ya existe una inscripción con ese ID.");

        }

        const duplicada = inscripciones.some(i => i.estudianteId === inscripcion.estudianteId && i.cursoId === inscripcion.cursoId);

        if (duplicada) {

            throw new Error("El estudiante ya está inscrito en este curso.");
        }

        inscripciones.push(inscripcion);

        await this.repository.guardarInscripciones(inscripciones);
    }

    async buscar(id: number): Promise<Inscripciones | undefined> {
        const inscripciones = await this.repository.obtenerInscripciones();

        return inscripciones.find(i => i.id === id);

    }

    async actualizar(inscripcion: Inscripciones): Promise<void> {
        this.validarInscripcion(inscripcion);
        await this.validarExistencia(inscripcion);

        const inscripciones = await this.repository.obtenerInscripciones();
        const indice = inscripciones.findIndex(i => i.id === inscripcion.id);

        if (indice === -1) {

            throw new Error("Inscripción no encontrada.");

        }

        const duplicada = inscripciones.some(i => i.id !== inscripcion.id && i.estudianteId === inscripcion.estudianteId && i.cursoId === inscripcion.cursoId);

        if (duplicada) {

            throw new Error("El estudiante ya está inscrito en este curso.");

        }

        inscripciones[indice] = inscripcion;

        await this.repository.guardarInscripciones(inscripciones);
    }

    async eliminar(id: number): Promise<void> {

        try {
            const inscripciones = await this.repository.obtenerInscripciones();
            const nuevo = inscripciones.filter(i => i.id !== id);

            if (nuevo.length === inscripciones.length) {

                throw new Error("Inscripción no encontrada.");

            }

            await this.repository.guardarInscripciones(nuevo);

            console.log("Inscripción eliminada");
        } catch (error) {
            throw new Error("Error al eliminar la inscripción.");

        }

    }

}