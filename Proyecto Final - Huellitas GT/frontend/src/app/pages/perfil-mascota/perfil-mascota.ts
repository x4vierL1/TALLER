import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  Mascotas as MascotasService,
  Mascota
} from '../../services/mascotas';

@Component({
  selector: 'app-perfil-mascota',
  imports: [RouterLink],
  templateUrl: './perfil-mascota.html',
  styleUrl: './perfil-mascota.css'
})
export class PerfilMascota implements OnInit {
  mascota: Mascota | null = null;
  cargando = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private mascotasService: MascotasService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.error = 'El ID de la mascota no es válido';
      this.cargando = false;
      return;
    }

    this.mascotasService.obtenerMascotaPorId(id).subscribe({
      next: (mascota) => {
        this.mascota = mascota;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al obtener la mascota:', error);
        this.error = 'No se pudo cargar la información de la mascota';
        this.cargando = false;
      }
    });
  }
}