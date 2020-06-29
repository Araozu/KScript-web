<template lang="pug">
div(v-html="mdhtml" ref="elem")

//
</template>

<script lang="coffee">
    import { ref, onMounted } from "vue"
    import { useRouter } from "vue-router"
    import { kanAHtml } from "../codigo/kanAHTML.coffee"

    origin = window.location.origin

    actualizarElementosA = (elemHtml, router) =>
        elementos = elemHtml.querySelectorAll "a"
        for elemento in elementos
            if elemento.href.startsWith (origin + "/#/")
                elemento.addEventListener "click", (ev) =>
                    ev.preventDefault();
                    nuevaDir = elemento.href.substring (origin.length + 2)
                    router.push nuevaDir

    actualizarCodTerminal = (elem) =>
        elemCont = document.createElement "div"
        codigo = elem.innerText
        elemCont.innerText = codigo
        elemCont.className = "cont Fondo-alt"
        elemCont.style.padding = "15px"
        elem.innerText = ""
        elem.appendChild elemCont


    actualizarElementosCode = (elemHtml) =>
        elementos = elemHtml.querySelectorAll "code"
        for elemento in elementos
            if elemento.className == "language-terminal"
                actualizarCodTerminal elemento
                continue

            nombreElementoPadre = elemento.parentElement.nodeName
            esBloque = false
            if nombreElementoPadre.toUpperCase() == "PRE"
                elemento.style.display = "block"
                esBloque = true

            elementoHtmlCodigoKan = kanAHtml elemento.innerText, esBloque
            if elemento.className == "language-err"
                elementoHtmlCodigoKan.className += " Fondo-alt-err"
            else if elemento.className == "language-ok"
                elementoHtmlCodigoKan.className += " Fondo-alt-ok"

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
            router = useRouter()

            onMounted (=>
                actualizarElementosCode elem.value
                actualizarElementosA elem.value, router
            )

            {
                elem
            }


#
</script>

<style lang="sass">



    //
</style>
