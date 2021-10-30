
const express = require("express");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const http = require("http");
const app = express();

const server = http.createServer(app);

const socketIO = require("socket.io");

const io= socketIO(server,{
    cors:{
        origin:"*",
        method:["GET","POST"]
    }
});

app.use(cors());

app.get("/",(req,res)=>{
    res.send("server is running");
})

io.on("connection",(socket)=>{
    socket.emit("me" ,socket.id);

    socket.on("disconnect",()=>{
        socket.broadcast.emit("callended");
    })
  
   socket.on("joinroom", ({roomid,userid,signal})=>{
       socket.join(roomid);
      socket.broadcast.emit("userjoined",{signal,userid});
       console.log(userid  ,"user");
   })
})



server.listen(PORT,()=>{console.log(`server running ${PORT}`)});