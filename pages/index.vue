<template lang="pug">
    div
        div.contenedor-img
            div.contenido-img-inicial
                h1
                    | Misti es un lenguaje de programación funcional
                    br
                    | que se compila a JS.

            div.transicion-img-inicial
            div.img-inicial

        div.caracteristicas
            div.cont-motto
                h2.motto Menos ruido

            div.cont-caracteristica
                div.descricipcion-caracteristica
                    p La sintaxis es más limpia, permitiendo concentrarte en la lógica fácilmente.
                    p Es más facil trabajar cuando no tienes que descifrar el código.
                div.codigo-caracteristica
                    codigo(:codigo="codCarac1")

            div.cont-motto
                h2.motto Y más...  (muy pronto)

    //
</template>

<script lang="coffee">
    import primerBanner from "../components/index/primer-banner.vue"
    import codigo from "../components/codigo/codigo.vue"

    codCarac1 = """
        const carrito = [
            {
                nombre := "Pan"
                precio := 3
            }
            {
                nombre := "Arroz"
                precio := 10
            }
        ]

        const total = carrito.reduce (fn acc elem -> acc + elem.precio) 0
        """

    export default
        name: "index"
        layout: "layout-inicio"
        components: { primerBanner, codigo }
        data: -> {
            codCarac1
        }


#
</script>

<style scoped lang="sass">

    .cont-motto
        background-color: var(--colorSecundario)


    .motto
        margin: 0
        font:
            size: 2rem
            weight: normal
        color: white
        padding: 1rem 2.5%


    .cont-caracteristica
        padding: 1rem 2.5%
        display: grid
        grid-template-columns: 49% 49%
        grid-column-gap: 2%


    .contenedor-img
        position: relative
        height: 100vh


    .contenido-img-inicial
        top: 0
        left: 0
        height: 100vh
        width: 100%
        position: absolute
        z-index: 3
        color: white


    .transicion-img-inicial
        position: absolute
        bottom: 0
        left: 0
        height: 15vh
        width: 100%
        background-image: linear-gradient(rgba(0, 0, 0, 0), #151515)
        z-index: 4


    .img-inicial
        width: 100%
        height: 100vh
        background-size: cover
        background: url("../assets/img/misti1.webp") center
        position: absolute
        top: 0
        left: 0
        z-index: 1
        &::before
            background-color: rgba(0, 0, 0, 0.4)!important
            z-index: -1
            display: block
            position: absolute
            top: 0
            left: 0
            width: 100%
            height: 100%
            content: ""


    //
</style>
