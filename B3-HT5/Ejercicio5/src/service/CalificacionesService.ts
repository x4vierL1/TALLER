import { CalificacionesRepository } from "../data/CalificacionesRepository.js";
import { Calificacion } from "../model/CalificacionesModel.js";
import { EntregasRepository } from "../data/EntregasRepository.js";
import { ActividadesRepository } from "../data/ActividadesRepository.js";
import { EstudiantesRepository } from "../data/EstudiantesRepository.js";

export class CalificacionesService {
    private repository = new CalificacionesRepository();
    private entregasRepository = new EntregasRepository();
    private actividadesRepository = new ActividadesRepository();
    private estudiantesRepository = new EstudiantesRepository();

    private validarCalificacion(calificacion: Calificacion): void {

        if (calificacion.id < 0) {
            throw new Error("El ID no puede ser negativo.");
        }

        if (calificacion.entregaId <= 0) {
            throw new Error("El ID de la entrega es obligatorio.");
        }

        if (calificacion.nota < 0 || calificacion.nota > 100) {
            throw new Error("La nota debe estar entre 0 y 100.");
        }

        if (!calificacion.observacion || calificacion.observacion.trim() === "") {
            throw new Error("La observación es obligatoria.");
        }
    }



    private async validarEntregaExiste(entregaId:number):Promise<void>{

        const entregas = await this.entregasRepository.obtenerEntregas();
        const existe = entregas.some(e => e.id === entregaId);

        if(!existe){
            throw new Error("La entrega no existe.");
        }

    }

    async listar(): Promise<Calificacion[]> {
        return await this.repository.obtenerCalificaciones();
    }





    async agregar(calificacion: Calificacion): Promise<void> {
        this.validarCalificacion(calificacion);

        await this.validarEntregaExiste(
            calificacion.entregaId
        );

        const calificaciones = await this.repository.obtenerCalificaciones();
        const existeId = calificaciones.some(c => c.id === calificacion.id);


        if (existeId) { 
            
            throw new Error( "Ya existe una calificación con ese ID.");

        }

        const entregaCalificada = calificaciones.some( c => c.entregaId === calificacion.entregaId);
        if (entregaCalificada) {

            throw new Error("Esta entrega ya tiene una calificación.");

        }
        calificaciones.push(calificacion);

        await this.repository.guardarCalificaciones(
            calificaciones
        );

    }

    async buscar(id: number): Promise<Calificacion | undefined> {
        const calificaciones = await this.repository.obtenerCalificaciones();
        return calificaciones.find(c => c.id === id);

    }

    async actualizar(calificacion: Calificacion): Promise<void> {
        this.validarCalificacion(calificacion);

        const calificaciones = await this.repository.obtenerCalificaciones();
        const indice = calificaciones.findIndex( c => c.id === calificacion.id );

        if (indice === -1) {

            throw new Error("Calificación no encontrada.");

        }

        const entregaCalificada = calificaciones.some(c =>c.entregaId === calificacion.entregaId && c.id !== calificacion.id);

        if (entregaCalificada) {

            throw new Error("Esta entrega ya tiene otra calificación.");

        }

        calificaciones[indice] = calificacion;

        await this.repository.guardarCalificaciones(
            calificaciones
        );

    }

    async calcularPromedio( estudianteId:number,cursoId:number):Promise<number>{

        const entregas = await this.entregasRepository.obtenerEntregas();
        const actividades = await this.actividadesRepository.obtenerActividades();
        const calificaciones = await this.repository.obtenerCalificaciones();
        const entregasEstudiante = entregas.filter( e => e.estudianteId === estudianteId);

        let promedio = 0;

        for(const entrega of entregasEstudiante){
            const actividad = actividades.find(a => a.id === entrega.actividadId && a.cursoId === cursoId);

            if(!actividad){

                continue;

            }

            const calificacion = calificaciones.find(c =>c.entregaId === entrega.id);
        
            if(!calificacion){

                continue;

            }

            promedio += 
                calificacion.nota *
                (actividad.ponderacion / 100);

        }
        return Number(promedio.toFixed(2));

    }

    private async calcularPromedioGeneral(estudianteId:number):Promise<number>{
        const entregas = await this.entregasRepository.obtenerEntregas();
        const actividades = await this.actividadesRepository.obtenerActividades();
        const calificaciones = await this.repository.obtenerCalificaciones();

        let promedio = 0;

        const entregasEstudiante = entregas.filter( e => e.estudianteId === estudianteId);

        for(const entrega of entregasEstudiante){
            const actividad = actividades.find( a => a.id === entrega.actividadId);
            const calificacion = calificaciones.find(c => c.entregaId === entrega.id );

            if(!actividad || !calificacion){

                continue;

            }
            promedio += calificacion.nota *(actividad.ponderacion / 100);

        }
        return Number(promedio.toFixed(2));
    }

    async ranking():Promise<any[]>{
        const estudiantes = await this.estudiantesRepository.obtenerEstudiantes();
        const ranking = [];

        for(const estudiante of estudiantes){
            const promedio = await this.calcularPromedioGeneral(estudiante.id);

            ranking.push({estudiante:`${estudiante.nombre} ${estudiante.apellido}`,promedio});

        }
        return ranking.sort((a,b)=> b.promedio - a.promedio);

    }

    async estudiantesRiesgo():Promise<any[]>{
        const estudiantes = await this.estudiantesRepository.obtenerEstudiantes();
        const riesgo = [];

        for(const estudiante of estudiantes){
            const promedio = await this.calcularPromedioGeneral( estudiante.id);

            if(promedio < 60){
                riesgo.push({nombre:`${estudiante.nombre} ${estudiante.apellido}`,promedio,estado:"En riesgo"});

            }

        }
        return riesgo;
    }

    async eliminar(id: number): Promise<void> {
        try {
            const calificaciones = await this.repository.obtenerCalificaciones();
            const nuevo = calificaciones.filter(c => c.id !== id);

            if (nuevo.length === calificaciones.length) {

                throw new Error("Calificación no encontrada.");

            }

            await this.repository.guardarCalificaciones(nuevo);
            console.log( "Calificación eliminada");

        } catch (error) {

            throw new Error("Error al eliminar la calificación." );

        }

    }

}