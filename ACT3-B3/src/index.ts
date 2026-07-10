import promptSync from "prompt-sync";

import { ClienteService } from "./services/ClienteService.js";
import { ProductoService } from "./services/ProductoService.js";
import { VentaService } from "./services/VentaService.js";

const prompt = promptSync();

const clienteService = new ClienteService();
const productoService = new ProductoService();
const ventaService = new VentaService();

let opcion = 0;

do {
    console.log("\nTIENDA");
    console.log("1. Clientes");
    console.log("2. Productos");
    console.log("3. Ventas");
    console.log("4. Salir");

    opcion = Number(prompt("Opción: "));

    switch(opcion){

        case 1:
            clientes();
            break;

        case 2:
            productos();
            break;

        case 3:
            ventas();
            break;

        case 4:
            console.log("Programa finalizado.");
            break;

        default:
            console.log("Opción inválida.");
    }

} while(opcion !== 4);



function clientes(){

    let op = 0;

    do {
        console.log("\nCLIENTES");
        console.log("1. Agregar");
        console.log("2. Listar");
        console.log("3. Buscar");
        console.log("4. Editar");
        console.log("5. Eliminar");
        console.log("6. Regresar");

        op = Number(prompt("Opción: "));

        switch(op){

            case 1:
                clienteService.agregar({
                    id: Number(prompt("ID: ")),
                    nombre: prompt("Nombre: "),
                    telefono: prompt("Teléfono: ")
                });

                console.log("Cliente agregado.");
                break;

            case 2:
                clienteService.listar().forEach(c =>
                    console.log(`ID: ${c.id} | ${c.nombre} | ${c.telefono}`)
                );
                break;

            case 3:
                console.log(
                    clienteService.buscar(Number(prompt("ID: ")))
                );
                break;

            case 4:
                clienteService.editar(
                    Number(prompt("ID: ")),
                    prompt("Nuevo nombre: "),
                    prompt("Nuevo teléfono: ")
                );

                console.log("Cliente actualizado.");
                break;

            case 5:
                clienteService.eliminar(Number(prompt("ID: ")));

                console.log("Cliente eliminado.");
                break;
        }

    } while(op !== 6);
}



function productos(){

    let op = 0;

    do {
        console.log("\nPRODUCTOS");
        console.log("1. Agregar");
        console.log("2. Listar");
        console.log("3. Buscar");
        console.log("4. Editar");
        console.log("5. Eliminar");
        console.log("6. Regresar");

        op = Number(prompt("Opción: "));

        switch(op){

            case 1:
                productoService.agregar({
                    id: Number(prompt("ID: ")),
                    nombre: prompt("Nombre: "),
                    precio: Number(prompt("Precio: "))
                });

                console.log("Producto agregado.");
                break;

            case 2:
                productoService.listar().forEach(p =>
                    console.log(`ID: ${p.id} | ${p.nombre} | Precio: ${p.precio}`)
                );
                break;

            case 3:
                console.log(
                    productoService.buscar(Number(prompt("ID: ")))
                );
                break;

            case 4:
                productoService.editar(
                    Number(prompt("ID: ")),
                    prompt("Nuevo nombre: "),
                    Number(prompt("Nuevo precio: "))
                );

                console.log("Producto actualizado.");
                break;

            case 5:
                productoService.eliminar(Number(prompt("ID: ")));

                console.log("Producto eliminado.");
                break;
        }

    } while(op !== 6);
}



function ventas(){

    let op = 0;

    do {
        console.log("\nVENTAS");
        console.log("1. Agregar");
        console.log("2. Listar");
        console.log("3. Buscar");
        console.log("4. Editar");
        console.log("5. Eliminar");
        console.log("6. Regresar");

        op = Number(prompt("Opción: "));

        switch(op){

            case 1:
                ventaService.agregar({
                    id: Number(prompt("ID: ")),
                    cliente: prompt("Cliente: "),
                    producto: prompt("Producto: "),
                    cantidad: Number(prompt("Cantidad: ")),
                    total: Number(prompt("Total: "))
                });

                console.log("Venta agregada.");
                break;

            case 2:
                ventaService.listar().forEach(v =>
                    console.log(
                        `ID: ${v.id} | Cliente: ${v.cliente} | Producto: ${v.producto} | Cantidad: ${v.cantidad} | Total: ${v.total}`
                    )
                );
                break;

            case 3:
                console.log(
                    ventaService.buscar(Number(prompt("ID: ")))
                );
                break;

            case 4:
                ventaService.editar(
                    Number(prompt("ID: ")),
                    prompt("Cliente: "),
                    prompt("Producto: "),
                    Number(prompt("Cantidad: ")),
                    Number(prompt("Total: "))
                );

                console.log("Venta actualizada.");
                break;

            case 5:
                ventaService.eliminar(Number(prompt("ID: ")));

                console.log("Venta eliminada.");
                break;
        }

    } while(op !== 6);
}