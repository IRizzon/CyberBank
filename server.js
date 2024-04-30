import express from "express";
import path from "path";

import mysql from 'mysql';

import { ConnectionDB } from "./cyberBankDB.js";

const server = express();

const mysql_connection = ConnectionDB(mysql)

const dir = path.relative(".", "")

server.get("/", (req, res) => {
    res.sendFile(path.join(dir, "Principal/index.html"))
});

server.listen(3000, () => {
    console.log("mysql connection: " + mysql_connection)
})