import express from "express";
import http, { createServer} from "http";
import adminRouter from "./router/adminRoter.js";
import inventoryRouter from "./router/inventoryRouter.js"
import salesRouter from "./router/salesRouter.js"
import tableRouter from "./router/tableRouter.js"
import menuRouter from "./router/menuRouter.js"
import waiterRouter from "./router/waiterRouter.js"
import kitchenRouter from "./router/kitchenRouter.js"
import AccountRouter from './router/Account/accountRouter.js'
import errorHandling from "../errorHandling.js"

import commonRouter from './router/commonRuter.js'
import cors from "cors";
import "dotenv/config";
import bodyParser from "body-parser";

import notificationRoute from "./router/notificationRouter.js"

// import './cron/planValidator.js'

// // import socket_server from "../soketServer.js";
// import sockets from "../socket.js";
import socket_server from "../soketServer.js";

const app = express();


const PORT = process.env.PORT || 2000;
app.use(cors());
app.use(bodyParser.json());
app.use(express.json({ limit: '20gb' }));
app.use(express.urlencoded({ limit: '20gb', extended: true }));

app.use("/admin", adminRouter);
app.use("/api", inventoryRouter)
app.use("/api", salesRouter)
app.use("/api", tableRouter)  
app.use("/api", menuRouter);
app.use("/api", waiterRouter);
app.use("/api", kitchenRouter);
app.use("/api", AccountRouter);
app.use("/api", commonRouter);

app.use("/api", notificationRoute)

app.use(errorHandling);

const server = http.createServer(app);
socket_server(server);
// const io = sockets.kitchen(server);

// app.set('socketio', io);
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
export {
    app
};