<template lang="pug">
    div.cont.Fondo-alt
        linea(v-for="(linea, i) in lineas"
            :key="i" :pos="i" :linea="linea" :numLineas="lineas.length"
        )
    //
</template>

<script lang="coffee">
    import linea from "./linea.vue"

    export default
        name: "contenedor-codigo"
        components:
            linea: linea
        props:
            codigo:
                type: String
                required: true
        computed:
            lineas: ->
                fragmentos = @codigo.split "\n"
                if fragmentos[fragmentos.length - 1] == ""
                    fragmentos.pop()
                fragmentos

#
</script>

<style scoped lang="sass">

    .Fondo-alt
        background-color: var(--color-cod-fondo)
        color: var(--color-cod)
        border: solid 1px var(--color-borde)


    .cont
        font:
            family: "JetBrains Mono", monospace
            variant-ligatures: discretionary-ligatures
            weight: 500
        padding: 15px 0
        cursor: text
        overflow-x: auto
        white-space: nowrap


    //
</style>
