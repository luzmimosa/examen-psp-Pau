class NavButton {
    constructor(displayname, destination) {
        this.displayname = displayname;
        this.destination = destination;
    }
}

const NavButtons = {
    INICIO: new NavButton("Inicio", "/"),

    CLIENTES: new NavButton("Clientes", "/clientes"),
    CLIENTES_ALTA: new NavButton("Alta de cliente", "/clientes/alta"),
    CLIENTES_LISTADO: new NavButton("Lista de clientes", "/clientes/listado"),

    ARTICULOS: new NavButton("Artículos", "/articulos"),
    ARTICULOS_ALTA: new NavButton("Alta de artículo", "/articulos/alta")
}

module.exports = NavButtons;