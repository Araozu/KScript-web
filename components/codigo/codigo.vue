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
            lineas: -> @codigo.split "\n"

#
</script>

<style scoped lang="sass">

    .Fondo-alt
        background-color: var(--fondo)
        border: solid 1px var(--colorSecundario)



    .cont
        font-family: "Fira Code", monospace
        font-variant-ligatures: discretionary-ligatures
        border-radius: 3px
        padding: 15px 0
        cursor: text
        overflow-x: auto
        white-space: nowrap


    //
</style>
