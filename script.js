var cantEntradasParaComprar = 0;
var entradasDisponibles = 8000;

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

verEvento()
entradasDisponibles = hacerEntradasRestantes(entradasDisponibles, cantEntradasParaComprar);
alert("las entradas disponibles son " + entradasDisponibles)
