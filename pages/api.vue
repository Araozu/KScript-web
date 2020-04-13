<template lang="pug">
    div
        p API en construcción. Este es un ejemplo:
        h1 Math
        code JS.Math
        p Contiene constantes y funciones matemáticas.
        codigo(codigo="reg Math =")
        h2 Propiedades
        table.tabla-api
            tbody
                tr
                    td E
                    td Constante de Euler
                tr
                    td LN2
                    td Logaritmo natural de 2
                tr
                    td PI
                    td Ratio de la circunferencia y diametro de un circulo

        h2 Métodos
        table.tabla-api
            tbody
                tr
                    td
                        code abs: Num -> Num
                    td Devuelve el valor absoluto de un número.
                tr
                    td
                        code pow: (x: Num) -> (y: Num) -> Num
                    td Devuelve x elevado a la potencia y.
                tr
                    td
                        code (|>): (valor: 'A) -> (funcion: 'A -> 'B) -> 'B
                    td Aplica una función.

    //
</template>

<script lang="coffee">
    import codigo from "@/components/codigo/codigo.vue"

    export default
        name: "api"
        components: { codigo }

#
</script>

<style scoped lang="sass">

    .tabla-api
        width: 100%
        border-spacing: 0
        td
            border-top: solid 1px #454545
            padding: 1rem 0


    //
</style>
