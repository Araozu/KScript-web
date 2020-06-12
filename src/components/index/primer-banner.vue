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
        covar BST<T> =
            | Hoja
            | Nodo con (T, BST<T>, BST<T>)

        fun insertar arbol dato =
            cuando arbol es
            | Hoja -> Nodo (dato, Hoja, Hoja)
            | Nodo (valor, izq, der) ->
                si valor < dato
                    Nodo (dato, insertar izq dato, der)
                sino
                    Nodo (dato, izq, insertar der dato)
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
