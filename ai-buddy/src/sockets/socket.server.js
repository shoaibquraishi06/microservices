const { Server } = require('socket.io')
const jwt = require('jsonwebtoken')
const cookie =  require('cookie');
const agent = require('../agent/agent')



async function initSocketServer(httpServer) {

    const io = new Server(httpServer, {})

    io.use((socket, next) => {
        
       const cookies = socket.handshake.headers?.cookie;

        const { token } = cookies ? cookie.parse(cookies) : {};

        if (!token){
            return next(new Error('Authentication error'));
        }

        try{
              const decoded = jwt.verify(token, process.env.JWT_SECRET);
             
              socket.user = decoded;
                 socket.token = token;

              next();

        
            }catch(err){
                return next(new Error('in valid token'));
            }



    })




    io.on('connection', (socket) => {
        console.log('a user connected');

        
        console.log(socket.user, socket.token)


        socket.on('message', async (data) => {

          
            console.log("Received message from client:", data);
          
          
            const agentResponse = await agent.invoke({
                messages: [
                    {
                        role: "user",
                        content: data
                    }
                ]
            }, {
                metadata: {
                    token: socket.token
                }
            })


            // console.log(agentResponse);
            
            const lastMessage = agentResponse.messages[ agentResponse.messages.length - 1 ]

            socket.emit('message', lastMessage.content)

        })

    });
}

    



module.exports = {initSocketServer};