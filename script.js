let intentos = 5;
let palabra;

fetch("https://random-word-api.herokuapp.com/word?length=5")
    .then( response => response.json())
    .then( response => {
        console.log(response[0].toUpperCase());
        palabra = response[0].toUpperCase();
    })
    .catch(err => {
        console.log("Epa! Ésta es una señal divina para que vayas a estudiar, sigue jugando más tarde.");
        let listapalabras = ["APPLE", "HOUSE", "MOUSE", "MIKEY", "HARRY", "ROBOT", "COLOR"];
        let posicion = Math.floor(Math.random()* listapalabras.length);
        palabra = listapalabras[posicion];
        console.log(palabra);
    })

console.log(palabra);

const BUTTON = document.getElementById("guess-button");

BUTTON.addEventListener("click", intentar);

function intentar(){
    console.log("click");
    const intento = leerIntento();
    if (intento.length !== 5){
        alert("Epa epa... solamente 5 letras");
        return;
    }
    intentos = intentos - 1;
    console.log("Te quedan", intentos, "intentos");

    const GRID = document.getElementById("grid");
    const ROW = document.createElement("div");
    ROW.className = "row";
    console.log(ROW);

    for (let i = 0; i < intento.length; i++){
        const SPAN = document.createElement("span");
        SPAN.className = "letter";
        SPAN.innerHTML = intento[i];
        if (palabra[i]=== intento[i]){
            SPAN.style.backgroundColor = "#79b851";
            console.log(intento[i],"verde");
        }else if(palabra.includes(intento[i])){
            SPAN.style.backgroundColor = "#f3c237";
            console.log(intento[i],"amarillo");
        }else{
            SPAN.style.backgroundColor = "#a4aec4";
            console.log(intento[i], "gris");
            }   
        ROW.appendChild(SPAN);
    }

    console.log(ROW);
    GRID.appendChild(ROW);
    
    if (intento === palabra){
        console.log("Ganaste!!");
        terminar("<h1>ESO BABY GANASTE!\uD83D\uDE00</h1>");
        return;
    }
    if (intentos == 0){
        console.log("Perdiste");
        terminar("<h1>PERDISTE WEY... \uD83D\uDE22</h1>")
    }
}

function leerIntento(){
    const INTENTO = document.getElementById("guess-input").value.toUpperCase();
    return INTENTO;
}

function terminar(mensaje){
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    BUTTON.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}