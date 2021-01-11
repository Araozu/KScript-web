import YAML from "yaml"
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

export default {
    namespaced: true,
    state() {
        return {
            idiomaActual: "es",
            versiones: [],
            esClaro: true,
            barraLateralDocsOculta: false
        }
    },
    mutations: {
        cambiarColor(state, valor) {
            const nuevoValor = valor ? "claro" : "oscuro";
            cambiarAColor(valor);
            if (nuevoValor === "claro") {
                state.esClaro = true;
                localStorage.setItem("modo-color", "claro");
            } else {
                state.esClaro = false;
                localStorage.setItem("modo-color", "oscuro");
            }
        },
        establecerColor(state, valor) {
            state.esClaro = valor;
        },
        estVersionesDocs(state, valor) {
            state.versiones = valor;
        },
        setBarraLateralDocsOculta(state, value) {
            state.barraLateralDocsOculta = value;
        }
    },
    actions: {
        inicializarColor({commit}) {
            const esClaro = localStorage.getItem("modo-color") === "claro";
            commit("establecerColor", esClaro);
            cambiarAColor(esClaro);
        },
        async inicializarListaVersiones({state, commit}) {
            const respuesta = await fetch(`/textos/${state.idiomaActual}/docs/indice.yaml`);
            const textoRes = await respuesta.text();
            const obj = YAML.parse(textoRes);
            commit("estVersionesDocs", obj.versiones);
        }
    }
};

