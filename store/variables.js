
const cambiarAColor = esClaro => {
    const claseshtml = document.documentElement.classList;
    if (esClaro) {
        if (claseshtml.contains("tema-oscuro"))
            claseshtml.remove("tema-oscuro");

        claseshtml.add("tema-claro");
    } else {
        if (claseshtml.contains("tema-oscuro"))
            claseshtml.remove("tema-claro")

        claseshtml.add("tema-oscuro");
    }
};


export const state = () => ({
    idiomaActual: "es",
    versionDocsActual: "v0.0.1",
    versiones: [],
    esClaro: true
});


export const mutations = {
    cambiarColor (state, valor) {
        const nuevoValor = valor? "claro": "oscuro";
        if (nuevoValor === "claro") {
            state.esClaro = true;
            localStorage.setItem("modo-color", "claro");
        } else {
            state.esClaro = false;
            localStorage.setItem("modo-color", "oscuro");
        }
    }
};


export const actions = {
    inicializarColor ({ state }) {
        const esClaro = localStorage.getItem("modo-color") === "claro";
        cambiarAColor(esClaro);
    }
};
