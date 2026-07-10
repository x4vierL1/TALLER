import { Producto } from "../models/Producto";

export class ProductoService {

    productos: Producto[] = [];

    agregar(producto: Producto) {
        this.productos.push(producto);
    }

    listar() {
        return this.productos;
    }

    buscar(id: number) {
        return this.productos.find(producto => producto.id === id);
    }

    editar(id: number, nombre: string, precio: number) {

        const producto = this.buscar(id);

        if (producto) {
            producto.nombre = nombre;
            producto.precio = precio;
        }

    }

    eliminar(id: number) {
        this.productos = this.productos.filter(producto => producto.id !== id);
    }

}