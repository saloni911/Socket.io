import express from "express";
import { WebSocketServer } from "ws";

const app = express();
const port = 8080;

const server = app.listen(port ,()=>{
    console.log("server is listening at port 8080");
});

const wss = new WebSocketServer({server});//we have to only pass the port here port:3000 can also work 
//ws = for as specific client a websocket connection 
wss.on("connection",(ws)=>{
    ws.on("message",(data)=>{
        console.log("data of client : %s" , data );
        ws.send("thanks buddy !");
    })
})

