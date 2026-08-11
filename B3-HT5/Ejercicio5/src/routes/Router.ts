import { IncomingMessage, ServerResponse } from "http";
import { actividadesRouter } from "./ActividadesRouter.js";
import { calificacionesRouter } from "./CalificacionesRouter.js";
import { cursosRouter } from "./CursosRouter.js";
import { docentesRouter } from "./DocentesRouter.js";
import { estudiantesRouter } from "./EstudiantesRouter.js";
import { entregasRouter } from "./EntregasRouter.js";
import { inscripcionesRouter } from "./InscripcionesRouter.js";

export async function routes(req: IncomingMessage, res: ServerResponse) {
    const url = req.url ?? "";

    if (url.startsWith("/actividades")) {
        await actividadesRouter(req, res);
        return;
    }

    if (url.startsWith("/calificaciones")) {
        await calificacionesRouter(req, res);
        return;
    }

    if (url.startsWith("/cursos")) {
        await cursosRouter(req, res);
        return;
    }

    if (url.startsWith("/docentes")) {
        await docentesRouter(req, res);
        return;
    }

    if (url.startsWith("/estudiantes")) {
        await estudiantesRouter(req, res);
        return;
    }

    if (url.startsWith("/entregas")) {
        await entregasRouter(req, res);
        return;
    }

    if (url.startsWith("/inscripciones")) {
        await inscripcionesRouter(req, res);
        return;
    }

    res.setHeader("Content-Type", "application/json");
    res.writeHead(404);
    res.end(JSON.stringify({ message: "Ruta no encontrada" }));
}