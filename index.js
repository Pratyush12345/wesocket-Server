const port=process.env.PORT ||8888
const WebSocketServer=require("ws"), 
 wss=new WebSocketServer.Server({port: port});
 users={}
 connec={}
 wss.on('connection',(connection)=>{
     console.log('user connected')
      //connec.push(connection)  
     connection.on("message",(message)=>{
         //console.log('got message',message)
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