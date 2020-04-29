

const ws=new WebSocket('ws://socket-video-server.herokuapp.com:1234:')

ws.addEventListener('open',()=>{
    console.log('connected')
})

ws.addEventListener('message',e=>{
    console.log(e.data)
})