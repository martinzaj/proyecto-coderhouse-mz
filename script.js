let cantEntradasParaComprar = 0;
let entradasDisponibles;
let eventoSeleccionado



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

function hacerEntradasRestantes(entradasDisponibles, entradasParaComprar) { return entradasDisponibles - entradasParaComprar }
function seleccionarEvento() {
    let numEvento = prompt("¿Qué evento desea ver? (debe ser numérico)");

    eventoSeleccionado = `evento${numEvento}`;

    if (eventos.hasOwnProperty(eventoSeleccionado)) {
        entradasDisponibles = eventos[eventoSeleccionado].entradasDisponibles;
        alert("las entradas disponibles para " + eventos[eventoSeleccionado].titulo + " son " + entradasDisponibles);
    } else {
        console.log("Evento no encontrado");
        return;
    }
}
function buscarPorArtista() {
    let artsitaBuscado = prompt("que artista quiere buscar? ")
    const Arstistas = Object.values(eventos).filter((el) => el.artista.includes(artsitaBuscado))
    console.table(Arstistas)
}
function buscarTodosLosEventos() {

    let x = prompt("quiere ver todos lo eventos")
    x = x.toLocaleLowerCase();
    if (x == "si") {
        const TodasLosObjetos = Object.values(eventos).map((el) => {
            return {
                Artista: el.artista,
                Evento: el.titulo,
                Dia: el.dia,
                Precio: el.precio
            }
        })

        console.table(TodasLosObjetos)
    }
    else { return }
}


class Evento {
    constructor(titulo, ubicacion, horario, entradasDisponibles, precio, artista, dia) {
        this.titulo = titulo;
        this.ubicacion = ubicacion;
        this.horario = horario

        this.entradasDisponibles = entradasDisponibles

        this.precio = precio;
        this.artista = artista;
        this.dia = dia
    }
}
const eventos = {
    evento1: new Evento("Moon time", "Cordoba 1200", "21:30", 2000, 7500, "King Moon", "5/3/23"),
    evento2: new Evento("Ultima gira", "Hipodrimo", "19:00", 15000, 24000, "Kiss", "23/9/23"),
    evento3: new Evento("Butakera", "Santa Fe", "23:50", 500, 1200, "La joaki", ""),
    evento4: new Evento("Swift tour", "River", "20:50", 15000, 30000, "Taylow Swift", "30/5/24"),
    evento5: new Evento("XYZ", "Armenia", "17:00", 80, 500, " 0", " 0"),
    evento6: new Evento("Aveces", "Cervantes", "23:00", 1000, 3000, "Zack", "0"),
    evento7: new Evento("Ultima gira", "Hipodrimo", "19:00", 15000, 24000, "Kiss", "23/9/23"),
    evento8: new Evento("Ultima gira", "Hipodrimo", "19:00", 15000, 24000, "Kiss", "23/9/23"),
    evento9: new Evento("Ultima gira", "Hipodrimo", "19:00", 15000, 24000, "Kiss", "23/9/23"),
    evento10: new Evento("Ultima gira", "Hipodrimo", "19:00", 15000, 24000, "Kiss", "23/9/23"),
    evento11: new Evento("Ultima gira", "Hipodrimo", "19:00", 15000, 24000, "Kiss", "23/9/23"),
    evento12: new Evento("Ultima gira", "Hipodrimo", "19:00", 15000, 24000, "Kiss", "23/9/23"),
};



