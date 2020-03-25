<template lang="pug">
    div.barra-doc
        elemento-barra(v-for="(tema, i) in datos.temas"
            :key="i"
            :tema="tema"
            :ruta="'/' + datos.ruta + '/'")


</template>

<script lang="coffee">
    import YAML from "yaml"
    import elementoBarra from "./elemento-barra.vue"

    export default
        name: "barra-lateral"
        components: { elementoBarra }
        data: ->
            datos: {}
        created: ->
            datosRaw = await fetch "/textos/indice.yaml"
            @datos = YAML.parse await datosRaw.text()


</script>

<style scoped lang="sass">

    .barra-doc
        border-right: solid 1px var(--colorSecundario)
        height: 100%
        overflow-y: auto


</style>
