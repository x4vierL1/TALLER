import { Component, signal } from '@angular/core';
import { Productos } from './components/productos/productos';
import { Carrito } from './components/carrito/carrito';

@Component({
  selector: 'app-root',
  imports: [Productos, Carrito],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('carrito-ventas');
}