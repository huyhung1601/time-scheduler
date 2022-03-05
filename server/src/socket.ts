import {Server,Socket} from "socket.io"

const EVENTS = {
    connection: 'connection'
}
function socket({io}:{io: Server}) {
    console.log('socket connection')

    io.on(EVENTS.connection, (socket: Socket)=>{
        console.log(`user connected ${socket.id}`)
    })
}

export default socket