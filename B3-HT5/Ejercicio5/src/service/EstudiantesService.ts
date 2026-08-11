import { EstudiantesRepository } from "../data/EstudiantesRepository.js";
import { Estudiantes } from "../model/estudiantesModel.js";

export class EstudiantesService {

    private repository = new EstudiantesRepository();

    private validarEstudiante(estudiante: Estudiantes): void {

        if (estudiante.id < 0) {
            throw new Error("El ID no puede ser negativo.");
        }

        if (!estudiante.nombre || estudiante.nombre.trim() === "") {
            throw new Error("El nombre es obligatorio.");
        }

        if (estudiante.nombre.length < 2) {
            throw new Error("El nombre debe tener al menos 2 caracteres.");
        }

        if (!estudiante.apellido || estudiante.apellido.trim() === "") {
            throw new Error("El apellido es obligatorio.");
        }

        if (estudiante.apellido.length < 2) {
            throw new Error("El apellido debe tener al menos 2 caracteres.");
        }

        if (!estudiante.email || estudiante.email.trim() === "") {
            throw new Error("El correo es obligatorio.");
        }

        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailValido.test(estudiante.email)) {
            throw new Error("El correo no tiene un formato válido.");
        }

        if (!estudiante.telefono || estudiante.telefono.trim() === "") {
            throw new Error("El teléfono es obligatorio.");
        }

        if (estudiante.telefono.length < 8) {
            throw new Error("El teléfono debe tener al menos 8 caracteres.");
        }

        if (!estudiante.direccion || estudiante.direccion.trim() === "") {
            throw new Error("La dirección es obligatoria.");
        }

    }

    async listar(): Promise<Estudiantes[]> {
        return await this.repository.obtenerEstudiantes();
    }

    async agregar(estudiante: Estudiantes): Promise<void> {

        this.validarEstudiante(estudiante);

        const estudiantes = await this.repository.obtenerEstudiantes();

        const existeId = estudiantes.some(e => e.id === estudiante.id);

        if (existeId) {
            throw new Error("Ya existe un estudiante con ese ID.");
        }

        const existeCorreo = estudiantes.some(
            e => e.email.toLowerCase() === estudiante.email.toLowerCase()
        );

        if (existeCorreo) {
            throw new Error("Ya existe un estudiante con ese correo.");
        }

        estudiantes.push(estudiante);

        await this.repository.guardarEstudiantes(estudiantes);
    }

    async buscar(id: number): Promise<Estudiantes | undefined> {
        const estudiantes = await this.repository.obtenerEstudiantes();

        return estudiantes.find(e => e.id === id);
    }

    async actualizar(estudiante: Estudiantes): Promise<void> {

        this.validarEstudiante(estudiante);

        const estudiantes = await this.repository.obtenerEstudiantes();

        const indice = estudiantes.findIndex(e => e.id === estudiante.id);

        if (indice === -1) {
            throw new Error("Estudiante no encontrado.");
        }

        const existeCorreo = estudiantes.some(
            e =>
                e.email.toLowerCase() === estudiante.email.toLowerCase() &&
                e.id !== estudiante.id
        );

        if (existeCorreo) {
            throw new Error("Ya existe un estudiante con ese correo.");
        }

        estudiantes[indice] = estudiante;

        await this.repository.guardarEstudiantes(estudiantes);
    }

    async eliminar(id: number): Promise<void> {
        try {

            const estudiantes = await this.repository.obtenerEstudiantes();

            const nuevo = estudiantes.filter(e => e.id !== id);

            if (nuevo.length === estudiantes.length) {
                throw new Error("Estudiante no encontrado.");
            }

            await this.repository.guardarEstudiantes(nuevo);

            console.log("Estudiante eliminado");

        } catch (error) {
            throw new Error("Error al eliminar");
        }
    }
}