import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Inicio - Huellitas GT',
    loadComponent: () =>
      import('./pages/inicio/inicio').then(m => m.Inicio)
  }
];