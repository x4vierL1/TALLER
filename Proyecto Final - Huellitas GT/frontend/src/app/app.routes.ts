import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Inicio - Huellitas GT',
    loadComponent: () =>
      import('./pages/inicio/inicio').then(m => m.Inicio)
  },
  {
    path: 'mascotas',
    title: 'Mascotas - Huellitas GT',
    loadComponent: () =>
      import('./pages/mascotas/mascotas').then(m => m.Mascotas)
  },
  {
    path: 'reportes',
    title: 'Reportes - Huellitas GT',
    loadComponent: () =>
      import('./pages/reportes/reportes').then(m => m.Reportes)
  },
  {
    path: 'nosotros',
    title: 'Nosotros - Huellitas GT',
    loadComponent: () =>
      import('./pages/nosotros/nosotros').then(m => m.Nosotros)
  }
];