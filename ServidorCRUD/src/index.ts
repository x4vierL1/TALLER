import http from "http";
import { productosRoutes } from "../routes/productos.ts";
import { clientesRoutes } from "../routes/clientes.ts";

const PORT = 3000;

const server = http.createServer(async (req, res) => {

    res.setHeader("Content-Type", "application/json");

    if (req.url === "/" && req.method === "GET") {

        res.writeHead(200);

        res.end(JSON.stringify({
            mensaje: "Servidor HTTP funcionando"
        }));

        return;
    }

    if (await productosRoutes(req, res)) {
        return;
    }

    if (await clientesRoutes(req, res)) {
        return;
    }

    res.writeHead(404);

    res.end(JSON.stringify({
        error: "Ruta no encontrada"
    }));

});

server.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});