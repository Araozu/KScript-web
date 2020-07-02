<template lang="pug">
div
    div.contenedor-principal
        div.cont-logo-principal
            div.cont-logo
                img(src="/img/misti-logo-beta.svg")
            div.titulo
                h1 Misti
                // Arena ven a mi
                h2 Seguridad en tiempo de ejecución para el dinamismo de ES6.

                router-link.boton-principal(:to="rutaDocs" title="Documentación") Documentación
                a.boton-npm(href="https://www.npmjs.com/package/misti" target="_blank" title="Ir a npm") npm
                button.boton-color(@click="cambiarColor")
                    i.material-icons brightness_4

        h2 Con Misti, el JavaScript que escribes es...

        h3 Más funcional

        p.
            Usa estructuras funcionales en JavaScript, sin compromisos.

        codigo(:codigo="codCarac1")

        h3 Más conciso

        p.
            Programa más rápidamente, de una forma comprensible.

        codigo(:codigo="codCarac2")

        h3 Más dinámico

        p.
            Usa objetos libremente, sin tener que apegarte a un esquema.

        codigo(:codigo="codCarac3")

        h3 Más seguro

        p.
            Verifica tus tipos de datos, y brinda alternativas en caso de error.

        codigo(:codigo="codCarac4")


//
</template>

<script lang="coffee">
    import { computed } from "vue"
    import { useStore } from "vuex"
    import primerBanner from "../components/index/primer-banner.vue"
    import codigo from "../components/codigo/codigo.vue"

    codCarac1 = """
        covar MetodoPago =
            | GiftCard of number
            | Tarjeta of string
            | PayPal of string

        const metodoPago = GiftCard 10022
        """

    codCarac2 = """
        const carrito = [...]

        const total =
            carrito
            |> Array::map (verificarStock >> aplicarDescuento)
            |> Array::filter esValido
            |> Array::reduce obtenerPrecio
            |> aplicarImpuesto
        """

    codCarac3 = """
        fun articuloAStr articulo =
            "${articulo.id} -> ${articulo.nombre}"

        articuloAStr {
            id := 10433
            nombre := "Pan Bimbo 250g."
        }
        """

    codCarac4 = """
        fun articuloAStr {id, nombre} = Some "${id} -> ${nombre}"

        fun articuloAStr _ = None

        // No lanza una excepción
        articuloAStr {
            nombre := "Juan"
            apellido := "Perez"
        }
        """

    export default
        name: "Inicio"
        components: { primerBanner, codigo }
        setup: ->
            store = useStore()

            esClaro = computed (=>  store.state.variables.esClaro)
            versionesDocs = computed (=> store.state.variables.versiones)
            rutaDocs = computed (=>
                sigVer = versionesDocs.value.find (x) => x != "next"
                "/docs/#{ sigVer }/"
            )

            cambiarColor = => store.commit "variables/cambiarColor", !esClaro.value

            {
                rutaDocs
                cambiarColor
                codCarac1
                codCarac2
                codCarac3
                codCarac4
            }

#
</script>

<style scoped lang="sass">

    .contenedor-principal
        margin: 5rem auto
        width: 90%
        max-width: 1400px


    .cont-logo-principal
        display: grid
        grid-template-columns: 20% auto
        grid-column-gap: 5%

        .cont-logo
            text-align: right
            img
                width: 100%

        .titulo
            h1
                font-size: 3rem
            h2
                margin-top: 1.5rem
                margin-bottom: 3rem

    .boton-principal, .boton-npm, .boton-color
        display: inline-block
        font:
            family: var(--fuenteTitulo)
            size: 1.5rem
        text-decoration: none
        padding: 1rem 2rem
        border-radius: 3px
        margin-right: 2rem
        user-select: none
        cursor: pointer


    .boton-principal
        background-color: #F1D91D
        color: #151515


    .boton-npm
        background-color: #CB0000
        color: white


    .boton-color
        background-color: var(--color)
        color: var(--fondo)
        padding-top: 0.9rem
        padding-bottom: 0.9rem
        border: 0

        i
            vertical-align: bottom


    //
</style>
