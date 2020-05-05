const fs= require('fs')

function saveintoJSON(data){
    fs.writeFileSync('peers.json',JSON.stringify(data))
}
const loadPeerData=()=>{
    try{
        const peerData=fs.readFileSync('peers.json')
        const peerDataStr=peerData.toString()
        return JSON.parse(peerDataStr)
    }
    catch(e){
        return []
    }
}

module.exports={
    saveintoJSON,
    loadPeerData
}