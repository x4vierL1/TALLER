import { createServer } from "http";
import { routes } from "../routes/Router.js";

export const servidor = createServer(async (req, res) => {
    await routes(req, res);
});