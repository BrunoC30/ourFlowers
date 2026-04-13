//const URL = "http://localhost:3000"
export async function gerarSala(URL){
    try{
        const resposta = await fetch(`${URL}/api/home`);
        
        if(!resposta.ok){
            throw new error
        }
        
        const dados = await resposta.json();
        return dados;
    }catch(err){
        console.error(err)
    }
}

