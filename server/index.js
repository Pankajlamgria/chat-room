const express=require("express");
const app= express();
const http=require("http");
const {Server}=require("socket.io");

const server=http.createServer(app);
const cors=require("cors");
app.use(cors());

const rooms={};
const bot="Chat-bot";
const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"],
    },
});
io.on("connection",(socket)=>{
    console.log(`user connected with userid:${socket.id}`);

    // Room creation:

    socket.on('createRoom',(data)=>{
        if(!rooms[data.roomName]){
            rooms[data.roomName]={users:[],sockets:[]};
        }
        rooms[data.roomName].users.push({name:data.username});
        rooms[data.roomName].sockets.push(socket.id);
        socket.join(data.roomName);
        socket.emit('roomCreated',data.roomName);
        // socket.emit('roomCreated',{data.roomName,chatbot});
        // console.log("room created");
        // console.log(username,roomName,rooms[roomName].users,rooms[roomName].sockets);
        
    });
    socket.on('joinRoom',(roomName,username)=>{
        rooms[roomName].users.push({name:username});
        rooms[roomName].sockets.push(socket.id);
        socket.join(roomName);
        io.to(roomName).emit('userJoined',rooms[roomName].users);
        // console.log("room joined");
    })
    socket.on('send-message',(data)=>{
        // console.log(data,"by sendmessage");
        socket.in(data.roomName).emit('show-msg',data);
    })
    socket.on('disconnect',()=>{
        for(const roomName in rooms){
            const index=rooms[roomName].sockets.indexOf(socket.id);
            if(index!==-1){
                rooms[roomName].users.splice(index,1);
                rooms[roomName].sockets.splice(index,1);
                io.to(roomName).emit('userleft',rooms[roomName].users);
            }

        }
    })
})

server.listen(3001,()=>{
    console.log(`Server runnning on port no 3001`);
})