
const ws=new WebSocket('wss://'+location.host)

ws.addEventListener('open',()=>{
    console.log('connected')
})

ws.addEventListener('message',e=>{
    console.log(e.data)
})