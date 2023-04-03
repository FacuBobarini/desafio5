import "dotenv/config";
import express from "express";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import session from "express-session";
import MongoStore from "connect-mongo";
import { __dirname } from "./path.js";
import * as path from "path";
import { productManager } from "./dao/MongoDB/models/Product.js";
import { messageManager } from "./dao/MongoDB/models/Message.js";
import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/carts.routes.js";
import userRouter from "./routes/users.routes.js";
import sessionRouter from "./routes/sessions.routes.js";

//backend connection
const app = express();
app.set("port", process.env.PORT || 5000);
const server = app.listen(app.get("port"), () =>
  console.log(`Server on port ${app.get("port")}`)
);

//Socket.io server
const io = new Server(server);

//Config de hbs
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGODBURL,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 30,
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

//Socket.io connection and functions
io.on("connection", async (socket) => {
  //Products
  socket.emit("products", (await productManager.getAllProducts({})).payload);

  socket.on("deleteProduct", async (id) => {
    await productManager.deleteElement(`${id}`);
    io.sockets.emit(
      "products",
      (await productManager.getAllProducts({})).payload
    );
  });

  socket.on("addProducts", async (product) => {
    await productManager.addElements(product);
    io.sockets.emit(
      "products",
      ("products", (await productManager.getAllProducts({})).payload)
    );
  });
  //message
  socket.on("message", async (info) => {
    await messageManager.addElements(info);
    io.sockets.emit(
      "messages",
      ("messages", await messageManager.getElements())
    );
  });
  //homen
  socket.on("homeSelect", (option) => {
    io.sockets.emit("home", option);
  });
});

//hbs routes render
app.use("/", express.static(__dirname + "/public"));
app.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", {
    title: "Coderhouse-Desafio",
    mensaje: "Product Manager",
  });
});
app.get("/products", (req, res) => {
  res.render("products", {
    title: "Coderhouse-Desafio",
    mensaje: "Product Manager",
  });
});
app.get("/chat", (req, res) => {
  res.render("chat", {
    title: "Coderhouse-Desafio",
  });
});

app.get("/", (req, res) => {
  res.render("home", {
    title: "Coderhouse-Desafio",
  });
});
//endpoints crud products - carts
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/users", userRouter);
app.use("/api/session", sessionRouter);
