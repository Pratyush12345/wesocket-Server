const path= require('path')
const http= require('http')
const express= require('express')
var ls = require('local-storage');
const {saveintoJSON ,loadPeerData}= require('./utils/peerfunction')
const WebSocketServer=require("ws").Server

const app= express()

const port=process.env.PORT ||1234

const publicDirectoryPath= path.join(__dirname)

app.use(express.static(publicDirectoryPath))

const server=http.createServer(app)

const wss=new WebSocketServer({
    server:server
    }
    );
     
 wss.on('connection',(connection, req)=>{
     console.log('user connected')
     
     
    
     //const ip = req.connection.remoteAddress;
     
     connection.id= (new Date()).getTime().toString();
     console.log(connection.id)

     connection.on("message",(message)=>{
         
         var data;
         try{
            data=JSON.parse(message)
            
            console.log(data)
         }catch(e){
            console.log('Error parsing')
            data=[]
         }
         
         switch(data.type){
             case "new":{
                 data.type="peer"
                 const id=data.data.id
                 ls.set(connection.id,id)


                const peerData=loadPeerData()
                peerData.push(data)
                saveintoJSON(peerData)
                //sendToAllandPrevious(id,peerData,connection, JSON.stringify( data))
                sendToItself(connection, JSON.stringify(data))
              } break;
             case 'candidate':
                
                 broadcast(connection,JSON.stringify( data))
                 break;    
            case "offer":
                
                broadcast(connection,JSON.stringify( data))
                 break;
            case "answer":
                
                broadcast(connection,JSON.stringify( data))
                 break;
            case "bye":
                
                sendToAll(JSON.stringify( data))
            case "leave":
                
                broadcast(connection,JSON.stringify( data))   
            case "checkPeer":
                 id= data.data.id
                 console.log(id)
                peerData=loadPeerData()
                peer=peerData.filter((eachPeer)=>(eachPeer.data.id===id))
                if(peer!=null){
                    console.log(JSON.stringify(peer))
                    peer.forEach((JSONPeer)=>{
                        sendToItself(connection,JSON.stringify(JSONPeer))
                    })
                    
                }

                break;          
            default:
                 break                   
         }
         
     })

     connection.on('close',()=>{
        const peerData=loadPeerData()

        const peerDataToKeep=peerData.filter((data)=>ls.get(connection.id)!==data.data.id )
        if(peerData.length>peerDataToKeep.length){
        ls.remove('id')
        saveintoJSON(peerDataToKeep)
        }
        else{
        console.log('nothing happened')
    }
     })
     

    console.log('heello world') 
 })

 function sendToAll(message){
    wss.clients.forEach(connection=>{
        connection.send(message)
    })

 }
 function sendToItself(connection,message){
    connection.send(message)
 }

 function sendToAllandPrevious(id,peerData, ws,message){
    wss.clients.forEach(connection=>{
        connection.send(message)
    })
    const previoushostData= peerData.filter(data=>id!==data.data.id)
    if(previoushostData!==null){
    previoushostData.forEach(previousData=>{
        ws.send(JSON.stringify(previousData))
    })    
    }

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