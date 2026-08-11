import { IncomingMessage, ServerResponse } from "http";
import { EntregasService } from "../service/EntregasService.js";

const service = new EntregasService();

export async function entregasRouter(
    req: IncomingMessage,
    res: ServerResponse
) {

    res.setHeader("Content-Type", "application/json");

    const url = req.url ?? "";
    const metodo = req.method ?? "";

    try {

        if (url === "/entregas" && metodo === "GET") {

            const entregas = await service.listar();

            res.writeHead(200);
            res.end(JSON.stringify(entregas));

            return;
        }


        if (url === "/entregas/post" && metodo === "POST") {

            let body = "";

            req.on("data", (chunk) => {
                body += chunk;
            });


            req.on("end", async () => {

                let entrega;

                try {

                    entrega = JSON.parse(body);

                } catch {

                    res.writeHead(400);

                    res.end(JSON.stringify({
                        message: "JSON inválido."
                    }));

                    return;
                }


                try {

                    await service.agregar(entrega);

                    res.writeHead(201);

                    res.end(JSON.stringify({
                        message: "Entrega agregada correctamente"
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


        if (url === "/entregas/buscar" && metodo === "GET") {

            const id = Number(req.headers["id"]);

            const entrega = await service.buscar(id);


            if (!entrega) {

                res.writeHead(404);

                res.end(JSON.stringify({
                    message: "Entrega no encontrada"
                }));

                return;
            }


            res.writeHead(200);

            res.end(JSON.stringify(entrega));

            return;
        }


        if (url === "/entregas/put" && metodo === "PUT") {

            let body = "";

            req.on("data", (chunk) => {
                body += chunk;
            });


            req.on("end", async () => {

                let entrega;

                try {

                    entrega = JSON.parse(body);

                } catch {

                    res.writeHead(400);

                    res.end(JSON.stringify({
                        message: "JSON inválido."
                    }));

                    return;
                }


                try {

                    await service.actualizar(entrega);

                    res.writeHead(200);

                    res.end(JSON.stringify({
                        message: "Entrega actualizada correctamente"
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


        if (url === "/entregas/delete" && metodo === "DELETE") {

            const id = Number(req.headers["id"]);

            await service.eliminar(id);

            res.writeHead(200);

            res.end(JSON.stringify({
                message: "Entrega eliminada correctamente"
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