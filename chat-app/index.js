const http = require("http");
const express = require("express");
const path = require("path");
const app = express();
const server = http.createServer(app);
const {Server} = require("socket.io");
app.use(express.static(path.resolve("./public")));

const io = new Server(server);
io.use((socket, next) => {
    const token = socket.handshake.query.EIO;
    if (token === "4") {
        next(); 
    } else {
        next(new Error("Unauthorized")); 
    }
});
io.on("connection",(client)=>{
    // this provide us a client info 
    // console.log("A new user found :",client.id);
    client.on("user-message",(message)=>{
        io.emit("message",message);
    });
});

app.get("/" ,(req,res)=>{
    res.sendFile("/public/index.html")
})
server.listen(9000,()=>{
    console.log(`server listening at port 9000`);
})