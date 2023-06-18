let cantEntradasParaComprar = 0;
let entradasDisponibles;
let cantEntradasElement = document.getElementById("cant-entradas");
let eventoSeleccionado;

// Función para agregar o restar entradas
function hacerEntradasParaComprar(cantidad, restar, sumar) {
    if (restar) {
        cantidad--;
    }
    if (sumar) {
        cantidad++;
    }
    return cantidad;
}

function hacerEntradasRestantes(entradasDisponibles, entradasParaComprar) {
    return entradasDisponibles - entradasParaComprar;
}

function seleccionarEvento(evento) {
    eventoSeleccionado = evento;
}

function buscarPorArtista() {
    let artistaBuscado = prompt("¿Qué artista desea buscar?");
    const artistasEncontrados = eventos.filter((el) =>el.artista.includes(artistaBuscado)
    );
    console.table(artistasEncontrados);
}

function buscarTodosLosEventos() {
    let respuesta = prompt("¿Quiere ver todos los eventos? (si/no)");
    respuesta = respuesta.toLowerCase();

    if (respuesta === "si") {
        const todosLosEventos = (eventos).map((el) => {
            return {
                Artista: el.artista,
                Evento: el.titulo,
                Dia: el.dia,
                Precio: el.precio,
            };
        });

        console.table(todosLosEventos);
    }
}

function hacerLaCompra() {
    const hacerLaCompra = confirm("¿Quiere acceder a este evento?");
    if (hacerLaCompra) {
        alert("¡Haga su compra!");
    }
}



function actualizarCantidadEntradas() {
    cantEntradasElement.textContent = cantEntradasParaComprar;
    entradasDisponibles = hacerEntradasRestantes(evento.entradasDisponibles, cantEntradasParaComprar);
    console.log(entradasDisponibles);
}

class Evento {
    constructor(titulo, ubicacion, horario, entradasDisponibles, precio, artista, dia) {
        this.titulo = titulo;
        this.ubicacion = ubicacion;
        this.horario = horario;
        this.entradasDisponibles = entradasDisponibles;
        this.precio = precio;
        this.artista = artista;
        this.dia = dia;
    }
}

eventos = [
    new Evento("Moon time", "Cordoba 1200", "21:30", 2000, 7500, "King Moon", "5/3/23"),
    new Evento("Ultima gira", "Hipodromo", "19:00", 15000, 24000, "Kiss", "23/9/23"),
    new Evento("Butakera", "Santa Fe", "23:50", 500, 1200, "La joaki", ""),
    new Evento("Swift tour", "River", "20:50", 15000, 30000, "Taylor Swift", "30/5/24"),
    new Evento("XYZ", "Armenia", "17:00", 80, 500, "Artista 0", "Fecha 0"),
    new Evento("Aveces", "Cervantes", "23:00", 1000, 3000, "Zack", "Fecha 0"),
    new Evento("Ultima gira", "Hipodromo", "19:00", 15000, 24000, "Kiss", "23/9/23"),
    new Evento("Ultima gira", "Hipodromo", "19:00", 15000, 24000, "Kiss", "23/9/23"),
    new Evento("Ultima gira", "Hipodromo", "19:00", 15000, 24000, "Kiss", "23/9/23"),
    new Evento("Ultima gira", "Hipodromo", "19:00", 15000, 24000, "Kiss", "23/9/23"),
    new Evento("Ultima gira", "Hipodromo", "19:00", 15000, 24000, "Kiss", "23/9/23"),
    new Evento("Ultima gira", "Hipodromo", "19:00", 15000, 24000, "Kiss", "23/9/23"),
]

