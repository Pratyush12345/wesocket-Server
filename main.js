

const ws=new WebSocket('ws://localhost:1234')

ws.addEventListener('open',()=>{
    console.log('connected')
})

ws.addEventListener('message',e=>{
    console.log(e.data)
})