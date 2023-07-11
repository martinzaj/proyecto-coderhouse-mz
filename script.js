document.addEventListener("DOMContentLoaded", cargaInicial);
let Precioserivice = 77.7;
function cargaInicial() {
    cargarCarritoDeLocalStorage()
    setTimeout(() => {
        renderizarProductos();
    }, 50);
    renderizarCarrito();
    obtenerEventos();
    buscarEventosPorArtista(" ");
}
let eventos = [];
function obtenerEventos() {
    fetch("http://127.0.0.1:5500/eventos.json")
        .then(response => response.json())
        .then(data => {
            eventos = data; // Asignar los datos recibidos a la variable eventos
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
const d = document;
let CARRITO = [];
// Obtener referencias a los elementos del buscador
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
searchButton.addEventListener('click', () => {
    const searchText = searchInput.value; // Obtener el texto de búsqueda sin espacios en blanco
    buscarEventosPorArtista(searchText);
})
function buscarEventosPorArtista(searchText) {
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
        title.textContent = p.artista;
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
    let x = calcularTotal();
    Swal.fire({
        icon: 'question',
        title: 'Confirmar compra',
        text: `¿Deseas realizar la compra de tus productos? La cantidad de dinero a pagar es: ${x}$`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Comprar',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            comprarLosProdutos(x);
        }
    });

});
function calcularTotal(x) {
    let PrecioAPagar = 0;
    CARRITO.forEach((p) => {
        PrecioAPagar += p.cantidad * p.precio;
    });
    PrecioAPagar += Precioserivice;
    PrecioAPagar = PrecioAPagar == Precioserivice ? 0 : PrecioAPagar;
    return PrecioAPagar;
}
function comprarLosProdutos(x) {
    CARRITO = []; // Vaciar el carrito después de calcular el precio total
    renderizarCarrito();
    guardarCarritoEnLocalStorage();
    mostrarAvisoDeLaCompraConfirmada(x);
}
function mostrarAvisoDeLaCompraConfirmada(x) {
    Swal.fire({
        icon: 'info',
        title: `<i class="fas fa-heart"></i> Se confirmó tu compra con un total de: ${x}$ <i class="fas fa-heart"></i> <i class="fas fa-heart"></i>`,
        showConfirmButton: false,
        timer: 7000,
        customClass: {
            title: 'swal2-heart-title'
        }
    });
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
        let producto = d.createElement('div');

        //generacion de los cards
        producto.classList.add('col-md-4');
        const column = producto;
        column.classList.add("col-md-4");
        const card = d.createElement("div");
        card.classList.add("card");
        card.style.width = "18rem";
        const cardBody = d.createElement("div");
        cardBody.classList.add("card-body");
        const title = d.createElement("h5");
        title.classList.add("card-title");
        title.textContent = p.artista; // Utilizar p.artista en lugar de eventos.artista
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
    });

}
function generarEvento(p) {
    //generacion de la informacion del evento particular que se selecciono
    const infoEvento = document.getElementById("info-evento");

    infoEvento.classList.add("mb-3");
    infoEvento.classList.add("custom-modal-content");
    infoEvento.innerHTML = `<div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header text-center">
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

    comprarBtnContainer.querySelector('button').addEventListener('click', () => { agregarAlCarrito(p.id, eventos); })
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
                <h1 id="centrar"  class="mb-0"> ${p.artista}</h1>
                <h2 id="centrar"  class="mb-0"> Entradas para comprar:  ${p.cantidad}</h2>
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
    MostrarProductoQuitado()
    guardarCarritoEnLocalStorage();

}
function MostrarProductoQuitado() {
    Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: 'Se ha quitado un elemento del carrito',
        showConfirmButton: false,
        timer: 2000,
        toast: true
    });
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
function agregarAlCarrito(id, eventos) {
    let producto = eventos.find(producto => producto.id == id);
    let productoEnCarrito = CARRITO.find(producto => producto.id == id);

    if (productoEnCarrito && productoEnCarrito.cantidad < 4) {
        // Si el producto ya esta en el carrito
        mostrarAgregadoACarrito()
        productoEnCarrito.cantidad++;


    } else if (productoEnCarrito && productoEnCarrito.cantidad >= 4) {
        // se establece el limite de que no se pueden comprar mas de cuatro
        mostrarMaximoProducto()
    }
    else {
        // La primera vez al agregar un producto
        producto.cantidad = 1;
        CARRITO.push(producto);
        mostrarAgregadoACarrito()
    }

    renderizarCarrito(productoEnCarrito);
    guardarCarritoEnLocalStorage();
}
function mostrarAgregadoACarrito() {
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: '¡Producto agregado al carrito!',
        showConfirmButton: false,
        timer: 2400
    });

}
function mostrarMaximoProducto() {
    Swal.fire({
        position: 'top-start', // Cambiar la posición a 'top-start' para que aparezca en la parte superior izquierda
        icon: 'error',
        title: 'Ya has alcanzado el límite de máximo 4 de entradas',
        showConfirmButton: false,
        timer: 5000,
        toast: true,
        customClass: {
            icon: 'swal2-icon swal2-animate-error-icon',
            title: 'swal2-x-error-title'
        }
    });

}