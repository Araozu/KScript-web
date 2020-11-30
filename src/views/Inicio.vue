<template lang="pug">
div
    div.contenedor-principal
        div.cont-logo-principal
            div.cont-logo
                img(src="/img/KScript_logo2.svg")
            div.titulo
                h1 KScript
                h2 JavaScript al estilo ML

                router-link.boton-principal(:to="rutaDocs" title="Documentación") Documentación
                a.boton-npm(href="https://www.npmjs.com/package/kscript" target="_blank" title="Ir a npm") npm
                button.boton-color(@click="cambiarColor")
                    i.material-icons brightness_4

        h2 Características

        h3 Sintáxis de ML

        p.
            La sintaxis contiene menos parentesis, comas, puntos y comas y llaves.
            Todo ello con el fin de que el código se más facil de comprender.
        p.
            Por ejemplo, el siguiente bloque de código crea un elemento div e imprime una alerta
            al hacerle click.

        codigo(:codigo="codigo1")

        p.
            Es basado en indentación, similar a Python. Sin embargo, se acerca más a lenguajes como
            F# u OCaml.

        h3 Expresiones

        p.
            Similar a otros lenguajes funcionales, en KScript todo es una expresión.
            Esto quiere decir que todas las estructuras se pueden usar en todos lados.

        p.
            Por ejemplo, si se quiere asignar un descuento de 7.5% si el valor de la compra supera
            los $200, o 5 en el caso contrario, en JavaScript, se haría lo siguiente:

        codigo.language-javascript(:codigo="codigo2")

        p.
            En KScript, los condicionales (y el resto de estructuras) son expresiones, por lo que
            se puede expresar esa misma lógica de forma segura y concisa.

        codigo(:codigo="codigo3")

        h3 Tipos de datos algebraicos

        p.
            KScript ofrece acceso a los tipos de datos algebraicos a JavaScript. Son una forma
            rápida, concisa y segura de definir tipos de datos.

        p.
            Si quisieramos modelar los tipos de heroes de un juego, haríamos:

        codigo(:codigo="codigo4")

        p.
            Y más adelante, se hace referencia a estos valores.

        codigo(:codigo="codigo5")

        h3 Contratos

        p.
            KScript permite validación de tipos de datos y valores en tiempo de ejecución opcional.
            Esto es posible gracias a pattern matching.

        p.
            Por ejemplo, la siguiente función para dividir requiere 2 parámetros, ambos de tipo
            number, y el último diferente de cero. Entonces, se definen esos requisitos en la función,
            como pre-condiciones.

        codigo(:codigo="codigo6")

        p.
            Si una llamada no satisface las condiciones en tiempo de ejecución, se lanza una excepción.<br>
            Se pueden usar otros tipos de datos, definir post-condiciones, incluso múltiples definiciones
            para manejar casos adicionales.

//
</template>

<script lang="coffee">
    import { computed } from "vue"
    import { useStore } from "vuex"
    import primerBanner from "../components/index/primer-banner.vue"
    import codigo from "../components/codigo/codigo.vue"

    codigo1 =
        """
        const div = document.createElement "div"

        div.addEventListener "click" #(
            $.preventDefault()
            alert "Hiciste click en el div."
        )
        """

    codigo2 =
        """
        let descuento;
        if (precio > 200) {
            descuento = 7.5;
        } else {
            descuento = 5;
        }
        """

    codigo3 =
        """
        const descuento =
            if precio > 200 do 7.5
            else 5
        """

    codigo4 =
        """
        covar TipoHeroe =
            | Fuerza
            | Agilidad
            | Inteligencia
        """

    codigo5 =
        """
        const heroeZeuz = {
            nombre "Zeuz"
            vida 750
            mana 500
            tipo Inteligencia
        }
        """

    codigo6 =
        """
        fun dividir
        | x: $ is number
        | y: $ is number && y != 0
        : $ is number && $ != NaN
        =
            x / y
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
                codigo1
                codigo2
                codigo3
                codigo4
                codigo5
                codigo6
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
        background-color: var(--colorSecundario)
        color: white


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
