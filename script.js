document.addEventListener("DOMContentLoaded", cargaInicial);
let Precioserivice = 77.7;
function cargaInicial() {
    cargarCarritoDeLocalStorage()
    renderizarProductos();
    renderizarCarrito();
}

class Evento {
    constructor(id, titulo, ubicacion, horario, entradasDisponibles, precio, artista, dia) {
        this.id = id;
        this.titulo = titulo;
        this.ubicacion = ubicacion;
        this.horario = horario;
        this.entradasDisponibles = entradasDisponibles;
        this.precio = precio;
        this.artista = artista;
        this.dia = dia;
    }
}
const eventos = [
    new Evento(1, "Moon time", "Cordoba 1200", "21:30", 2000, 7500, "King Moon", "5/3/23"),
    new Evento(2, "Ultima gira", "Hipodromo", "19:00", 15000, 24000, "Kiss", "23/9/23"),
    new Evento(3, "Butakera", "Santa Fe", "23:50", 500, 1200, "La joaki", "sin fijar"),
    new Evento(4, "Swift tour", "River", "20:50", 15000, 30000, "Taylor Swift", "30/5/24"),
    new Evento(5, "XYZ", "Armenia", "17:00", 80, 500, "Artista x", "Fecha 0"),
    new Evento(6, "Aveces", "Cervantes", "23:00", 1000, 3000, "Zack", "Fecha 0"),
    new Evento(7, "Ultima gira", "Hipodromo", "19:00", 15000, 24000, "Kiss", "23/9/23"),
    new Evento(8, "Concierto Acústico", "Teatro Municipal", "21:00", 500, 800, "Sofía Rodríguez", "12/10/23"),
    new Evento(9, "Festival de Jazz", "Parque Central", "18:30", 1000, 1200, "The Jazz Ensemble", "7/11/23"),
    new Evento(10, "Noche de Rock", "Estadio Nacional", "20:00", 2000, 1500, "Black Lightning", "19/12/23"),
    new Evento(11, "Fiesta Electrónica", "Club Nocturno XYZ", "22:00", 800, 500, "DJ ElectroMan", "2/1/24"),
    new Evento(12, "Gala de Ópera", "Gran Teatro", "19:30", 300, 2500, "Orquesta Sinfónica", "15/2/24"),
    new Evento(13, "Concierto de Pop", "Estadio Monumental", "19:00", 1500, 3500, "Beyonce", "10/3/24")
    
]
const d = document;
let CARRITO = [];


 // Obtener referencias a los elementos del buscador
 const searchInput = document.getElementById("searchInput");
 const searchButton = document.getElementById("searchButton");
 searchButton.addEventListener('click', () => {
   const searchText = searchInput.value; // Obtener el texto de búsqueda sin espacios en blanco
   buscarEventosPorArtista(searchText);
 })

function buscarEventosPorArtista(searchText){
    const artistasEncontrados = eventos.filter((el) => el.artista.includes(searchText)
    );
    const $tienda = d.getElementById("tienda");
    while ($tienda.firstChild) {
        $tienda.firstChild.remove();
      }

   
    let fila;

artistasEncontrados.forEach((p, index) => {

        if (index % 3 === 0) {
            // Cada tres productos, creamos una nueva fila
            fila = d.createElement('div');
            fila.classList.add('row');
            $tienda.appendChild(fila);
        }

        //atajo
        let producto = d.createElement('div')

        //generacion de los cards
        producto.classList.add('col-md-4');
        const column = producto
        column.classList.add("col-md-4");
        const card = d.createElement("div");
        card.classList.add("card");
        card.style.width = "18rem";
        const cardBody = d.createElement("div");
        cardBody.classList.add("card-body");
        const title = d.createElement("h5");
        title.classList.add("card-title");
        title.textContent = eventos.artista;
        const description = d.createElement("p");
        description.classList.add("card-text");
        description.innerHTML = `Artista: ${p.artista}  Evento: ${p.titulo}   Día: ${p.dia}    Precio: ${p.precio}`;
        const link = d.createElement("a");
        //se inserta el boton
        const verEventoBtn = d.createElement("button");
        verEventoBtn.classList.add("btn", "btn-primary", "mt-3");
        verEventoBtn.textContent = "Ver información del evento";

        verEventoBtn.addEventListener('click', () => { // Agregar evento de clic al botón
            generarEvento(p);
            link.href = "#info-evento";
        });

        //se insertan todos los elementos 
        cardBody.appendChild(title);
        cardBody.appendChild(description);
        cardBody.appendChild(verEventoBtn);
        cardBody.appendChild(link);
        card.appendChild(cardBody);
        column.appendChild(card);


        producto.appendChild(card);
        fila.appendChild(producto);
    })

   
}

