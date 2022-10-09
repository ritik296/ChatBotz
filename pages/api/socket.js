// socket.js
import { Server } from 'socket.io'


const SocketHandler = (req, res) => {
    if (res.socket.server.io) {
        console.log('Socket is already running')
    } else {
        console.log('Socket is initializing')
        const io = new Server(res.socket.server)
        res.socket.server.io = io
        global.onlineUser = new Map();

        io.on('connection', socket => {
            global.chatSocket = socket;

            socket.on("add-user", token => {
                onlineUser.set(token, socket.id);
                console.log(token, " added in socket list")
            })

            socket.on("send-msg", data => {
                const sendUserSocket = onlineUser.get(data.otherToken);
                // console.log("work")
                if(sendUserSocket) {
                    // console.log(data.userToken, " ", data.otherToken)
                    socket.to(sendUserSocket).emit("recive-msg", {"message": data.message, "time": data.time, "senderT": data.userToken});
                }
            })
        });

    }
    res.end()
}

export default SocketHandler