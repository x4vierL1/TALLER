import { IncomingMessage, ServerResponse } from "http";
import { CursosService } from "../service/CursosService.js";

const service = new CursosService();

export async function cursosRouter(
    req: IncomingMessage,
    res: ServerResponse
) {

    res.setHeader("Content-Type", "application/json");

    const url = req.url ?? "";
    const metodo = req.method ?? "";

    try {

        if (url === "/cursos" && metodo === "GET") {

            const cursos = await service.listar();

            res.writeHead(200);
            res.end(JSON.stringify(cursos));

            return;
        }


        if (url === "/cursos/post" && metodo === "POST") {

            let body = "";

            req.on("data", (chunk) => {
                body += chunk;
            });


            req.on("end", async () => {

                let curso;

                try {

                    curso = JSON.parse(body);

                } catch {

                    res.writeHead(400);

                    res.end(JSON.stringify({
                        message: "JSON inválido."
                    }));

                    return;
                }


                try {

                    await service.agregar(curso);

                    res.writeHead(201);

                    res.end(JSON.stringify({
                        message: "Curso agregado correctamente"
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


        if (url === "/cursos/buscar" && metodo === "GET") {

            const id = Number(req.headers["id"]);

            const curso = await service.buscar(id);


            if (!curso) {

                res.writeHead(404);

                res.end(JSON.stringify({
                    message: "Curso no encontrado"
                }));

                return;
            }


            res.writeHead(200);

            res.end(JSON.stringify(curso));

            return;
        }


        if (url === "/cursos/put" && metodo === "PUT") {

            let body = "";

            req.on("data", (chunk) => {
                body += chunk;
            });


            req.on("end", async () => {

                let curso;

                try {

                    curso = JSON.parse(body);

                } catch {

                    res.writeHead(400);

                    res.end(JSON.stringify({
                        message: "JSON inválido."
                    }));

                    return;
                }


                try {

                    await service.actualizar(curso);

                    res.writeHead(200);

                    res.end(JSON.stringify({
                        message: "Curso actualizado correctamente"
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


        if (url === "/cursos/delete" && metodo === "DELETE") {

            const id = Number(req.headers["id"]);

            await service.eliminar(id);

            res.writeHead(200);

            res.end(JSON.stringify({
                message: "Curso eliminado correctamente"
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