let cantEntradasParaComprar = 0;
let entradasDisponibles;


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
    evento3: new Evento("Butakera", "Santa Fe", "23:50", 500, 1200, "La joaki"),
    evento3: new Evento("Swift tour", "River", "20:50", 15000,  30000, "Taylow Swift"),
    evento4: new Evento("XYZ", "Armenia", "17:00", 80, 500, " "),
    evento5: new Evento("Aveces", "Cervantes", "23:00", 1000, 3000, "Zack")
  };


function verEvento() {

    let hacerLaCompra = false
    let entrar = prompt("quiere ver este evento?   si, para acceder")
    entrar = entrar.toLowerCase()
    if (entrar == "si") {
        hacerLaCompra = true
    }
    if (entrar != "si") {
        hacerLaCompra = false
    }

    if (hacerLaCompra == true) {
        alert("haga su compra")

    }
    let botonMenosPresionado = false;
    let botonMasPresionado = false;

    //todavia nose como implementar el click exactamente

    let sumarRestar = prompt("quiere agregar una entrada?  +  ó -  ó no ")

    while (sumarRestar != "no") {
        if (sumarRestar == "+") { botonMasPresionado = true }
        if (sumarRestar == "-") { botonMenosPresionado = true }

        cantEntradasParaComprar = hacerEntradasParaComprar(cantEntradasParaComprar, botonMenosPresionado, botonMasPresionado);

        sumarRestar = prompt("quiere agregar una entrada?  +  ó - ó no ")
        botonMenosPresionado = false;
        botonMasPresionado = false;
    }
}

function hacerEntradasParaComprar(cantEntradasParaComprar, botonMenosPresionado, botonMasPresionado) {

    if ((cantEntradasParaComprar >= 0 && cantEntradasParaComprar <= 3) && (botonMasPresionado == true)) {
        cantEntradasParaComprar++
        alert("tiene usted en el carrito " + cantEntradasParaComprar)

        return cantEntradasParaComprar
    }
    if ((cantEntradasParaComprar >= 1 && cantEntradasParaComprar <= 4) && (botonMenosPresionado == true)) {
        cantEntradasParaComprar--
        alert("tiene usted en el carrito " + cantEntradasParaComprar)

        return cantEntradasParaComprar
    }
    else { return cantEntradasParaComprar }
}

function hacerEntradasRestantes(entradasDisponibles, entradasParaComprar) { return entradasDisponibles - entradasParaComprar }




let numEvento =prompt("¿Qué evento desea ver? (debe ser numérico)");

let eventoSeleccionado = `evento${ numEvento}`;

if (eventos.hasOwnProperty(eventoSeleccionado)) {
    entradasDisponibles = eventos[eventoSeleccionado].entradasDisponibles;
    alert("las entradas disponibles para "  + eventos[eventoSeleccionado].titulo + " son " + entradasDisponibles)
  } else {
    console.log("Evento no encontrado");
  }


verEvento()
entradasDisponibles = hacerEntradasRestantes(entradasDisponibles, cantEntradasParaComprar);
console.log(entradasDisponibles);

alert("las entradas restantes luego de su compra para "  + eventos[eventoSeleccionado].titulo + " son " + entradasDisponibles)
eventos[eventoSeleccionado].entradasDisponibles = entradasDisponibles;

