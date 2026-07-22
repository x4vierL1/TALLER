import { getClientes,getClienteById,crearCliente,actualizarCliente,eliminarCliente } from "../controllers/clientesController.js";

export async function clientesRoutes(req:any,res:any){

const url=new URL(req.url,`http://${req.headers.host}`);

if(req.method==="GET" && url.pathname==="/clientes"){
res.writeHead(200,{"Content-Type":"application/json"});
res.end(JSON.stringify(getClientes()));
return true;
}

if(req.method==="GET" && url.pathname.startsWith("/clientes/")){
const id=Number(url.pathname.split("/")[2]);
const cliente=getClienteById(id);

res.writeHead(cliente?200:404,{"Content-Type":"application/json"});
res.end(JSON.stringify(cliente||{mensaje:"Cliente no encontrado"}));
return true;
}

if(req.method==="POST" && url.pathname==="/clientes"){
let body="";

req.on("data",(chunk:any)=>body+=chunk);

req.on("end",()=>{

const nuevo=crearCliente(JSON.parse(body));

res.writeHead(nuevo.error?400:201,{"Content-Type":"application/json"});
res.end(JSON.stringify(nuevo));

});

return true;
}

if(req.method==="PUT" && url.pathname.startsWith("/clientes/")){
const id=Number(url.pathname.split("/")[2]);
let body="";

req.on("data",(chunk:any)=>body+=chunk);

req.on("end",()=>{

const cliente=actualizarCliente(id,JSON.parse(body));

res.writeHead(cliente?.error?400:cliente?200:404,{"Content-Type":"application/json"});
res.end(JSON.stringify(cliente||{mensaje:"Cliente no encontrado"}));

});

return true;
}

if(req.method==="DELETE" && url.pathname.startsWith("/clientes/")){
const id=Number(url.pathname.split("/")[2]);
const cliente=eliminarCliente(id);

res.writeHead(cliente?200:404,{"Content-Type":"application/json"});
res.end(JSON.stringify(cliente||{mensaje:"Cliente no encontrado"}));

return true;
}

return false;
}