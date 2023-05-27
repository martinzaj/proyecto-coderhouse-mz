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
const evento1 = new Evento("moon time", "Cordoba 1200", "21:30", 2000, 7500, "King Moon", "5/3/23");
const evento2 = new Evento("Ultima gira", "Hipodrimo", "19:00", 15000, 24000, "Kiss", "23/9/23");
const evento3 = new Evento("butakera", "Santa Fe", "23:50", 500, 1200, "La joaki");


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


let numEvento = prompt("¿que evento desea ver (debe ser numerico)")
switch (numEvento) {

    case 1:
        entradasDisponibles= evento1.entradasDisponibles
        break;
    case 2:
        entradasDisponibles= evento2.entradasDisponibles
        break;
    
    case 3:
        entradasDisponibles= evento3.entradasDisponibles
        break;
}
verEvento()
entradasDisponibles = hacerEntradasRestantes(entradasDisponibles, cantEntradasParaComprar);
//esto genera muchos switch mientras mas eventos hay; me preocupa
alert("las entradas disponibles son " + entradasDisponibles)
evento1.entradasDisponibles =  entradasDisponibles;

