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

            div.cont-motto(style="background-color: #3F51B5;")
                h2.motto Funcional

            div.cont-caracteristica
                div.descripcion-caracteristica
                    p.
                        Tienes acceso a estructuras funcionales, las cuales le dan capacidades nuevas a
                        JavaScript, de forma transparente y retro compatible.
                div.codigo-caracteristica
                    codigo(:codigo="codCarac2")

            div.cont-motto(style="background-color: #673AB7;")
                h2.motto Rasgos

            div.cont-caracteristica
                div.descripcion-caracteristica
                    p Implementa funcionalidad en común sin crear jerarquias enormes.
                    p Los rasgos permiten la re-utilización de código de forma fácil, rápida, y sobre todo, plana.
                div.codigo-caracteristica
                    codigo(:codigo="codCarac3")

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

    codCarac2 = """
        reg DetalleTarjeta = {
            titular: string
            numero: number
            ccv: number
        }

        covar MetodoDePago =
            | Efectivo
            | Tarjeta of DetalleTarjeta
            | PayPal of string
            | TarjetaDeRegalo of string
            | PagoEfectivo of string
        """


    codCarac3 = """
        trait Comparable for T =
            def (==): T -> T -> boolean
            def (!=): T -> T -> boolean

        impl Comparable for DetalleTarjeta =
            fun (==) dt1 dt2 =
                dt1.titular == dt2.titular
                && dt1.numero == dt2.numero
                && dt1.ccv == dr2.ccv

            fun (!=) dt1 dt2 = !dt1 == dt2
        """

    export default
        name: "index"
        layout: "layout-inicio"
        components: { primerBanner, codigo }
        data: -> {
            codCarac1
            codCarac2
            codCarac3
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
