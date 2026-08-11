import { IncomingMessage, ServerResponse } from "http";
import { EstudiantesService } from "../service/EstudiantesService.js";

const service = new EstudiantesService();

export async function estudiantesRouter(req: IncomingMessage, res: ServerResponse) {

    res.setHeader("Content-Type", "application/json");

    const url = req.url ?? "";
    const metodo = req.method ?? "";

    try {

        if (url === "/estudiantes" && metodo === "GET") {

            const estudiantes = await service.listar();

            res.writeHead(200);
            res.end(JSON.stringify(estudiantes));
            return;
        }

        if (url === "/estudiantes/post" && metodo === "POST") {

            let body = "";

            req.on("data", (chunk) => {
                body += chunk;
            });

            req.on("end", async () => {

                let estudiante;

                try {
                    estudiante = JSON.parse(body);
                } catch {

                    res.writeHead(400);

                    res.end(JSON.stringify({
                        message: "JSON inválido."
                    }));

                    return;
                }

                try {

                    await service.agregar(estudiante);

                    res.writeHead(201);

                    res.end(JSON.stringify({
                        message: "Estudiante agregado correctamente"
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

        if (url === "/estudiantes/buscar" && metodo === "GET") {

            const id = Number(req.headers["id"]);

            const estudiante = await service.buscar(id);

            if (!estudiante) {

                res.writeHead(404);

                res.end(JSON.stringify({
                    message: "Estudiante no encontrado"
                }));

                return;
            }

            res.writeHead(200);

            res.end(JSON.stringify(estudiante));

            return;
        }

        if (url === "/estudiantes/put" && metodo === "PUT") {

            let body = "";

            req.on("data", (chunk) => {
                body += chunk;
            });

            req.on("end", async () => {

                let estudiante;

                try {

                    estudiante = JSON.parse(body);

                } catch {

                    res.writeHead(400);

                    res.end(JSON.stringify({
                        message: "JSON inválido."
                    }));

                    return;
                }

                try {

                    await service.actualizar(estudiante);

                    res.writeHead(200);

                    res.end(JSON.stringify({
                        message: "Estudiante actualizado correctamente"
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

        if (url === "/estudiantes/delete" && metodo === "DELETE") {

            const id = Number(req.headers["id"]);

            await service.eliminar(id);

            res.writeHead(200);

            res.end(JSON.stringify({
                message: "Estudiante eliminado correctamente"
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