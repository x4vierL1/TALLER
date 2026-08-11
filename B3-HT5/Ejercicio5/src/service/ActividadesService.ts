import { ActividadesRepository } from "../data/ActividadesRepository.js";
import { Actividad } from "../model/ActividadesModel.js";

export class ActividadesService {

    private repository = new ActividadesRepository();

    private validarActividad(actividad: Actividad): void {

        if (actividad.id < 0) {
            throw new Error("El ID no puede ser negativo.");
        }

        if (actividad.cursoId < 0) {
            throw new Error("El ID del curso es obligatorio.");
        }

        if (!actividad.nombre || actividad.nombre.trim() === "") {
            throw new Error("El nombre es obligatorio.");
        }

        if (!actividad.descripcion || actividad.descripcion.trim() === "") {
            throw new Error("La descripción es obligatoria.");
        }

        if (actividad.ponderacion <= 0) {
            throw new Error("La ponderación debe ser mayor que 0.");
        }

        if (actividad.ponderacion > 100) {
            throw new Error("La ponderación no puede ser mayor que 100.");
        }
    }

    async listar(): Promise<Actividad[]> {
        return await this.repository.obtenerActividades();
    }

    async agregar(actividad: Actividad): Promise<void> {

        this.validarActividad(actividad);

        const actividades = await this.repository.obtenerActividades();

        const existeId = actividades.some(a => a.id === actividad.id);

        if (existeId) {
            throw new Error("Ya existe una actividad con ese ID.");
        }

        const totalPonderacion = actividades
            .filter(a => a.cursoId === actividad.cursoId)
            .reduce((total, a) => total + a.ponderacion, 0);

        if (totalPonderacion + actividad.ponderacion > 100) {
            throw new Error("La ponderación total del curso no puede superar el 100%.");
        }

        actividades.push(actividad);

        await this.repository.guardarActividades(actividades);
    }

    async buscar(id: number): Promise<Actividad | undefined> {
        const actividades = await this.repository.obtenerActividades();

        return actividades.find(a => a.id === id);
    }

    async actualizar(actividad: Actividad): Promise<void> {

        this.validarActividad(actividad);

        const actividades = await this.repository.obtenerActividades();

        const indice = actividades.findIndex(a => a.id === actividad.id);

        if (indice === -1) {
            throw new Error("Actividad no encontrada.");
        }

        const totalPonderacion = actividades
            .filter(a => a.cursoId === actividad.cursoId && a.id !== actividad.id)
            .reduce((total, a) => total + a.ponderacion, 0);

        if (totalPonderacion + actividad.ponderacion > 100) {
            throw new Error("La ponderación total del curso no puede superar el 100%.");
        }

        actividades[indice] = actividad;

        await this.repository.guardarActividades(actividades);
    }

    async eliminar(id: number): Promise<void> {
        try {

            const actividades = await this.repository.obtenerActividades();

            const nuevo = actividades.filter(a => a.id !== id);

            if (nuevo.length === actividades.length) {
                throw new Error("Actividad no encontrada.");
            }

            await this.repository.guardarActividades(nuevo);

            console.log("Actividad eliminada");

        } catch (error) {
            throw new Error("Error al eliminar");
        }
    }
}