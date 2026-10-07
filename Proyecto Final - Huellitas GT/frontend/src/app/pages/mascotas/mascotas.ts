import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  Mascotas as MascotasService,
  Mascota
} from '../../services/mascotas';

@Component({
  imports: [RouterLink, FormsModule],
  selector: 'app-mascotas',
  styleUrl: './mascotas.css',
  templateUrl: './mascotas.html'
})
export class Mascotas implements OnInit {
  mascotas: Mascota[] = [];
  mascotasFiltradas: Mascota[] = [];

  busqueda = '';
  especieSeleccionada = '';
  edadSeleccionada = '';
  tamanoSeleccionado = '';

  constructor(private mascotasService: MascotasService) {}

  ngOnInit(): void {
    this.mascotasService.obtenerMascotas().subscribe({
      next: (mascotas) => {
        this.mascotas = mascotas;
        this.mascotasFiltradas = mascotas;
      },
      error: (error) => {
        console.error('Error al obtener las mascotas:', error);
      }
    });
  }

  filtrarMascotas(): void {
    const busqueda = this.busqueda.toLowerCase().trim();

    this.mascotasFiltradas = this.mascotas.filter((mascota) => {
      const coincideNombre =
        mascota.nombre.toLowerCase().includes(busqueda);

      const coincideEspecie =
        !this.especieSeleccionada ||
        mascota.especie.toLowerCase() === this.especieSeleccionada;

      const coincideTamano =
        !this.tamanoSeleccionado ||
        mascota.tamano.toLowerCase() === this.tamanoSeleccionado;

      const coincideEdad =
        !this.edadSeleccionada ||
        this.comprobarEdad(mascota);

      return (
        coincideNombre &&
        coincideEspecie &&
        coincideEdad &&
        coincideTamano
      );
    });
  }

  comprobarEdad(mascota: Mascota): boolean {
    const edadEnAnios =
      mascota.unidad_edad === 'Meses'
        ? mascota.edad_valor / 12
        : mascota.edad_valor;

    switch (this.edadSeleccionada) {
      case 'cachorro':
        return edadEnAnios < 1;

      case 'joven':
        return edadEnAnios >= 1 && edadEnAnios < 3;

      case 'adulto':
        return edadEnAnios >= 3 && edadEnAnios < 8;

      case 'senior':
        return edadEnAnios >= 8;

      default:
        return true;
    }
  }
}