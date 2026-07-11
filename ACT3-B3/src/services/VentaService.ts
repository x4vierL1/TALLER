import { Venta } from "../models/Venta";

export class VentaService {

    ventas: Venta[] = [];

    agregar(venta: Venta) {
        try {
            this.ventas.push(venta);
        } catch (error) {
            console.log("Error al agregar la venta.");
        }
    }

    listar() {
        try {
            return this.ventas;
        } catch (error) {
            console.log("Error al listar las ventas.");
            return [];
        }
    }

    buscar(id: number) {
        try {
            return this.ventas.find(venta => venta.id === id);
        } catch (error) {
            console.log("Error al buscar la venta.");
        }
    }

    editar(id: number, cliente: string, producto: string, cantidad: number, total: number) {
        try {
            const venta = this.buscar(id);

            if (venta) {
                venta.cliente = cliente;
                venta.producto = producto;
                venta.cantidad = cantidad;
                venta.total = total;
            }
        } catch (error) {
            console.log("Error al editar la venta.");
        }
    }

    eliminar(id: number) {
        try {
            this.ventas = this.ventas.filter(venta => venta.id !== id);
        } catch (error) {
            console.log("Error al eliminar la venta.");
        }
    }

}