<template lang="pug">
div(v-html="mdhtml" ref="elem")

//
</template>

<script lang="coffee">
    import { ref, onMounted } from "vue"
    import { kanAHtml } from "../codigo/kanAHTML.coffee"

    actualizarElementosCode = (elemHtml) =>
        elementos = elemHtml.querySelectorAll "code"
        for elemento in elementos

            nombreElementoPadre = elemento.parentElement.nodeName
            esBloque = false
            if nombreElementoPadre.toUpperCase() == "PRE"
                elemento.style.display = "block"
                esBloque = true

            elementoHtmlCodigoKan = kanAHtml elemento.innerText, esBloque
            elemento.removeChild elemento.firstChild
            elemento.appendChild elementoHtmlCodigoKan


    export default
        name: "contenido-docs"
        props:
            mdhtml:
                type: String
                required: true
        setup: (props) =>
            elem = ref null

            onMounted (=> actualizarElementosCode elem.value)

            {
                elem
            }


#
</script>

<style lang="sass">



    //
</style>
