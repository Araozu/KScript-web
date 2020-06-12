<template lang="pug">
div
    // linea(v-for="(linea, i) in lineas"
    //     :key="i" :pos="i" :linea="linea" :numLineas="lineas.length"
    // )
//
</template>

<script lang="coffee">
    import linea from "./linea.vue"
    import { kanAHtml } from "./kanAHTML.coffee"

    export default
        name: "contenedor-codigo"
        components:
            linea: linea
        props:
            codigo:
                type: String
                required: true
            esBloque:
                type: Boolean
                default: true
        computed:
            lineas: ->
                fragmentos = @codigo.split "\n"
                if fragmentos[fragmentos.length - 1] == ""
                    fragmentos.pop()
                fragmentos
        mounted: ->
            elemento = @$el.nextElementSibling
            elementoCodigo = kanAHtml @codigo, @esBloque
            elemento.appendChild elementoCodigo


#
</script>

<style scoped lang="sass">

    //
</style>
