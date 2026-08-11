import { IncomingMessage, ServerResponse } from "http";
import { InscripcionesService } from "../service/InscripcionesService.js";

const service = new InscripcionesService();

export async function inscripcionesRouter(req: IncomingMessage, res: ServerResponse) {

    res.setHeader("Content-Type", "application/json");

    const url = req.url ?? "";
    const metodo = req.method ?? "";

    try {

        if (url === "/inscripciones" && metodo === "GET") {

            const inscripciones = await service.listar();

            res.writeHead(200);
            res.end(JSON.stringify(inscripciones));
            return;
        }

        if (url === "/inscripciones/post" && metodo === "POST") {

            let body = "";

            req.on("data", (chunk) => {
                body += chunk;
            });

            req.on("end", async () => {

                let inscripcion;

                try {
                    inscripcion = JSON.parse(body);
                } catch {

                    res.writeHead(400);

                    res.end(JSON.stringify({
                        message: "JSON inválido."
                    }));

                    return;
                }

                try {

                    await service.agregar(inscripcion);

                    res.writeHead(201);

                    res.end(JSON.stringify({
                        message: "Inscripción agregada correctamente"
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

        if (url === "/inscripciones/buscar" && metodo === "GET") {

            const id = Number(req.headers["id"]);

            const inscripcion = await service.buscar(id);

            if (!inscripcion) {

                res.writeHead(404);

                res.end(JSON.stringify({
                    message: "Inscripción no encontrada"
                }));

                return;
            }

            res.writeHead(200);

            res.end(JSON.stringify(inscripcion));

            return;
        }

        if (url === "/inscripciones/put" && metodo === "PUT") {

            let body = "";

            req.on("data", (chunk) => {
                body += chunk;
            });

            req.on("end", async () => {

                let inscripcion;

                try {

                    inscripcion = JSON.parse(body);

                } catch {

                    res.writeHead(400);

                    res.end(JSON.stringify({
                        message: "JSON inválido."
                    }));

                    return;
                }

                try {

                    await service.actualizar(inscripcion);

                    res.writeHead(200);

                    res.end(JSON.stringify({
                        message: "Inscripción actualizada correctamente"
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

        if (url === "/inscripciones/delete" && metodo === "DELETE") {

            const id = Number(req.headers["id"]);

            await service.eliminar(id);

            res.writeHead(200);

            res.end(JSON.stringify({
                message: "Inscripción eliminada correctamente"
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