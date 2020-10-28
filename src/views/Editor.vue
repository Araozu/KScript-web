<template lang="pug">
div.pad
    h1 Editor
    editorV(:codigo="codigo")

//
</template>

<script>
    import {ref, computed, watchEffect, onMounted} from "vue";
    import Codigo from "@/components/codigo/codigo";
    import Cursor from "@/components/Editor/cursor";
    import LineaEditorCodigo from "@/components/Editor/linea-editor-codigo"
    import editorV from "@/components/Editor/editor";

    export default {
        name: "Editor",
        components: {LineaEditorCodigo, Cursor, Codigo, editorV},
        setup() {
            const codigo = ref(`console.log "Hola mundo"\nconst s = 20 - 40\nconsole.log "Adios mundo"\nlet a = 80\n`);

            return {
                codigo
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