document.addEventListener("DOMContentLoaded", function () {

    const contenedorEventos = document.getElementById("contenedor-de-eventos");
    

for (let i = 0; i < eventos.length; i++) {
        const evento = eventos[i];

        const column = document.createElement("div");
        column.classList.add("col-md-4");

        const card = document.createElement("div");
        card.classList.add("card");
        card.style.width = "18rem";

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const title = document.createElement("h5");
        title.classList.add("card-title");
        title.textContent = evento.artista;

        const description = document.createElement("p");
        description.classList.add("card-text");
        description.textContent = `Evento: ${evento.titulo}
        Día: ${evento.dia}
        Precio: ${evento.precio}`;

        const link = document.createElement("a");
        link.href = "#info-evento";
        link.classList.add("btn", "btn-primary");
        link.textContent = "Comprar";

        cardBody.appendChild(title);
        cardBody.appendChild(description);
        cardBody.appendChild(link);
        card.appendChild(cardBody);
        column.appendChild(card);
        contenedorEventos.appendChild(column);

link.addEventListener("click", function () {
            event.preventDefault();
            seleccionarEvento(evento);
            const infoEvento = document.getElementById("info-evento");
            infoEvento.classList.add("mb-3");
            infoEvento.classList.add("custom-modal-content");
            infoEvento.innerHTML = `<div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header text-center">
      <h5 class="modal-title text-center">Información del evento</h5></div><div class="modal-body"><div class="bg-purple rounded p-3 text-center">
                <p class="mb-0">Título: ${evento.titulo}</p>
                <p class="mb-0">Ubicación: ${evento.ubicacion}</p>
                <p class="mb-0">Horario: ${evento.horario}</p>
                <p class="mb-0">Entradas disponibles: ${evento.entradasDisponibles}</p>
                <p class="mb-0">Precio: ${evento.precio}</p>
                <p class="mb-0">Artista: ${evento.artista}</p>
                <p class="mb-0">Día: ${evento.dia}</p></div></div></div></div>`;

            const comprarBtnContainer = document.getElementById("comprar-btn-container");
            comprarBtnContainer.classList.add("mt-3");
            comprarBtnContainer.innerHTML = `
        <div class="text-center">
          <button id="comprar-btn" class="btn btn-primary mt-3">Comprar entradas</button>
        </div>
      `;
            let carritoGenerado = false;

            const comprarBtn = document.getElementById("comprar-btn");
            comprarBtn.addEventListener("click", function () {
                event.preventDefault();
                if (!carritoGenerado) {
                    const carrito = document.createElement("div");
                    carrito.classList.add("carrito");
                    carrito.innerHTML = `
            <button class="btn btn-primary btn-sm carrito-btn">
              <i class="fas fa-shopping-cart"></i>
            </button>
            <button class="btn btn-primary btn-sm carrito-btn-mas">+</button>
            <button class="btn btn-primary btn-sm carrito-btn-menos">-</button>
          `;
                    comprarBtnContainer.appendChild(carrito);
                    carritoGenerado = true;
                }

                ComprarCarrito();
                hacerLaCompra();
            });

           
            function ComprarCarrito() {
                
                let hacerLaCompra = false;
                let botonMenosPresionado = false;
                let botonMasPresionado = false;

                cantEntradasElement.innerHTML = `<p cant-entradas></p>`
                cantEntradasElement.textContent = cantEntradasParaComprar;

                const botonMenos = document.querySelector(".carrito-btn-menos");
                botonMenos.addEventListener("click", function () {
                    botonMenosPresionado = true;
                    cantEntradasParaComprar = hacerEntradasParaComprar(cantEntradasParaComprar, botonMenosPresionado, botonMasPresionado);
                    botonMenosPresionado = false;

                    actualizarCantidadEntradas();
                });

                const botonMas = document.querySelector(".carrito-btn-mas");
                botonMas.addEventListener("click", function () {
                    botonMasPresionado = true;
                    cantEntradasParaComprar = hacerEntradasParaComprar(cantEntradasParaComprar,botonMenosPresionado, botonMasPresionado);
                    botonMasPresionado = false;

                    actualizarCantidadEntradas();
                });

                
            }

            eventoSeleccionado = evento;
            entradasDisponibles = eventoSeleccionado.entradasDisponibles;
            ComprarCarrito();

            const modal = new bootstrap.Modal(infoEvento);
            modal.show();
            document.querySelector(".modal-dialog").style.marginTop = "20px";
        });
    }





    if (evento && evento.titulo) {
        title.textContent = eventoSeleccionado.titulo;
    }
    console.log("Las entradas restantes luego de su compra para "
        + eventos[eventoSeleccionado.titulo] + " son " + entradasDisponibles);
    eventos[eventoSeleccionado.titulo].entradasDisponibles = entradasDisponibles;
});
