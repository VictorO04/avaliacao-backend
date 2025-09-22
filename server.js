import express from "express";
import dotenv from "dotenv";

const app = express();
app.use(express.json());

dotenv.config();
const serverPort = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Servidor Online");
})

app.listen(serverPort, () => {
    console.log(`🚀 Servidor funcionando em: http://localhost:${serverPort}`);
})