import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../models/producto';
import { CarritoService } from '../../services/carrito';
import { SubtotalPipe } from '../../pipes/subtotal-pipe';

@Component({
  selector: 'app-carrito',
  imports: [CommonModule, SubtotalPipe],
  templateUrl: './carrito.html',
  styleUrl: './carrito.scss'
})
export class Carrito implements OnInit {

  carrito: Producto[] = [];

  constructor(
    private carritoService: CarritoService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.carritoService.carrito$.subscribe(productos => {
      this.carrito = productos;

      console.log('Carrito actualizado:', productos);

      this.changeDetectorRef.detectChanges();
    });
  }

  cambiarCantidad(producto: Producto, cantidad: number) {
    this.carritoService.cambiarCantidad(producto.id, cantidad);
  }

  eliminarProducto(producto: Producto) {
    this.carritoService.eliminarProducto(producto.id);
  }

  calcularTotal(): number {
    return this.carrito.reduce((total, producto) => {
      return total + (producto.precio * producto.cantidad);
    }, 0);
  }
}