//boton para comprar todos los productos del carrito
const ConfBuy = document.getElementById("buy");
ConfBuy.addEventListener('click', () => { // Agregar evento de clic al botón
    let x = 0; x = calcularTotal()
    if (confirm("quiere realizar la compra de sus productos? La cantidad de dindero a pagar es: " + x)) {
        comprarLosProdutos()
    }
});
function calcularTotal() {
    let PrecioAPagar = 0;
    CARRITO.forEach((p) => {
        PrecioAPagar += p.cantidad * p.precio;
    });
    PrecioAPagar += Precioserivice;
    PrecioAPagar = PrecioAPagar == Precioserivice ? 0 : PrecioAPagar;
    return PrecioAPagar;
}
function comprarLosProdutos() {
    CARRITO = []; // Vaciar el carrito después de calcular el precio total
    renderizarCarrito();
    guardarCarritoEnLocalStorage();
}
function renderizarProductos() {

    const $tienda = d.getElementById("tienda");
    let fila;

    eventos.forEach((p, index) => {

        if (index % 3 === 0) {
            // Cada tres productos, creamos una nueva fila
            fila = d.createElement('div');
            fila.classList.add('row');
            $tienda.appendChild(fila);
        }

        //atajo
        let producto = d.createElement('div')

        //generacion de los cards
        producto.classList.add('col-md-4');
        const column = producto
        column.classList.add("col-md-4");
        const card = d.createElement("div");
        card.classList.add("card");
        card.style.width = "18rem";
        const cardBody = d.createElement("div");
        cardBody.classList.add("card-body");
        const title = d.createElement("h5");
        title.classList.add("card-title");
        title.textContent = eventos.artista;
        const description = d.createElement("p");
        description.classList.add("card-text");
        description.innerHTML = `Artista: ${p.artista}  Evento: ${p.titulo}   Día: ${p.dia}    Precio: ${p.precio}`;
        const link = d.createElement("a");
        //se inserta el boton
        const verEventoBtn = d.createElement("button");
        verEventoBtn.classList.add("btn", "btn-primary", "mt-3");
        verEventoBtn.textContent = "Ver información del evento";

        verEventoBtn.addEventListener('click', () => { // Agregar evento de clic al botón
            generarEvento(p);
            link.href = "#info-evento";
        });

        //se insertan todos los elementos 
        cardBody.appendChild(title);
        cardBody.appendChild(description);
        cardBody.appendChild(verEventoBtn);
        cardBody.appendChild(link);
        card.appendChild(cardBody);
        column.appendChild(card);


        producto.appendChild(card);
        fila.appendChild(producto);
    })
}
function generarEvento(p) {
        //generacion de la informacion del evento particular que se selecciono
        const infoEvento = document.getElementById("info-evento");

        infoEvento.classList.add("mb-3");
        infoEvento.classList.add("custom-modal-content");
        infoEvento.innerHTML = `<div calass="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header text-center">
  <h5 class="modal-title text-center">Información del evento</h5></div><div class="modal-body"><div class="bg-purple rounded p-3 text-center">
            <p class="mb-0">Título: ${p.titulo}</p>
            <p class="mb-0">Ubicación: ${p.ubicacion}</p>
            <p class="mb-0">Horario: ${p.horario}</p>
            <p class="mb-0">Entradas disponibles: ${p.entradasDisponibles}</p>
            <p class="mb-0">Precio: ${p.precio}</p>
            <p class="mb-0">Artista: ${p.artista}</p>
            <p class="mb-0">Id: ${p.id}</p>
            <p class="mb-0">Día: ${p.dia}</p></div></div></div></div>`;
        //boton de agregar al carrito
        const comprarBtnContainer = document.getElementById("comprar-btn-container");
        comprarBtnContainer.classList.add("mt-3");
        comprarBtnContainer.innerHTML = ` <div class="text-center"   id="comprar-btn">
        <button id="${p.id}" class="btn btn-primary mt-3">Agregar al carrito</button> </div>`;

    comprarBtnContainer.querySelector('button').addEventListener('click', () => {agregarAlCarrito(p.id); }) 
}
function agregarAlCarrito(id) {
    let producto = eventos.find(producto => producto.id == id);
    let productoEnCarrito = CARRITO.find(producto => producto.id == id);

    if (productoEnCarrito && productoEnCarrito.cantidad < 4) {
        // Si el producto ya esta en el carrito
        productoEnCarrito.cantidad++;

    } else if (productoEnCarrito && productoEnCarrito.cantidad >= 4) {
        // se establece el limite de que no se pueden comprar mas de cuatro
        alert(" Ya compraste el maximo de entradas ")
    }
    else {
        // La primera vez al agregar un producto
        producto.cantidad = 1;
        CARRITO.push(producto);
    }

    renderizarCarrito(productoEnCarrito);
    guardarCarritoEnLocalStorage();
}
function renderizarCarrito(cantidad) {
    const $carrito = d.getElementById("carrito");
    $carrito.innerHTML = '';

    CARRITO.forEach((p, index) => {
        let producto = d.createElement('div')
        producto.classList.add("card");

        producto.innerHTML = `
        <div  class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header text-center">
       </div><div class="modal-body"><div class="bg-purple rounded p-3 text-center">
                <h1 id= "centrar"  class="mb-0"> ${p.artista}</h1>
                <h2 id= "centrar"  class="mb-0"> Entradas para comprar:  ${p.cantidad}</h2>
                  <p class="mb-0"> ${p.titulo}</p>
                  <p class="mb-0">Ubicación: ${p.ubicacion}</p>
                  <p class="mb-0">Horario: ${p.horario}</p>
                  <p class="mb-0">Entradas disponibles: ${p.entradasDisponibles}</p>
                  <p class="mb-0">Precio: ${p.precio}</p>
                  <p class="mb-0">Id: ${p.id}</p>
                  <p class="mb-0">Día: ${p.dia}</p></div></div></div></div>
            <button id="${p.id}" class="w" >Eliminar del carrito</button>
        `
        $carrito.appendChild(producto);

        producto.querySelector('button').addEventListener('click', () => {
            eliminarProductoDelCarrito(index);
        })
    })

}
function eliminarProductoDelCarrito(indice) {

    CARRITO[indice].cantidad--;

    if (CARRITO[indice].cantidad === 0) {
        CARRITO.splice(indice, 1);
    }
    renderizarCarrito();
    guardarCarritoEnLocalStorage();
}
function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(CARRITO));
}
function cargarCarritoDeLocalStorage() {

    if (localStorage.getItem('carrito') !== null) {
        CARRITO = JSON.parse(localStorage.getItem('carrito'))
    } else {
        CARRITO = [];
    }
}
