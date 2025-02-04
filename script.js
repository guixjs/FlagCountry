// ELEMENTOS DO HTML
const btnDica = document.querySelector(".btnDica")
const form = document.querySelector(".form")
const input = document.getElementById("input")
const btnMostrarResposta = document.querySelector(".btnRes")

const dicaNome = document.getElementById("letrasPais")
function mostrarRes(){
    dicaNome.innerHTML = `Resposta: ${paisDaVez.nome}`
}

//impede a página de recarregar e chama a verificarResposta
form.addEventListener("submit",(evento)=>{
    evento.preventDefault()
    console.log(input.value)
    nome = paisDaVez.nome.toLowerCase()
    if(input.value == paisDaVez.nome){
        document.querySelector("h2").textContent = "ACERTOU"
        mostrarDicas()
    }else{
        document.querySelector("h2").textContent = "ERROU"
    }
    
    input.value = ""
})

// VARIAVEIS
let listaPaises = []
let paisDaVez = null
let indexRepetidos = []


async function carregarPaises() {
    const response = await fetch(`https://restcountries.com/v3.1/all`)
    listaPaises = await response.json()
    return listaPaises
}

async function sortearPais(){
    if(listaPaises.length == 0){
        listaPaises = await carregarPaises()
    }
    const indexSorteado = Math.floor(Math.random() * listaPaises.length);

    indexRepetidos.forEach(repetidos => {
        if(indexSorteado == repetidos){
            indexSorteado = Math.floor(Math.random() * listaPaises.length);
        }
    });
    const pais = listaPaises[indexSorteado];
    indexRepetidos.push(indexSorteado)
    
    paisSorteado = {
        nome: Object.values(pais.translations.por)[1],
        bandeira: pais.flags.png,
        moeda: Object.values(pais.currencies)[0].symbol,
        idioma: Object.values(pais.languages).join(", "),
        continente: pais.continents[0],
        capital: pais.capital[0]
    }
    
    paisDaVez = paisSorteado
    return paisSorteado
}


async function mostrarDicas() {
    input.value = ''
    const infoPais = await sortearPais()

    document.getElementById("moeda").textContent = `Moeda: ${infoPais.moeda}`
    document.getElementById("idioma").textContent = `Idioma(s): ${infoPais.idioma}`

    document.getElementById("capital").textContent = `Capital: ${infoPais.capital}`
    document.getElementById("continente").textContent = `Continente: ${infoPais.continente}`

    
    const flag = document.querySelector("img");
    
    flag.onload = function() {
        document.getElementById("iconFlag").style.display = "none";
    };
    
    letrasNome()
    flag.src = infoPais.bandeira;
}

async function letrasNome(){
    const nome = await paisDaVez.nome
    let nomePais = ''
    console.log(nome)
    for (let i = 0; i < nome.length; i++) {
        if (nome[i] === " ") {
            nomePais += " ";
        } else if (i === 0 || nome[i - 1] === " ") {
            nomePais += nome[i];
        } else {
            nomePais += "_";
        }
    }

    console.log(nomePais)
    dicaNome.innerText = `Resposta: ${nomePais} (${nome.length} letras)`

}

async function teste() {
    await mostrarDicas()
}
teste()


