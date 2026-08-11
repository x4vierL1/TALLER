import { IncomingMessage, ServerResponse } from "http";
import { DocentesService } from "../service/DocentesService.js";

const service = new DocentesService();

export async function docentesRouter(req: IncomingMessage, res: ServerResponse) {

    res.setHeader("Content-Type", "application/json");

    const url = req.url ?? "";
    const metodo = req.method ?? "";

    try {

        if (url === "/docentes" && metodo === "GET") {

            const docentes = await service.listar();

            res.writeHead(200);
            res.end(JSON.stringify(docentes));
            return;
        }

        if (url === "/docentes/post" && metodo === "POST") {

            let body = "";

            req.on("data", (chunk) => {
                body += chunk;
            });

            req.on("end", async () => {

                let docente;

                try {
                    docente = JSON.parse(body);
                } catch {

                    res.writeHead(400);

                    res.end(JSON.stringify({
                        message: "JSON inválido."
                    }));

                    return;
                }

                try {

                    await service.agregar(docente);

                    res.writeHead(201);

                    res.end(JSON.stringify({
                        message: "Docente agregado correctamente"
                    }));

                } catch (error) {

                    res.writeHead(409);

                    res.end(JSON.stringify({
                        message: (error as Error).message
                    }));
                }

            });

            return;
        }

        if (url === "/docentes/buscar" && metodo === "GET") {

            const id = Number(req.headers["id"]);

            const docente = await service.buscar(id);

            if (!docente) {

                res.writeHead(404);

                res.end(JSON.stringify({
                    message: "Docente no encontrado"
                }));

                return;
            }

            res.writeHead(200);

            res.end(JSON.stringify(docente));

            return;
        }

        if (url === "/docentes/put" && metodo === "PUT") {

            let body = "";

            req.on("data", (chunk) => {
                body += chunk;
            });

            req.on("end", async () => {

                let docente;

                try {

                    docente = JSON.parse(body);

                } catch {

                    res.writeHead(400);

                    res.end(JSON.stringify({
                        message: "JSON inválido."
                    }));

                    return;
                }

                try {

                    await service.actualizar(docente);

                    res.writeHead(200);

                    res.end(JSON.stringify({
                        message: "Docente actualizado correctamente"
                    }));

                } catch (error) {

                    res.writeHead(409);

                    res.end(JSON.stringify({
                        message: (error as Error).message
                    }));
                }

            });

            return;
        }

        if (url === "/docentes/delete" && metodo === "DELETE") {

            const id = Number(req.headers["id"]);

            await service.eliminar(id);

            res.writeHead(200);

            res.end(JSON.stringify({
                message: "Docente eliminado correctamente"
            }));

            return;
        }

        res.writeHead(405);

        res.end(JSON.stringify({
            message: "Método no permitido."
        }));

    } catch (error) {

        res.writeHead(500);

        res.end(JSON.stringify({
            message: (error as Error).message
        }));
    }
}