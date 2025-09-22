import express from "express";
import dotenv from "dotenv";
import camisetasRouter from "./src/routes/camisetasRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();
const serverPort = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Servidor Online");
})

app.use("/camisetas", camisetasRouter);

app.listen(serverPort, () => {
    console.log(`🚀 Servidor funcionando em: http://localhost:${serverPort}`);
})