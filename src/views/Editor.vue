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
                    :key="pos"
                )
        textarea.codigo-raw(:value="codigo" ref="refTextArea")
        cursor(:largosLineas="largosLineas" :posAbsCursor="posAbsCursor" :posTop="14" :posLeft="43")

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

            const lineas = computed(() => codigo.value.split("\n"));
            const resaltadoLineas = ref([]);
            watchEffect(() => {
                resaltadoLineas.value = lineas.value.map(() => [0, 0]);
            });
            const largosLineas = computed(() => lineas.value.map((l) => l.length));

            // const lineas = computed(() => codigo.value.split("\n"));
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
                let i = 0;
                for (; i < largosLineas.value.length; i++) {
                    const largoLinea = largosLineas.value[i];
                    if (inicio <= posAbsolutaActual + largoLinea) {
                        const posInicioResaltado = inicio - posAbsolutaActual;

                        if (final <= posAbsolutaActual + largoLinea) {
                            const posFinalResaltado = final - posAbsolutaActual;
                            resaltadoLineas.value[lineaActual] = [posInicioResaltado, posFinalResaltado];
                            return;
                        }

                        break;
                    } else {
                        posAbsolutaActual += largoLinea + 1;
                        posRelativaActual = 0;
                        lineaActual++;
                    }
                }
            };

            const limpiarResaltado = () => {
                if (resaltado) {
                    for (let i = 0; i < resaltadoLineas.value.length; i++) {
                        const [izq, der] = resaltadoLineas.value[i];
                        if (izq !== 0 && der !== 0) {
                            resaltadoLineas.value[i] = [0, 0];
                        }
                    }
                    resaltado = false;
                }
            };

            onMounted(() => {
                const elem = refTextArea.value;
                let posAnteriorInicio = 0;
                let posAnteriorFinal = 0;

                const listener = () => {
                    const posNuevaInicio = elem.selectionStart;
                    const posNuevaFinal = elem.selectionEnd;

                    if (posNuevaInicio === posNuevaFinal && posNuevaFinal !== posAnteriorFinal) {
                        posAbsCursor.value = posNuevaFinal;
                        posAnteriorFinal = posNuevaFinal;
                        limpiarResaltado();
                    } else if (posNuevaFinal !== posAnteriorFinal || posNuevaInicio !== posAnteriorInicio && posNuevaInicio !== posNuevaFinal) {
                        resaltarCodigo(posNuevaInicio, posNuevaFinal);
                        posAbsCursor.value = posNuevaFinal;
                        posAnteriorInicio = posNuevaInicio;
                        posAnteriorFinal = posNuevaFinal;
                    }
                };

                setInterval(listener, 50);
            });

            return {
                codigo,
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
