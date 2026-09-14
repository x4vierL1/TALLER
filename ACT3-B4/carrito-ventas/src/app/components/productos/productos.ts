import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../models/producto';
import { CarritoService } from '../../services/carrito';

@Component({
  selector: 'app-productos',
  imports: [CommonModule],
  templateUrl: './productos.html',
  styleUrl: './productos.scss'
})
export class Productos {

  productos: Producto[] = [
    {
      id: 1,
      nombre: 'Laptop',
      precio: 5000,
      cantidad: 1
    },
    {
      id: 2,
      nombre: 'Mouse',
      precio: 150,
      cantidad: 1
    },
    {
      id: 3,
      nombre: 'Teclado',
      precio: 250,
      cantidad: 1
    },
    {
      id: 4,
      nombre: 'Audífonos',
      precio: 300,
      cantidad: 1
    }
  ];

  constructor(private carritoService: CarritoService) {}

  agregarAlCarrito(producto: Producto) {
    this.carritoService.agregarProducto(producto);
  }
}