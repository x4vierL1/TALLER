import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(),"data/clientes.json");

export function getClientes(){
    return JSON.parse(fs.readFileSync(filePath,"utf-8"));
}

export function getClienteById(id:number){
    const clientes=getClientes();
    return clientes.find((c:any)=>c.id===id);
}

function validarCliente(cliente:any){
    if(!cliente.nombre || cliente.nombre.trim()==="") return "El nombre no puede estar vacío";
    if(!cliente.apellido || cliente.apellido.trim()==="") return "El apellido no puede estar vacío";
    if(!cliente.correo || cliente.correo.trim()==="") return "El correo no puede estar vacío";
    if(!cliente.telefono || cliente.telefono.trim()==="") return "El teléfono no puede estar vacío";
    return null;
}

export function crearCliente(cliente:any){

    const error=validarCliente(cliente);
    if(error) return {error};

    const clientes=getClientes();

    if(clientes.some((c:any)=>c.correo===cliente.correo)){
        return {error:"El correo ya existe"};
    }

    const nuevo={
        id:clientes.length?clientes[clientes.length-1].id+1:1,
        ...cliente
    };

    clientes.push(nuevo);

    fs.writeFileSync(filePath,JSON.stringify(clientes,null,2));

    return nuevo;
}

export function actualizarCliente(id:number,datos:any){

    const error=validarCliente(datos);
    if(error) return {error};

    const clientes=getClientes();

    const index=clientes.findIndex((c:any)=>c.id===id);

    if(index===-1) return null;

    if(clientes.some((c:any)=>c.correo===datos.correo && c.id!==id)){
        return {error:"El correo ya existe"};
    }

    clientes[index]={
        ...clientes[index],
        ...datos
    };

    fs.writeFileSync(filePath,JSON.stringify(clientes,null,2));

    return clientes[index];
}

export function eliminarCliente(id:number){

    const clientes=getClientes();

    const index=clientes.findIndex((c:any)=>c.id===id);

    if(index===-1) return null;

    const eliminado=clientes.splice(index,1)[0];

    fs.writeFileSync(filePath,JSON.stringify(clientes,null,2));

    return eliminado;
}