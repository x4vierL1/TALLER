import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Mascota {
  id_mascota: number;
  nombre: string;
  id_especie: number;
  especie: string;
  id_raza: number | null;
  raza: string | null;
  edad_valor: number;
  unidad_edad: 'Meses' | 'Años';
  sexo: 'Macho' | 'Hembra' | 'Desconocido';
  tamano: 'Pequeno' | 'Mediano' | 'Grande';
  descripcion: string | null;
  ubicacion: string;
  id_refugio: number;
  refugio: string;
  estado_adopcion: 'Disponible' | 'En proceso' | 'Adoptado';
  fecha_registro: string;
}

@Injectable({
  providedIn: 'root'
})
export class Mascotas {
  private readonly apiUrl = 'http://localhost:3000/api/mascotas';

  constructor(private http: HttpClient) {}

  // Obtiene todas las mascotas disponibles.
  obtenerMascotas(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(this.apiUrl);
  }

  // Obtiene una mascota específica por su ID.
  obtenerMascotaPorId(id: number): Observable<Mascota> {
    return this.http.get<Mascota>(`${this.apiUrl}/${id}`);
  }
}