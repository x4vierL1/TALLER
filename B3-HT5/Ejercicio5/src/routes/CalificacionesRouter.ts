import { IncomingMessage, ServerResponse } from "http";
import { CalificacionesService } from "../service/CalificacionesService.js";

const service = new CalificacionesService();

export async function calificacionesRouter(req: IncomingMessage, res: ServerResponse) {

    res.setHeader("Content-Type", "application/json");

    const url = req.url ?? "";
    const metodo = req.method ?? "";

    try {
        if (url === "/calificaciones" && metodo === "GET") {

            const calificaciones = await service.listar();

            res.writeHead(200);
            res.end(JSON.stringify(calificaciones));
            return;
        }


        if (url === "/calificaciones/post" && metodo === "POST") {
            let body = "";

            req.on("data", (chunk) => {
                body += chunk;
            });

            req.on("end", async () => {

                let calificacion;

                try {
                    calificacion = JSON.parse(body);

                } catch {

                    res.writeHead(400);

                    res.end(JSON.stringify({
                        message: "JSON inválido."
                    }));

                    return;
                }


                try {
                    await service.agregar(calificacion);

                    res.writeHead(201);

                    res.end(JSON.stringify({
                        message: "Calificación agregada correctamente"
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





        if (url === "/calificaciones/buscar" && metodo === "GET") {
            const id = Number(req.headers["id"]);

            const calificacion = await service.buscar(id);

            if (!calificacion) {

                res.writeHead(404);

                res.end(JSON.stringify({
                    message: "Calificación no encontrada"
                }));

                return;

            }

            res.writeHead(200);
            res.end(JSON.stringify(calificacion));
            return;
        }






        if (url === "/calificaciones/put" && metodo === "PUT") {
            let body = "";

            req.on("data", (chunk) => {

                body += chunk;
            });

            req.on("end", async () => {
                let calificacion;

                try {
                    calificacion = JSON.parse(body);

                } catch {
                    res.writeHead(400);
                    res.end(JSON.stringify({
                        message:"JSON inválido."
                    }));

                    return;
                }

                try {
                    await service.actualizar(calificacion);

                    res.writeHead(200);
                    res.end(JSON.stringify({

                        message:
                        "Calificación actualizada correctamente"

                    }));
                } catch(error){
                    res.writeHead(409);
                    res.end(JSON.stringify({

                        message:
                        (error as Error).message

                    }));

                }

            });
            return;
        }

        if (url === "/calificaciones/delete" && metodo === "DELETE") {
            const id = Number(req.headers["id"]);
            await service.eliminar(id);

            res.writeHead(200);
            res.end(JSON.stringify({

                message:
                "Calificación eliminada correctamente"

            }));

            return;
        }

        if (url === "/calificaciones/promedio" && metodo === "GET") {
            const estudianteId = Number(req.headers["estudianteid"]);
            const cursoId = Number(req.headers["cursoid"]);

            if(!estudianteId || !cursoId){

                res.writeHead(400);
                res.end(JSON.stringify({

                    message:
                    "El estudianteId y cursoId son obligatorios."

                }));
                return;
            }
            const promedio = await service.calcularPromedio(estudianteId, cursoId);

            res.writeHead(200);
            res.end(JSON.stringify({estudianteId, cursoId,promedio}));

            return;
        }

        if (url === "/calificaciones/ranking" && metodo === "GET") {
            const ranking = await service.ranking();

            res.writeHead(200);
            res.end(JSON.stringify(ranking));

            return;
        }

        if (url === "/calificaciones/riesgo" && metodo === "GET") {
            const riesgo = await service.estudiantesRiesgo();

            res.writeHead(200);
            res.end(JSON.stringify(riesgo));

            return;
        }

        res.writeHead(405);
        res.end(JSON.stringify({ message: "Método no permitido."}));



    } catch(error){
        res.writeHead(500);
        res.end(JSON.stringify({ message:(error as Error).message }));

    }

}