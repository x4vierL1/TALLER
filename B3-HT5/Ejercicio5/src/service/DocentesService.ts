import { DocentesRepository } from "../data/DocentesRepository.js";
import { Docentes } from "../model/docentesModel.js";

export class DocentesService {

    private repository = new DocentesRepository();

    private validarDocente(docente: Docentes): void {

        if (docente.id < 0) {
            throw new Error("El ID no puede ser negativo.");
        }

        if (!docente.nombre || docente.nombre.trim() === "") {
            throw new Error("El nombre es obligatorio.");
        }

        if (!docente.apellido || docente.apellido.trim() === "") {
            throw new Error("El apellido es obligatorio.");
        }

        if (!docente.email || docente.email.trim() === "") {
            throw new Error("El correo es obligatorio.");
        }

        if (!docente.telefono || docente.telefono.trim() === "") {
            throw new Error("El teléfono es obligatorio.");
        }
    }

    async listar(): Promise<Docentes[]> {
        return await this.repository.obtenerDocentes();
    }

    async agregar(docente: Docentes): Promise<void> {

        this.validarDocente(docente);

        const docentes = await this.repository.obtenerDocentes();

        const existeId = docentes.some(d => d.id === docente.id);

        if (existeId) {
            throw new Error("Ya existe un docente con ese ID.");
        }

        const existeCorreo = docentes.some(
            d => d.email.toLowerCase() === docente.email.toLowerCase()
        );

        if (existeCorreo) {
            throw new Error("Ya existe un docente con ese correo.");
        }

        docentes.push(docente);

        await this.repository.guardarDocentes(docentes);
    }

    async buscar(id: number): Promise<Docentes | undefined> {
        const docentes = await this.repository.obtenerDocentes();

        return docentes.find(d => d.id === id);
    }

    async actualizar(docente: Docentes): Promise<void> {

        this.validarDocente(docente);

        const docentes = await this.repository.obtenerDocentes();

        const indice = docentes.findIndex(d => d.id === docente.id);

        if (indice === -1) {
            throw new Error("Docente no encontrado.");
        }

        const existeCorreo = docentes.some(
            d =>
                d.email.toLowerCase() === docente.email.toLowerCase() &&
                d.id !== docente.id
        );

        if (existeCorreo) {
            throw new Error("Ya existe un docente con ese correo.");
        }

        docentes[indice] = docente;

        await this.repository.guardarDocentes(docentes);
    }

    async eliminar(id: number): Promise<void> {
        try {

            const docentes = await this.repository.obtenerDocentes();

            const nuevo = docentes.filter(d => d.id !== id);

            if (nuevo.length === docentes.length) {
                throw new Error("Docente no encontrado.");
            }

            await this.repository.guardarDocentes(nuevo);

            console.log("Docente eliminado");

        } catch (error) {
            throw new Error("Error al eliminar");
        }
    }
}