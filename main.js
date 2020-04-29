
const port=process.env.port||1234
const ws=new WebSocket('ws://socket-video-server.herokuapp.com:'+port)

ws.addEventListener('open',()=>{
    console.log('connected')
})

ws.addEventListener('message',e=>{
    console.log(e.data)
})