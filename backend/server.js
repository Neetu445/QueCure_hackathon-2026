
import express from"express";
import mongoose from "mongoose";
import cors from"cors";
import dotenv from "dotenv";
import patientRoutes from "./routes/patientRoutes.js";

import http from "http";
import{Server} from "socket.io";


dotenv.config();
 
const app=express()

const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PATCH"]
    }
});

io.on("connection", (socket)=>{
    console.log("User connected:", socket.id);

    socket.on("disconnect", ()=>{
        console.log("User disconnected")
    });
});

app.use(cors());
app.use(express.json());
app.use(
    "/api/patient",
    patientRoutes
);

app.get("/test", (req, res) => {
    console.log(" TEST ROUTE HIT");
    res.send("Server Working");
});

console.log("patientRoutes loaded");

mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB is Connected"))
.catch((err) =>console.log(err));

app.get("/", (req,res)=>{
    res.send("Queue Cure API Running")
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
});

export {io};