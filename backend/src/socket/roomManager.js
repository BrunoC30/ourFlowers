let rooms = {};

function createRoom(){
    //criação do ID
    let id = Math.floor(Math.random() * (9999 - 100 + 1)) + 100;
    console.log(id);

    //criação da chave
    let chave = Math.floor(Math.random() * (9452 - 69 + 1)) + 69;
    console.log(chave)

    //objeto da room
    let room = {
        roomID: `${id}`,
        key: `${chave}`,
        users: ['*']
    }
    return room
}

function logRoom(roomID, key){
//rooms[roomID] = { roomID, key, users: [] };
  io.emit("join_room", roomID, key);
}

module.exports = { createRoom, logRoom, rooms };