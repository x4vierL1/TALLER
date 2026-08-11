import { servidor } from "./server/Server.js"

servidor.listen(3000, () => {
    console.log("Servidor arriba");
    console.log("http://localhost:3000");
});