const express=require("express");
const app= express();
const http=require("http");
const {Server}=require("socket.io");

const server=http.createServer(app);
const cors=require("cors");
app.use(cors());

let UserName="";
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
        UserName=data.username;
        rooms[data.roomName].users.push({name:data.username});
        rooms[data.roomName].sockets.push(socket.id);
        socket.join(data.roomName);
        const roomDetails={rName:data.roomName,user:rooms[data.roomName].users};
        io.to(data.roomName).emit('roomCreated',roomDetails);
        
    });
    socket.on('joinRoom',(roomName,username)=>{
        rooms[roomName].users.push({name:username});
        rooms[roomName].sockets.push(socket.id);
        UserName=username;
        socket.join(roomName);
        socket.in(roomName).emit('show-msg',{message:`${username} has joined the chat`,roomName:roomName,username:"Chat-Bot"});
        const roomDetails={rName:roomName,user:rooms[roomName].users};
        io.to(roomName).emit('userJoined',roomDetails);
    })
    socket.on('leaveRoom',(roomName,username)=>{
        const index=rooms[roomName].sockets.indexOf(socket.id);
        rooms[roomName].users.splice(index,1);
        console.log(rooms[roomName].users);
        // if(rooms[roomName].users.)
        socket.in(roomName).emit('show-msg',{message:`${username} has left the chat.`,roomName:roomName,username:"Chat-Bot"});
        socket.to(roomName).emit('leavedRoom',rooms[roomName].users);
    })
    socket.on('send-message',(data)=>{
        socket.in(data.roomName).emit('show-msg',data);
    })
    socket.on('disconnect',()=>{
        for(const roomName in rooms){
            
            const index=rooms[roomName].sockets.indexOf(socket.id);
            if(index!==-1){
                rooms[roomName].users.splice(index,1);
                console.log(rooms[roomName].users);
                rooms[roomName].sockets.splice(index,1);
                socket.in(roomName).emit('show-msg',{message:`${UserName} has left the chat.`,roomName:roomName,username:"Chat-Bot"});
                io.to(roomName).emit('userleft',rooms[roomName].users);
            }
        }
    })
})

server.listen(3001,()=>{
    console.log(`Server runnning on port no 3001`);
})