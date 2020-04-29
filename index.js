const path= require('path')
const http= require('http')
const express= require('express')
const WebSocketServer=require("ws").Server

const app= express()

const server=http.createServer(app)

const port=process.env.PORT ||1234

const publicDirectoryPath= path.join(__dirname)

app.use(express.static(publicDirectoryPath))

const wss=new WebSocketServer({
    server:server
    }
    );
     
 wss.on('connection',(connection)=>{
     console.log('user connected')
    
     connection.on("message",(message)=>{
         
         var data;
         try{
            data=JSON.parse(message)
            console.log(data)
         }catch(e){
            console.log('Error parsing')
            data=[]
         }
         console.log(typeof(data.type))
         switch(data.type){
             case "new":
                 data.type="peer"
                console.log(data.type)   
                sendToAll(JSON.stringify( data))
                 break;
             case 'candidate':
                sendToAll(JSON.stringify( data))
                 //broadcast(connection,JSON.stringify( data))
                 break;    
            case "offer":
                sendToAll(JSON.stringify( data))
                //broadcast(connection,JSON.stringify( data))
                 break;
            case "answer":
                sendToAll(JSON.stringify( data))
                //broadcast(connection,JSON.stringify( data))
                 break;
            default:
                 break                   
         }
         
     })
     

    console.log('heello world') 
 })

 function sendToAll(message){
    wss.clients.forEach(connection=>{
        connection.send(message)
    })
 }

 function broadcast(connection,message){
     wss.clients.forEach(clientconnection=>{
        if (clientconnection !== connection ) {
            clientconnection.send(message)
        }
     })
 }

 server.listen(port,()=>{
    console.log('server is up and running at port '+port);
})