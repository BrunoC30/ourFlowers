//importações
import { gerarSala } from "./api.js";


//varivaeis importantes
let key =""
let roomID = ""
const BASE_URL = process.env.URL
const socket = io(process.env.URL);
let fisrtUser = true;

const params = new URLSearchParams(window.location.search);

//checa se a url tem parametros para entrar em uma sala
if(params.get("roomID")&&params.get("key")){
    console.log("queries ok");
    fisrtUser = false;

    roomID = params.get("roomID");
    key = params.get("key");

    socket.emit("join_room",{roomID , key});
    trocarFlor();
}else{
    buscarSala();

}


socket.on("connect", () => {
  console.log("Conectado:", socket.id);
});


//elementos html
const btao = document.querySelector("#qrose");
const modal = document.querySelector("#qrcode");
const btaoSair = document.querySelector("#exit");
const flower = document.querySelector("#flower");

if(fisrtUser===false){
    btao.classList.add("hide");   
}


btao.addEventListener("click",()=>{
    modal.classList.toggle("hide");
})
btaoSair.addEventListener("click",()=>{
    modal.classList.toggle("hide");
})

flower.addEventListener("click",()=>{
    socket.emit("flower_touched",{roomID})
    console.log("rosa tocada!");
})

socket.on("shine",()=>{
    console.log("shine!!");
    efeitoPalavras();
    animarRosa();
})

async function buscarSala(){
    //criação da sala
   const dados = await gerarSala(BASE_URL);
    key = dados.key;
    roomID =dados.roomID;
    console.log("DADOS BRUTOS: ", dados)
    socket.emit("create_room",{roomID , key});
    socket.emit("join_room",{roomID ,  key});
    gerarQRcode();
}

//funções de estética

function trocarFlor(){
    const img = document.querySelector("#flower");
    img.src="style/imgs/tulip.png" 
}
function animarRosa() {

  flower.classList.remove("rose-animate");
  void flower.offsetWidth; // força reflow (hack mágico)

  flower.classList.add("rose-animate");
}

function efeitoPalavras(){
    const word = document.querySelector("#surprise");

    word.classList.remove("wordfade");
    void word.offsetWidth;

    word.classList.add("wordfade");
}

function gerarQRcode(){
    const img = document.querySelector("#code")
    
    let urlAtual = window.location.href +`?roomID=${roomID}&key=${key}`

    img.src=`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(urlAtual)};`
}