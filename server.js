
import express from "express";
import path from "path";
import mysql from 'mysql';
import { ConnectionDB } from "./cyberBankDB.js";

const server = express();
const dir = path.relative(".", "")

async function startServer() {
    try {
        const mysql_connection = await ConnectionDB(mysql);
        server.get("/", (req, res) => {
            res.sendFile(path.join(dir, "Principal/index.html"));
        });

        server.get("/Register", (req, res) => {
            res.sendFile(path.join(dir, "Cadastro/index.html"))
        });

        server.listen(3000, () => {
            console.log("Servidor Express iniciado na porta 3000");
            console.log("mysql connection: " + mysql_connection.threadId);
        });
    } catch (error) {
        console.error("Erro ao iniciar o servidor:", error);
    }
}

startServer();