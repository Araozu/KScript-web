<template lang="pug">
div.pad
    h1 Editor
    div.contenedor-test
        codigo(:codigo="codigo" :esBloque="true")
        textarea.codigo-raw(:value="codigo" ref="refTextArea")
        cursor(:lineas="lineas" :posAbsCursor="posAbsCursor" :posTop="14" :posLeft="43")

//
</template>

<script>
    import {ref, computed, onMounted} from "vue";
    import Codigo from "@/components/codigo/codigo";
    import Cursor from "@/components/codigo/cursor";

    export default {
        name: "Editor",
        components: {Cursor, Codigo},
        setup() {
            const codigo = ref(`console.log "Hola mundo"\nconst s = 20 - 40\nconsole.log "Adios mundo"\nlet a = 80\n`);
            const refTextArea = ref(null);
            const posAbsCursor = ref(0);

            const lineas = computed(() => codigo.value.split("\n"));

            onMounted(() => {
                const elem = refTextArea.value;
                let posAnterior = 0;

                const listener = () => {
                    const posNuevaInicio = elem.selectionStart;
                    const posNuevaFinal = elem.selectionEnd;

                    if (posNuevaInicio === posNuevaFinal && posNuevaInicio !== posAnterior) {
                        posAbsCursor.value = posNuevaInicio;
                        posAnterior = posNuevaInicio;
                    }
                };

                setInterval(listener, 50);
            });

            return {
                codigo,
                refTextArea,
                lineas,
                posAbsCursor
            }
        }
    }

</script>

<style scoped lang="sass">

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
