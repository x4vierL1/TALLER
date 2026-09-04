import { Routes } from '@angular/router';
import { RegistroProducto } from './pages/registro-producto/registro-producto';
import { Inicio } from './pages/inicio/inicio';

export const routes: Routes = [
  {
    path: '',
    component: Inicio
  },
  {
    path: 'registro-producto',
    component: RegistroProducto
  }
];