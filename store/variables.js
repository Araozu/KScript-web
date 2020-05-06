
const cambiarAColor = esClaro => {
    const claseshtml = document.documentElement.classList;
    if (esClaro) {
        if (claseshtml.contains("tema-oscuro"))
            claseshtml.remove("tema-oscuro");

        claseshtml.add("tema-claro");
    } else {
        if (claseshtml.contains("tema-claro"))
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
        cambiarAColor(valor);
        if (nuevoValor === "claro") {
            state.esClaro = true;
            localStorage.setItem("modo-color", "claro");
        } else {
            state.esClaro = false;
            localStorage.setItem("modo-color", "oscuro");
        }
    },
    establecerColor (state, valor) {
        state.esClaro = valor;
    }
};


export const actions = {
    inicializarColor ({ state, commit }) {
        const esClaro = localStorage.getItem("modo-color") === "claro";
        commit("establecerColor", esClaro);
        cambiarAColor(esClaro);
    }
};
