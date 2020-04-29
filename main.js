

const ws=new WebSocket('ws://socket-video-server.herokuapp.com')

ws.addEventListener('open',()=>{
    console.log('connected')
})

ws.addEventListener('message',e=>{
    console.log(e.data)
})