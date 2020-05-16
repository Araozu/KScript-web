<template lang="pug">
    div.cont-primer-banner
        div
            div.frase
                p
                    | Kan es un lenguaje de programación funcional
                    br
                    | que se compila a JS.
            p 100% compatible con JS y TS existente.
        div
            codigo(:codigo="codigoExhibicion")

    //
</template>

<script lang="coffee">
    import codigo from "../codigo/codigo.vue"

    codigoExhibicion =
        """
        covar Respuesta =
            | Si
            | No

        fun preguntar pregunta =
            sea respuesta = prompt pregunta "si"
            si respuesta == "si" -> Si
            sino si respuesta == "no" -> No
            sino
                alert "Por favor, responde 'si' o 'no."
                preguntar pregunta

        preguntar "322?"
        """

    export default
        name: "primer-banner"
        components: { codigo }
        data: ->
            codigoExhibicion: codigoExhibicion

#
</script>

<style scoped lang="sass">

    .cont-primer-banner
        display: grid
        grid-template-columns: 49% 49%
        grid-column-gap: 2rem
        padding: 0 2.5%

    .frase
        p
            line-height: initial
            margin: 0
            font:
                family: Roboto, sans-serif
                weight: bold
                size: 2rem


    //
</style>
