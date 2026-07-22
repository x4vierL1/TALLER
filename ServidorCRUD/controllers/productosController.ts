import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data/productos.json");

export function getProductos(){
    return JSON.parse(fs.readFileSync(filePath,"utf-8"));
}

export function getProductoById(id:number){
    const productos = getProductos();
    return productos.find((p:any)=>p.id === id);
}

function validarProducto(producto:any){

    if(!producto.nombre || producto.nombre.trim()===""){
        return "El nombre no puede estar vacío";
    }

    if(!producto.categoria || producto.categoria.trim()===""){
        return "La categoría no puede estar vacía";
    }

    if(producto.precio < 0){
        return "El precio no puede ser negativo";
    }

    if(producto.stock < 0){
        return "El stock no puede ser negativo";
    }

    return null;
}


export function crearProducto(producto:any){

    const error = validarProducto(producto);

    if(error) return {error};


    const productos = getProductos();


    if(producto.id && productos.some((p:any)=>p.id === producto.id)){
        return {error:"El ID ya existe"};
    }


    const nuevo = {
        id: productos.length ? productos[productos.length-1].id+1 : 1,
        ...producto
    };


    productos.push(nuevo);

    fs.writeFileSync(
        filePath,
        JSON.stringify(productos,null,2)
    );

    return nuevo;
}


export function actualizarProducto(id:number, datos:any){

    const error = validarProducto(datos);

    if(error) return {error};


    const productos = getProductos();

    const index = productos.findIndex((p:any)=>p.id === id);

    if(index === -1) return null;


    productos[index] = {
        ...productos[index],
        ...datos
    };


    fs.writeFileSync(
        filePath,
        JSON.stringify(productos,null,2)
    );


    return productos[index];
}


export function eliminarProducto(id:number){

    const productos = getProductos();

    const index = productos.findIndex((p:any)=>p.id === id);

    if(index === -1) return null;


    const eliminado = productos.splice(index,1)[0];


    fs.writeFileSync(
        filePath,
        JSON.stringify(productos,null,2)
    );


    return eliminado;
}