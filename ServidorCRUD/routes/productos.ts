import { getProductos, getProductoById, crearProducto, actualizarProducto, eliminarProducto } from "../controllers/productosController.js";

export async function productosRoutes(req:any,res:any){

    const url = new URL(req.url,`http://${req.headers.host}`);

    if(req.method==="GET" && url.pathname==="/productos"){
        res.writeHead(200,{"Content-Type":"application/json"});
        res.end(JSON.stringify(getProductos()));
        return true;
    }

    if(req.method==="GET" && url.pathname.startsWith("/productos/")){
        const id = Number(url.pathname.split("/")[2]);
        const producto = getProductoById(id);

        res.writeHead(producto?200:404,{"Content-Type":"application/json"});
        res.end(JSON.stringify(producto || {mensaje:"Producto no encontrado"}));
        return true;
    }

    if(req.method==="POST" && url.pathname==="/productos"){
        let body="";

        req.on("data",(chunk:any)=>body+=chunk);

        req.on("end",()=>{

            const nuevo = crearProducto(JSON.parse(body));

            res.writeHead(nuevo.error?400:201,{
                "Content-Type":"application/json"
            });

            res.end(JSON.stringify(nuevo));
        });

        return true;
    }

    if(req.method==="PUT" && url.pathname.startsWith("/productos/")){
        const id = Number(url.pathname.split("/")[2]);
        let body="";

        req.on("data",(chunk:any)=>body+=chunk);

        req.on("end",()=>{

            const producto = actualizarProducto(id,JSON.parse(body));

            res.writeHead(
                producto?.error?400:producto?200:404,
                {
                    "Content-Type":"application/json"
                }
            );

            res.end(JSON.stringify(producto || {
                mensaje:"Producto no encontrado"
            }));
        });

        return true;
    }

    if(req.method==="DELETE" && url.pathname.startsWith("/productos/")){
        const id = Number(url.pathname.split("/")[2]);
        const producto = eliminarProducto(id);

        res.writeHead(producto?200:404,{"Content-Type":"application/json"});
        res.end(JSON.stringify(producto || {mensaje:"Producto no encontrado"}));

        return true;
    }

    return false;
}