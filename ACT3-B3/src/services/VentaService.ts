import { Venta } from "../models/Venta";

export class VentaService {

    ventas: Venta[] = [];

    agregar(venta: Venta) {
        this.ventas.push(venta);
    }

    listar() {
        return this.ventas;
    }

    buscar(id: number) {
        return this.ventas.find(venta => venta.id === id);
    }

    editar(id: number, cliente: string, producto: string, cantidad: number, total: number) {

        const venta = this.buscar(id);

        if (venta) {
            venta.cliente = cliente;
            venta.producto = producto;
            venta.cantidad = cantidad;
            venta.total = total;
        }

    }

    eliminar(id: number) {
        this.ventas = this.ventas.filter(venta => venta.id !== id);
    }

}