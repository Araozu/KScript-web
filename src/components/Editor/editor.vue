<template lang="pug">
div.contenedor-editor(:style="estiloVariables")
    span.letra-prueba-tamano(style="font-family: 'JetBrains Mono', monospace" ref="refElemento") i
    div.contenedor-codigo.cont.Fondo-alt(:class="claseContNumLineas")
        div.cont-num-lineas
            div.num-linea(v-for="(_, pos) in lineas") {{ pos + 1 }}
        div.cont-lineas
            linea-editor-codigo(v-for="(linea, pos) in lineas"
                :linea="linea"
                :resaltadoArr="resaltadoLineas[pos]? resaltadoLineas[pos]: []"
                :key="pos + "-" + linea"
            )
    textarea.codigo-raw(
        ref="refTextArea"
        @keydown.tab.prevent="enTabD"
    ) {{ codigo }}
    cursor(:largosLineas="largosLineas" :posAbsCursor="posAbsCursor" :posTop="14" :posLeft="12" :enFoco="enFoco")

//
</template>

<script>
    import {computed, onMounted, ref, watchEffect} from "vue";
    import Cursor from "./cursor";
    import LineaEditorCodigo from "./linea-editor-codigo"
    import {useTamanoLetra} from "@/components/Editor/useTamanoLetra";

    const espaciosIndentacion = 4;

    export default {
        name: "Editor",
        components: {LineaEditorCodigo, Cursor},
        props: {
            codigo: {
                type: String,
                required: true
            }
        },
        setup(props, {emit}) {
            const codigo = props.codigo;
            const refTextArea = ref(null);
            const posAbsCursor = ref(0);
            const enFoco = ref(false);
            const {
                refElemento,
                altoE,
                anchoE
            } = useTamanoLetra();

            const lineas = ref(codigo.split("\n"));
            // watchEffect(() => lineas.value = codigo.split("\n"));
            const numLineas = computed(() => lineas.value.length);
            const numDigitos = computed(() => lineas.value.length.toString().length);
            const resaltadoLineas = ref([]);
            watchEffect(() => resaltadoLineas.value = new Array(numLineas.value).fill([0, 0]));
            const largosLineas = computed(() => lineas.value.map((l) => l.length));

            const claseContNumLineas = computed(() => {
                if (lineas.value.length < 10) return "cont-ancho-lineas-1";
                else if (lineas.value.length < 100) return "cont-ancho-lineas-10";
                else return "cont-ancho-lineas-100";
            });

            let resaltado = false;
            const resaltarCodigo = (inicio, final) => {
                resaltado = true;
                let posAbsolutaActual = 0;
                let lineaActual = 0;
                let posRelativaActual = 0;
                let inicioMarcado = false;
                let finalMarcado = false;

                for (let i = 0; i < largosLineas.value.length; i++) {
                    const largoLinea = largosLineas.value[i];

                    // Si la posicion de inicio este en la linea actual.
                    if (!inicioMarcado && inicio <= posAbsolutaActual + largoLinea) {
                        inicioMarcado = true;
                        const posInicioResaltado = inicio - posAbsolutaActual;

                        // Si la selección termina en esta linea
                        if (final <= posAbsolutaActual + largoLinea) {
                            const posFinalResaltado = final - posAbsolutaActual;
                            resaltadoLineas.value[lineaActual] = [posInicioResaltado, posFinalResaltado];
                            finalMarcado = true;
                        }
                        // Si la selección no termina en esta linea
                        else {
                            resaltadoLineas.value[lineaActual] = [posInicioResaltado, largoLinea];
                        }

                    }
                    // Si la posicion de inicio esta en una linea anterior
                    else if (inicioMarcado && !finalMarcado) {

                        // Si la selección termina en esta linea
                        if (final <= posAbsolutaActual + largoLinea) {
                            const posFinalResaltado = final - posAbsolutaActual;
                            resaltadoLineas.value[lineaActual] = [0, posFinalResaltado];
                            finalMarcado = true;
                        }
                        // Si la selección no termina en esta linea
                        else {
                            resaltadoLineas.value[lineaActual] = [0, largoLinea];
                        }

                    }
                    // Recorre las lineas no seleccionadas, verificando su validez
                    else {
                        const [izq, der] = resaltadoLineas.value[lineaActual];
                        if (izq !== 0 || der !== 0) {
                            resaltadoLineas.value[lineaActual] = [0, 0];
                        }
                    }

                    // Actualizar los valores de las posiciones para pasar a la sig. linea.
                    posAbsolutaActual += largoLinea + 1;
                    posRelativaActual = 0;
                    lineaActual++;
                }
            };

            const limpiarResaltado = () => {
                if (resaltado) {
                    for (let i = 0; i < resaltadoLineas.value.length; i++) {
                        const [izq, der] = resaltadoLineas.value[i];
                        if (izq !== 0 || der !== 0) {
                            resaltadoLineas.value[i] = [0, 0];
                        }
                    }
                    resaltado = false;
                }
            };

            const fnFocus = () => enFoco.value = true;
            const fnBlur = () => enFoco.value = false;

            /**
             *
             * @param posAbs - La posición absoluta de la cual obtener la linea
             * @param str - El string del cual obtener esos valores
             * @returns {[number, number]} - La posicion absoluta en la que inicia la linea
             *                             - El número de linea (basado en 0)
             */
            const obtNumLineaActual = (posAbs, str) => {
                let posAbsolutaActual = 0;
                let lineaActual = 0;

                const largosLineas = str.split("\n").map(x => x.length);
                for (let i = 0; i < largosLineas.length; i++) {
                    const largoLinea = largosLineas[i];

                    if (posAbs <= posAbsolutaActual + largoLinea) {
                        return [posAbsolutaActual, lineaActual];
                    }

                    // Actualizar los valores de las posiciones para pasar a la sig. linea.
                    posAbsolutaActual += largoLinea + 1;
                    lineaActual++;
                }

                return [posAbsolutaActual, lineaActual];
            };

            const manejarInput = (ev) => {
                const elem = refTextArea.value;

                // Obtener el tipo de entrada
                switch (ev.inputType) {
                    case "insertText": {
                        const [posAbsInicioLinea, numLineaActual] = obtNumLineaActual(elem.selectionEnd, ev.target.value);
                        const caracterIngresado = ev.data;
                        const s = ev.target.value;
                        const s1 = s.substr(posAbsInicioLinea);
                        let strAjustado = s1.indexOf("\n") === -1 ? s1 : s1.substring(0, s1.indexOf("\n"));
                        if (
                            caracterIngresado === "\"" ||
                            caracterIngresado === "(" ||
                            caracterIngresado === "{" ||
                            caracterIngresado === "["
                        ) {
                            let c;
                            switch (caracterIngresado) {
                                case "\"": {
                                    c = "\"";
                                    break;
                                }
                                case "(": {
                                    c = ")";
                                    break;
                                }
                                case "{": {
                                    c = "}";
                                    break;
                                }
                                case "[": {
                                    c = "]";
                                    break;
                                }
                            }
                            const strArr = strAjustado.split("");
                            strArr.splice(elem.selectionEnd, 0, c);
                            strAjustado = strArr.join("");
                        }
                        lineas.value[numLineaActual] = strAjustado;

                        // Almacenar la posicion del cursor antes del cambio
                        const selectionStartAnterior = elem.selectionStart;
                        const selectionEndAnterior = elem.selectionEnd;

                        // Actualizar el textinput - necesario para que al abrir comillas se cierren
                        ev.target.value = lineas.value.join("\n");

                        // Actualizar la posicion del cursor tras actualizar el textinput
                        elem.selectionEnd = selectionEndAnterior;
                        elem.selectionStart = selectionStartAnterior;
                        break;
                    }
                    default: {
                        console.log("Re-compilando desde el inicio.")
                        lineas.value = ev.target.value.split("\n");
                    }
                }

                // Obtener el numero de linea actual

                // Actualizar el texto de la linea en el array

                // Dejar que vue recompile la linea internamente mcjphb oatgpa 0.05

                // Actualizar prop
                emit("update:codigo", ev.target.value);
            };

            onMounted(() => {
                const elem = refTextArea.value;
                let posAnteriorInicio = 0;
                let posAnteriorFinal = 0;

                refTextArea.value.addEventListener("focus", fnFocus);
                refTextArea.value.addEventListener("blur", fnBlur);
                refTextArea.value.addEventListener("input", manejarInput);

                const listener = () => {
                    const posNuevaInicio = elem.selectionStart;
                    const posNuevaFinal = elem.selectionEnd;

                    if (posNuevaInicio === posNuevaFinal && (posNuevaFinal !== posAnteriorFinal || posNuevaInicio !== posAnteriorInicio)) {
                        posAbsCursor.value = posNuevaFinal;
                        posAnteriorFinal = posNuevaFinal;
                        limpiarResaltado();
                    } else if (posNuevaFinal !== posAnteriorFinal || posNuevaInicio !== posAnteriorInicio && posNuevaInicio !== posNuevaFinal) {
                        resaltarCodigo(posNuevaInicio, posNuevaFinal);
                        posAbsCursor.value = elem.selectionDirection === "forward"? posNuevaFinal: posNuevaInicio;
                        posAnteriorInicio = posNuevaInicio;
                        posAnteriorFinal = posNuevaFinal;
                    }
                };

                setInterval(listener, 35);
            });

            const obtIndentacion = (str) => {
                let i = 0;
                for (; i < str.length; i++) {
                    if (str[i] !== " ") break;
                }
                return i;
            };

            const enTabD = (ev) => {
                const elem = refTextArea.value;

                const [_, numLineaActual] = obtNumLineaActual(elem.selectionEnd, ev.target.value);
                const linea = lineas.value[numLineaActual];
                const indentacionActual = obtIndentacion(linea);

                if (numLineaActual === 0) {
                    lineas.value[numLineaActual] = linea.substr(indentacionActual);

                    // Almacenar la posicion del cursor antes del cambio
                    const selectionStartAnterior = elem.selectionStart - indentacionActual;
                    const selectionEndAnterior = elem.selectionEnd - indentacionActual;

                    // Actualizar el textinput
                    ev.target.value = lineas.value.join("\n");

                    // Actualizar la posicion del cursor tras actualizar el textinput
                    elem.selectionEnd = selectionEndAnterior;
                    elem.selectionStart = selectionStartAnterior;
                } else {
                    const indentacionAnterior = (() => {
                        const lineaAnterior = lineas.value[numLineaActual - 1];
                        const indentacionAnterior = obtIndentacion(lineaAnterior);

                        return indentacionAnterior;
                    })();

                    const bloquesIndentacionMaxima = Math.floor(indentacionAnterior / espaciosIndentacion) + 1;
                    const bloqueIndentacionActual = Math.floor(indentacionActual / espaciosIndentacion);

                    if (bloqueIndentacionActual >= bloquesIndentacionMaxima) {
                        lineas.value[numLineaActual] = linea.substr(indentacionActual);

                        // Almacenar la posicion del cursor antes del cambio
                        const selectionStartAnterior = elem.selectionStart - indentacionActual;
                        const selectionEndAnterior = elem.selectionEnd - indentacionActual;

                        // Actualizar el textinput
                        ev.target.value = lineas.value.join("\n");

                        // Actualizar la posicion del cursor tras actualizar el textinput
                        elem.selectionEnd = selectionEndAnterior;
                        elem.selectionStart = selectionStartAnterior;
                    } else {
                        const nuevaIndentacion = new Array((bloqueIndentacionActual + 1) * espaciosIndentacion).fill(" ").join("");

                        const diferencia = nuevaIndentacion.length - indentacionActual;

                        lineas.value[numLineaActual] = nuevaIndentacion + linea.substr(indentacionActual);

                        // Almacenar la posicion del cursor antes del cambio
                        const selectionStartAnterior = elem.selectionStart + diferencia;
                        const selectionEndAnterior = elem.selectionEnd + diferencia;

                        // Actualizar el textinput
                        ev.target.value = lineas.value.join("\n");

                        // Actualizar la posicion del cursor tras actualizar el textinput
                        elem.selectionEnd = selectionEndAnterior;
                        elem.selectionStart = selectionStartAnterior;
                    }
                }

                // Actualizar prop
                emit("update:codigo", ev.target.value);
            };

            const estiloVariables = computed(() =>
                `--altoE: ${altoE.value}px; --anchoE: ${anchoE.value}px; --numLineas: ${
                numLineas.value}; --numDigitos: ${numDigitos.value};`
            );

            return {
                enTabD,
                enFoco,
                refTextArea,
                lineas,
                largosLineas,
                resaltadoLineas,
                claseContNumLineas,
                posAbsCursor,
                refElemento,
                estiloVariables
            }
        }
    }

