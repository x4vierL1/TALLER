import { IncomingMessage, ServerResponse } from "http";
import { ActividadesService } from "../service/ActividadesService.js";

const service = new ActividadesService();

export async function actividadesRouter(req: IncomingMessage, res: ServerResponse) {

    res.setHeader("Content-Type", "application/json");

    const url = req.url ?? "";
    const metodo = req.method ?? "";

    try {

        if (url === "/actividades" && metodo === "GET") {

            const actividades = await service.listar();

            res.writeHead(200);
            res.end(JSON.stringify(actividades));
            return;
        }

        if (url === "/actividades/post" && metodo === "POST") {

            let body = "";

            req.on("data", (chunk) => {
                body += chunk;
            });

            req.on("end", async () => {

                let actividad;

                try {
                    actividad = JSON.parse(body);
                } catch {

                    res.writeHead(400);

                    res.end(JSON.stringify({
                        message: "JSON inválido."
                    }));

                    return;
                }

                try {

                    await service.agregar(actividad);

                    res.writeHead(201);

                    res.end(JSON.stringify({
                        message: "Actividad agregada correctamente"
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

        if (url === "/actividades/buscar" && metodo === "GET") {

            const id = Number(req.headers["id"]);

            const actividad = await service.buscar(id);

            if (!actividad) {

                res.writeHead(404);

                res.end(JSON.stringify({
                    message: "Actividad no encontrada"
                }));

                return;
            }

            res.writeHead(200);

            res.end(JSON.stringify(actividad));

            return;
        }

        if (url === "/actividades/put" && metodo === "PUT") {

            let body = "";

            req.on("data", (chunk) => {
                body += chunk;
            });

            req.on("end", async () => {

                let actividad;

                try {

                    actividad = JSON.parse(body);

                } catch {

                    res.writeHead(400);

                    res.end(JSON.stringify({
                        message: "JSON inválido."
                    }));

                    return;
                }

                try {

                    await service.actualizar(actividad);

                    res.writeHead(200);

                    res.end(JSON.stringify({
                        message: "Actividad actualizada correctamente"
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

        if (url === "/actividades/delete" && metodo === "DELETE") {

            const id = Number(req.headers["id"]);

            await service.eliminar(id);

            res.writeHead(200);

            res.end(JSON.stringify({
                message: "Actividad eliminada correctamente"
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