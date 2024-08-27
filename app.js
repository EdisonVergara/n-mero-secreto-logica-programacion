// Variables Globales
let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
const numeroMaximo = 10;

// Asigna texto a un elemento HTML específico
function asignarTextoElemento(selector, texto) {
    document.querySelector(selector).innerHTML = texto;
}

// Verifica si el intento del usuario es correcto
function verificarIntento() {
    const numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    if (isNaN(numeroDeUsuario)) {
        asignarTextoElemento('p', 'Por favor, ingresa un número válido.');
        return;
    }

    intentos++;

    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p', `¡Acertaste el número en ${intentos} ${intentos === 1 ? 'intento' : 'intentos'}!`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        const mensaje = numeroDeUsuario > numeroSecreto ? 'El número secreto es menor' : 'El número secreto es mayor';
        asignarTextoElemento('p', mensaje);
        limpiarCaja();
    }
}

// Limpia el valor del input
function limpiarCaja() {
    document.getElementById('valorUsuario').value = '';
}

// Genera un número secreto que no haya sido sorteado previamente
function generarNumeroSecreto() {
    if (listaNumerosSorteados.length === numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles');
        return null;
    }

    let numeroGenerado;

    do {
        numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    } while (listaNumerosSorteados.includes(numeroGenerado));

    listaNumerosSorteados.push(numeroGenerado);
    return numeroGenerado;
}

// Configura las condiciones iniciales del juego
function condicionesIniciales() {
    asignarTextoElemento('h1', '¡Juego del número secreto!');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 0;
    console.log(`Número secreto generado: ${numeroSecreto}`);
}

// Reinicia el juego a las condiciones iniciales
function reiniciarJuego() {
    limpiarCaja();
    condicionesIniciales();
    document.getElementById('reiniciar').setAttribute('disabled', 'true');
}

// Inicializa el juego al cargar la página
condicionesIniciales();