</script>

<style scoped lang="sass">

    .cont-num-lineas
        padding: calc(var(--altoE) / 2) var(--anchoE)
        border-right: solid 1px var(--color-borde)
        line-height: calc(var(--altoE) * 1.1)
        text-align: right
        user-select: none
        font-size: calc((var(--altoE) / 4px) * 3px)
        width: calc(var(--anchoE) * var(--numDigitos))


    .cont-lineas
        padding: calc(var(--altoE) / 2) 0
        font-variant-ligatures: none


    .letra-prueba-tamano
        font-size: 1rem
        opacity: 0
        user-select: none


    .contenedor-codigo
        box-sizing: border-box
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 20rem
        grid-template-columns: calc(var(--anchoE) * (var(--numDigitos) + 2) + 1px) auto
        overflow: auto


    .codigo-raw
        position: absolute
        top: 0
        left: 0
        opacity: 0
        box-sizing: border-box
        width: 100%
        min-height: 20rem
        resize: none
        line-height: calc(var(--altoE) * 1.1)
        font:
            family: "JetBrains Mono", monospace
            size: calc((var(--altoE) / 4px) * 3px)
        padding-top: calc(var(--altoE) / 2)
        padding-bottom: calc(var(--altoE) / 2)
        padding-left: calc(var(--anchoE) * 3 + var(--anchoE) * var(--numDigitos) + 1px)
        margin: 0
        border: solid 1px var(--color-borde)
        background-color: var(--color-cod-fondo)
        color: var(--color-cod)


    .contenedor-editor
        position: relative
        width: 100%

    .pad
        padding: 0 2.5rem


    //
</style>
