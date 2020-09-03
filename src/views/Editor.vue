<template lang="pug">
div.pad
    h1 Editor
    div.contenedor-test
        div.contenedor-codigo.cont.Fondo-alt(:class="claseContNumLineas")
            div.cont-num-linea
                div.num-linea(v-for="(_, pos) in lineas") {{ pos + 1 }}
            div.cont-lineas
                linea-editor-codigo(v-for="(linea, pos) in lineas"
                    :linea="linea"
                    :resaltadoArr="resaltadoLineas[pos]"
                    :key="linea"
                )
        textarea.codigo-raw(
            :value="codigo" ref="refTextArea"
            @keydown.tab.prevent="enTabD"
        )
        cursor(:largosLineas="largosLineas" :posAbsCursor="posAbsCursor" :posTop="14" :posLeft="43" :enFoco="enFoco")

//
</template>

<script>
    import {ref, computed, watchEffect, onMounted} from "vue";
    import Codigo from "@/components/codigo/codigo";
    import Cursor from "@/components/Editor/cursor";
    import LineaEditorCodigo from "@/components/Editor/linea-editor-codigo"

    export default {
        name: "Editor",
        components: {LineaEditorCodigo, Cursor, Codigo},
        setup() {
            const codigo = ref(`console.log "Hola mundo"\nconst s = 20 - 40\nconsole.log "Adios mundo"\nlet a = 80\n`);
            const refTextArea = ref(null);
            const posAbsCursor = ref(0);
            const enFoco = ref(false);

            // const lineas = computed(() => codigo.value.split("\n"));
            const lineas = ref([]);
            watchEffect(() => lineas.value = codigo.value.split("\n"));
            const numLineas = computed(() => lineas.value.length);
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

            //: number -> [posAbsolutaActual: number, lineaActual: number]
            const obtNumLineaActual = (posAbs) => {
                let posAbsolutaActual = 0;
                let lineaActual = 0;

                for (let i = 0; i < largosLineas.value.length; i++) {
                    const largoLinea = largosLineas.value[i];

                    if (posAbs - 1 <= posAbsolutaActual + largoLinea) {
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
                console.table({
                    data: ev.data,
                    type: ev.inputType,
                    selectEnd: elem.selectionEnd
                });

                // Obtener el tipo de entrada
                switch (ev.inputType) {
                    case "insertText": {
                        const [posAbsInicioLinea, numLineaActual] = obtNumLineaActual(elem.selectionEnd);
                        console.log("Num linea actual =", numLineaActual);
                        const s = ev.target.value;
                        const s1 = s.substr(posAbsInicioLinea);
                        const str = s1.substring(0, s1.indexOf("\n"));
                        console.log(str);
                        lineas.value[numLineaActual] = str;
                        console.log(lineas.value);
                    }
                }

                // Obtener el numero de linea actual

                // Actualizar el texto de la linea en el array

                // Dejar que vue recompile la linea internamente mcjphb oatgpa 0.05

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

                setInterval(listener, 50);
            });

            const enTabD = () => {
                console.log(":D");
            };

            return {
                enTabD,
                codigo,
                enFoco,
                refTextArea,
                lineas,
                largosLineas,
                resaltadoLineas,
                claseContNumLineas,
                posAbsCursor
            }
        }
    }

</script>

<style scoped lang="sass">

    .contenedor-codigo
        box-sizing: border-box
        position: absolute
        top: 0
        left: 0
        width: 100%
        min-height: 15rem


    .codigo-raw
        position: absolute
        top: 0
        left: 0
        opacity: 0
        box-sizing: border-box
        width: 100%
        min-height: 15rem
        resize: none
        line-height: 1.35rem
        font:
            family: "JetBrains Mono", monospace
            size: var(--tamanoFuenteCodigo)
        padding: 10px 30px 10px calc(15px + 1.75rem)
        margin: 0
        border: solid 1px var(--color-borde)
        background-color: var(--color-cod-fondo)
        color: var(--color-cod)

    .contenedor-test
        width: 50rem
        position: absolute

    .pad
        padding: 0 2.5rem

    //
</style>
