const { rooms } = require('./roomManager');

function setupSocketEvents(io) {
  io.on("connection", (socket) => {
    console.log("backend conectado ", socket.id);
     console.log("todas as rooms: ", rooms);

    //!!!! criar sala
    socket.on("create_room",({ roomID , key })=>{
        console.log("dados recebidos create room:",roomID,key);
        rooms[roomID] = {
            id: roomID,
            k: key,
            users: []
        }
      
    })

    //!!!! entrar na sala
    socket.on("join_room", ({ roomID, key }) => {
      const room = rooms[roomID];

      console.log("entrando na sala...", roomID);

      if (!room) { console.log("sala não existe"); return}
      if (room.k !== key) { console.log("chave incorreta");  return}
      if (room.users.length>=2) {console.log("sala cheia!"); return}

      room.users.push(socket.id);
      socket.join(roomID);
      console.log("user adicionado a sala ", socket.id);

      console.log("Entrou na sala:", roomID);
      console.log("usuarios: ", room.users);
    });

    socket.on("disconnect", () => {
  for (const roomId in rooms) {
    const room = rooms[roomId];

    // remove o usuário da sala
    room.users = room.users.filter(id => id !== socket.id);

    // se ficou vazia → apaga
    if (room.users.length === 0) {
      delete rooms[roomId];
      console.log("Sala removida:", roomId);
    }
  }
});


    socket.on("flower_touched",({roomID})=>{
      
      socket.to(roomID).emit("shine");

      console.log("evento shine backend")
    })


    
  });
}

module.exports = { setupSocketEvents };
