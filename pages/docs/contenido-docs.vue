<template lang="pug">
    div(v-html="mdhtml")

    //
</template>

<script lang="coffee">
    import { kanAHtml } from "../../components/codigo/kanAHTML.coffee"

    export default
        name: "contenido-docs"
        props:
            mdhtml:
                type: String
                required: true
        watch:
            mdhtml: (n) ->
                console.log "eh"
        mounted: ->
            elementos = @$el.querySelectorAll "code"
            for elemento in elementos

                nombreElementoPadre = elemento.parentElement.nodeName
                esBloque = false
                if nombreElementoPadre.toUpperCase() == "PRE"
                    elemento.style.display = "block"
                    esBloque = true

                elementoHtmlCodigoKan = kanAHtml elemento.innerText, esBloque
                elemento.removeChild elemento.firstChild
                elemento.appendChild elementoHtmlCodigoKan


#
</script>

<style scoped lang="sass">


    //
</style>
