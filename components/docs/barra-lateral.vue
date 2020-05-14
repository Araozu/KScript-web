<template lang="pug">
    div.barra-doc
        div.cont-opcion-version
            span Versión&nbsp;&nbsp;
            select.opcion-version
                option {{ $store.state.variables.versionDocsActual }}
        elemento-barra(v-for="(tema, i) in datos.temas"
            :key="i"
            :tema="tema"
            :ruta="'/' + datos.ruta + '/'"
            :padreActivo="true"
            :nivel="0"
            :fragmentosUrl="fragmentosUrl")


</template>

<script lang="coffee">
    import YAML from "yaml"
    import elementoBarra from "./elemento-barra.vue"

    export default
        name: "barra-lateral"
        components: { elementoBarra }
        data: ->
            datos: {}
        computed:
            fragmentosUrl: -> (@$route.params?.pathMatch?.split? "/") ? []
            idiomaActual: -> @$store.state.variables.idiomaActual
            versionDocsActual: -> @$store.state.variables.versionDocsActual
        mounted: ->
            datosRaw = await fetch "/textos/#{ @idiomaActual }/docs/#{ @versionDocsActual }/indice.yaml"
            @datos = YAML.parse await datosRaw.text()


</script>

<style scoped lang="sass">

    .barra-doc
        height: 100%
        overflow-y: auto
        width: 17.5rem


    .cont-opcion-version
        padding: 0.75rem 0.5rem


    @media only screen and (max-width: 1600px)
        .barra-doc
            width: 13.5rem


    @media only screen and (max-width: 1100px)
        .barra-doc
            width: 10rem


    @media only screen and (max-width: 800px)
        .barra-doc
            width: 7.5rem


    @media only screen and (max-width: 700px)
        .barra-doc
            width: 9rem

    //
</style>