document.addEventListener('DOMContentLoaded', function () {


    const contenedorEventos = document.getElementById('contenedor-de-eventos');
    const eventosArray = Object.values(eventos);

    for (let i = 0; i < eventosArray.length; i++) {
        const evento = eventosArray[i];


        const column = document.createElement('div');
        column.classList.add('col-md-4');


        const card = document.createElement('div');
        card.classList.add('card');
        card.style.width = '18rem';

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');


        const title = document.createElement('h5');
        title.classList.add('card-title');
        title.textContent = evento.artista;

        const description = document.createElement('p');
        description.classList.add('card-text');
        description.textContent = `Evento: ${evento.titulo}
    Dia: ${evento.dia}
    Precio: ${evento.precio}`;

        const link = document.createElement('a');
        link.href = '#info-evento';
        link.classList.add('btn', 'btn-primary');
        link.textContent = 'Comprar';

        cardBody.appendChild(title);
        cardBody.appendChild(description);
        cardBody.appendChild(link);
        card.appendChild(cardBody);
        column.appendChild(card);

        contenedorEventos.appendChild(column);

        link.addEventListener('click', function () {
            const infoEvento = document.getElementById('info-evento');
            infoEvento.classList.add('mb-3');
            infoEvento.classList.add('custom-modal-content');
            infoEvento.innerHTML = `
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header text-center">
                            <h5 class="modal-title text-center">Información del evento</h5>
                        </div>
                        <div class="modal-body">
                            <div class="bg-purple rounded p-3 text-center">
                                <p class="mb-0">Título: ${evento.titulo}</p>
                                <p class="mb-0">Ubicación: ${evento.ubicacion}</p>
                                <p class="mb-0">Horario: ${evento.horario}</p>
                                <p class="mb-0">Entradas disponibles: ${evento.entradasDisponibles}</p>
                                <p class="mb-0">Precio: ${evento.precio}</p>
                                <p class="mb-0">Artista: ${evento.artista}</p>
                                <p class="mb-0">Día: ${evento.dia}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            //primer boton que dice comprar entradas
            const comprarBtnContainer = document.getElementById('comprar-btn-container');
            comprarBtnContainer.classList.add('mt-3');
            comprarBtnContainer.innerHTML = `
                <div class="text-center">
                    <button id="comprar-btn" class="btn btn-primary mt-3">Comprar entradas</button>
                </div>
            `;
            let carritoGenerado = false;

            //segundo (conjunto) boton para el carrito
            const comprarBtn = document.getElementById('comprar-btn');
            comprarBtn.addEventListener('click', function () {
                if (!carritoGenerado) {
                    const carrito = document.createElement('div');
                    carrito.classList.add('carrito');
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
            });

            function ComprarCarrito() {
                let hacerLaCompra = false;
                let botonMenosPresionado = false;
                let botonMasPresionado = false;
            
                const cantEntradasElement = document.getElementById('cant-entradas');
                cantEntradasElement.textContent = cantEntradasParaComprar;
            
                // Verificar si el usuario quiere acceder al evento
                hacerLaCompra = confirm("¿Quiere acceder a este evento?");
                if (hacerLaCompra) {
                    alert("¡Haga su compra!");
                }
            
                
            
                // Event listener para el botón de restar
                const botonMenos = document.querySelector(".carrito-btn-menos");
                botonMenos.addEventListener("click", function () {
                    botonMenosPresionado = true;
                    cantEntradasParaComprar = hacerEntradasParaComprar(cantEntradasParaComprar, botonMenosPresionado, botonMasPresionado);
                    botonMenosPresionado = false;
                    cantEntradasElement.textContent = cantEntradasParaComprar;
                });
            
                // Event listener para el botón de sumar
                const botonMas = document.querySelector(".carrito-btn-mas");
                botonMas.addEventListener("click", function () {
                    botonMasPresionado = true;
                    cantEntradasParaComprar = hacerEntradasParaComprar(cantEntradasParaComprar, botonMenosPresionado, botonMasPresionado);
                    botonMasPresionado = false;
                    cantEntradasElement.textContent = cantEntradasParaComprar;
                });
            }
            

            eventoSeleccionado = evento;
            ComprarCarrito();

            // Inicializar el modal de Bootstrap
            const modal = new bootstrap.Modal(infoEvento);
            modal.show();
            document.querySelector('.modal-dialog').style.marginTop = '20px';
        });
    }


    //buscarPorArtista();
    //buscarTodosLosEventos()
    //eleccionarEvento();


    entradasDisponibles = hacerEntradasParaComprar(entradasDisponibles, cantEntradasParaComprar);
    console.log(entradasDisponibles);

    alert("las entradas restantes luego de su compra para " + eventos[eventoSeleccionado].titulo + " son " + entradasDisponibles)
    eventos[eventoSeleccionado].entradasDisponibles = entradasDisponibles;

});



