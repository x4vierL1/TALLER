import { EntregasRepository } from "../data/EntregasRepository.js";
import { Entrega } from "../model/EntregasModel.js";
import { ActividadesRepository } from "../data/ActividadesRepository.js";
import { InscripcionesRepository } from "../data/InscripcionesRepository.js";
import { CalificacionesRepository } from "../data/CalificacionesRepository.js";

export class EntregasService {


    private repository = new EntregasRepository();
    private actividadesRepository = new ActividadesRepository();
    private inscripcionesRepository = new InscripcionesRepository();
    private calificacionesRepository = new CalificacionesRepository();

    private validarEntrega(entrega: Entrega): void {
        if (entrega.id < 0) {

            throw new Error("El ID no puede ser negativo.");
        }

        if (entrega.actividadId <= 0) {

            throw new Error("El ID de la actividad es obligatorio.");
        }

        if (entrega.estudianteId <= 0) {

            throw new Error("El ID del estudiante es obligatorio.");
        }

        if (!entrega.fechaEntrega || entrega.fechaEntrega.trim() === "") {

            throw new Error("La fecha de entrega es obligatoria.");
        }

        if (!entrega.archivo || entrega.archivo.trim() === "") {

            throw new Error("El archivo es obligatorio.");
        }
    }

    private async validarEstudianteInscrito(entrega: Entrega): Promise<void> {
        const actividades = await this.actividadesRepository.obtenerActividades();
        const actividad = actividades.find(a => a.id === entrega.actividadId);

        if (!actividad) {

            throw new Error("La actividad no existe.");

        }

        const inscripciones = await this.inscripcionesRepository.obtenerInscripciones();
        const existeInscripcion = inscripciones.some(i => i.estudianteId === entrega.estudianteId && i.cursoId === actividad.cursoId);

        if (!existeInscripcion) {

            throw new Error("El estudiante no está inscrito en el curso de esta actividad.");
        }
    }

    private async validarEntregaCalificada(entregaId: number): Promise<void> {

        const calificaciones = await this.calificacionesRepository.obtenerCalificaciones();
        const existeCalificacion = calificaciones.some(c => c.entregaId === entregaId);

        if (existeCalificacion) {

            throw new Error("No se puede modificar una entrega ya calificada.");

        }

    }

    async listar(): Promise<Entrega[]> {
        return await this.repository.obtenerEntregas();

    }

    async agregar(entrega: Entrega): Promise<void> {
        this.validarEntrega(entrega);

        await this.validarEstudianteInscrito(entrega);

        const entregas = await this.repository.obtenerEntregas();
        const existeId = entregas.some(e => e.id === entrega.id);

        if (existeId) {

            throw new Error("Ya existe una entrega con ese ID.");

        }

        const existeEntrega = entregas.some(e => e.actividadId === entrega.actividadId && e.estudianteId === entrega.estudianteId);

        if (existeEntrega) {

            throw new Error("El estudiante ya entregó esta actividad.");
        }

        entregas.push(entrega);

        await this.repository.guardarEntregas(entregas);
    }

    async buscar(id: number): Promise<Entrega | undefined> {
        const entregas = await this.repository.obtenerEntregas();

        return entregas.find(e => e.id === id);

    }

    async actualizar(entrega: Entrega): Promise<void> {
        this.validarEntrega(entrega);

        await this.validarEstudianteInscrito(entrega);
        await this.validarEntregaCalificada(entrega.id);

        const entregas = await this.repository.obtenerEntregas();
        const indice = entregas.findIndex(e => e.id === entrega.id);

        if (indice === -1) {

            throw new Error("Entrega no encontrada.");

        }

        const entregaDuplicada = entregas.some(e => e.id !== entrega.id && e.actividadId === entrega.actividadId && e.estudianteId === entrega.estudianteId);

        if (entregaDuplicada) {

            throw new Error("El estudiante ya tiene una entrega para esta actividad.");

        }

        entregas[indice] = entrega;

        await this.repository.guardarEntregas(entregas);
    }

    async eliminar(id: number): Promise<void> {

        try {
            const entregas = await this.repository.obtenerEntregas();
            const nuevo = entregas.filter(e => e.id !== id);

            if (nuevo.length === entregas.length) {

                throw new Error("Entrega no encontrada.");

            }

            await this.repository.guardarEntregas(nuevo);

            console.log("Entrega eliminada");
        } catch (error) {
            throw new Error("Error al eliminar la entrega.");

        }

    }

}