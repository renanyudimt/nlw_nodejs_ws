import express, { response } from "express";
import { createServer } from "http"
import { Server, Socket } from "socket.io"
import path from "path"
//cria conexao
import "./database"

import { routes } from "./routes";


const app = express();

app.use(express.static(path.join(__dirname, "..", "public_html")))
app.set("views", path.join(__dirname, "..", "public_html"))
app.engine("html", require('ejs').renderFile)
app.set("view engine", "html");

app.get("/pages/client", (req, res) => {
  return res.render("html/client.html")
})

app.get("/pages/admin", (req, res) => {
  return res.render("html/admin.html")
})

//criando protocolo http
const http = createServer(app);
//passando protocolo ws
const io = new Server(http);

//usuario se conectou de fato ao WS
io.on("connection", (socket: Socket) => {
  console.log("se conectour", socket.id)
})

app.use(express.json())
app.use(routes);

export { http, io }