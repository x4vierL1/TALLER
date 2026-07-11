import { Cliente } from "../models/Cliente";

export class ClienteService {

    clientes: Cliente[] = [];

    agregar(cliente: Cliente) {
        try {
            this.clientes.push(cliente);
        } catch (error) {
            console.log("Error al agregar el cliente.");
        }
    }

    listar() {
        try {
            return this.clientes;
        } catch (error) {
            console.log("Error al listar los clientes.");
            return [];
        }
    }

    buscar(id: number) {
        try {
            return this.clientes.find(cliente => cliente.id === id);
        } catch (error) {
            console.log("Error al buscar el cliente.");
        }
    }

    editar(id: number, nombre: string, telefono: string) {
        try {
            const cliente = this.buscar(id);

            if (cliente) {
                cliente.nombre = nombre;
                cliente.telefono = telefono;
            }
        } catch (error) {
            console.log("Error al editar el cliente.");
        }
    }

    eliminar(id: number) {
        try {
            this.clientes = this.clientes.filter(cliente => cliente.id !== id);
        } catch (error) {
            console.log("Error al eliminar el cliente.");
        }
    }

}