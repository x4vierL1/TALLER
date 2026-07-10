import { Cliente } from "../models/Cliente";

export class ClienteService {

    clientes: Cliente[] = [];

    agregar(cliente: Cliente) {
        this.clientes.push(cliente);
    }

    listar() {
        return this.clientes;
    }

    buscar(id: number) {
        return this.clientes.find(cliente => cliente.id === id);
    }

    editar(id: number, nombre: string, telefono: string) {

        const cliente = this.buscar(id);

        if (cliente) {
            cliente.nombre = nombre;
            cliente.telefono = telefono;
        }

    }

    eliminar(id: number) {
        this.clientes = this.clientes.filter(cliente => cliente.id !== id);
    }

}