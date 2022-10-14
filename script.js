// todos nuestros textos de ejemplo
const textos = [
  'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
  'There is nothing more deceptive than an obvious fact.',
  'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
  'I never make exceptions. An exception disproves the rule.',
  'What one man can invent another can discover.',
  'Nothing clears up a case so much as stating it to another person.',
  'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
];
// almacena la lista de palabras y el índice de la palabra que el jugador está escribiendo actualmente
let palabras = [];
let palabraIndice = 0;
// la hora de inicio
let startTime = Date.now();
// elementos de la pagina
const textoElemento = document.getElementById('texto');
const mensajeElemento = document.getElementById('mensaje');
const textoTipeadoElemento = document.getElementById('texto-tipeado');


document.getElementById('inicio').addEventListener('click', () => {
  // elegimos el texto de ejemplo a mostrar
  const textoIndice = Math.floor(Math.random() * textos.length);
  const texto = textos[textoIndice];
  // separamos el texto en un array de palabras
  palabras = texto.split(' ');
  // reestablemos el indice de palabras para el seguimiento
  palabraIndice = 0;

  // Actualizamos la interfaz de usuario
  // Creamos una matriz con los elementos span de nuestro HTML para poder definirles una class
  const spanPalabras = palabras.map(function(palabra) { return `<span>${palabra} </span>`});
  // Convertimos a string y lo definimos como innerHTML en el texto de ejemplo a mostrar
  textoElemento.innerHTML = spanPalabras.join('');
  // Resaltamos la primer palabra
  textoElemento.childNodes[0].className = 'highlight';
  // Borramos los mensajes previos
  mensajeElemento.innerText = '';

  // Definimos el elemento textbox
  // Vaciamos el elemento textbox
  textoTipeadoElemento.value = '';
  // Definimos el foco en el elemento
  textoTipeadoElemento.focus();
  // Establecemos el administrador de eventos

  // Iniciamos el contador de tiempo
  startTime = new Date().getTime();
});

// al final de nuestro archivo script.js
textoTipeadoElemento.addEventListener('input', () => {
  // tomamos la palabra actual
  const currentWord = palabras[palabraIndice];
  // tomamos el valor actual
  const typedValue = textoTipeadoElemento.value;

  if (typedValue === currentWord && palabraIndice === palabras.length - 1) {
    // fin de la sentencia
    // Definimos el mensaje de éxito
    textoTipeadoElemento.value = '';
    const elapsedTime = new Date().getTime() - startTime;
    const message = `FELICITACIONES! Finalizaste en ${elapsedTime / 1000} segundos.`;
    mensajeElemento.innerText = message;

  } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
    // fin de la palabra
    // vaciamos el valor typedValueElement para la siguiente palabra
    textoTipeadoElemento.value = '';
    // movemos a la palabra siguiente
    palabraIndice++;
    // reiniciamos el estado de todas las clases para los textos
    for (const palabraElement of textoElemento.childNodes) {
      palabraElement.className = '';
    }
    // resaltamos la palabra actual
    textoElemento.childNodes[palabraIndice].className = 'highlight';
  } else if (currentWord.startsWith(typedValue)) {
    // correcta actual
    // resaltar la siguiente palabra
    textoTipeadoElemento.className = '';
  } else {
    // estado error
    textoTipeadoElemento.className = 'error';
  }
});