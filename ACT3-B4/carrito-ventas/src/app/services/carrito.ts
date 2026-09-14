import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private carrito: Producto[] = [];

  private carritoSubject = new BehaviorSubject<Producto[]>([]);

  carrito$ = this.carritoSubject.asObservable();

  agregarProducto(producto: Producto) {

    const productoExistente = this.carrito.find(p => p.id === producto.id);

    if (productoExistente) {

      productoExistente.cantidad++;

    } else {

      this.carrito.push({
        ...producto,
        cantidad: 1
      });

    }

    this.carritoSubject.next([...this.carrito]);
  }

  cambiarCantidad(id: number, cantidad: number) {

    const producto = this.carrito.find(p => p.id === id);

    if (producto && cantidad > 0) {

      producto.cantidad = cantidad;

      this.carritoSubject.next([...this.carrito]);
    }
  }

  eliminarProducto(id: number) {

    this.carrito = this.carrito.filter(p => p.id !== id);

    this.carritoSubject.next([...this.carrito]);
  }
}