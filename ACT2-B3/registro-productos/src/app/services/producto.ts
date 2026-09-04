import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  registrarProducto(producto: Producto) {
    console.log('Producto enviado al servicio:', producto);
  }

}