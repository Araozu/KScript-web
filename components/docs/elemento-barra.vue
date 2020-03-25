<template lang="pug">
    div.elemento-barra
        div.elemento(:class="clases")
            nuxt-link(:to="rutaActual")
                | {{ tema.titulo }}
        div.inner(v-if="tema.temas")
            elemento-barra(v-for="(subtema, i) in tema.temas"
                :key="i"
                :tema="subtema"
                :ruta="ruta + tema.ruta + '/'"
                :padreActivo="esRutaActiva"
                :nivel="nivel + 1"
                :fragmentosUrl="fragmentosUrl")

</template>

<script lang="coffee">

    export default
        name: "elemento-barra"
        props:
            tema:
                type: Object
                required: true
            ruta:
                type: String
                required: true
            padreActivo:
                type: Boolean
                required: true
            nivel:
                type: Number
                required: true
            fragmentosUrl:
                type: Array
                required: true
        computed:
            rutaActual: -> @ruta + @tema.ruta + "/"
            esRutaActiva: ->
                if @padreActivo
                    rutaActual = @fragmentosUrl[@nivel] ? ""
                    (rutaActual isnt "") and (@tema.ruta is rutaActual)
                else false
            clases: ->
                if @esRutaActiva then["elemento-activo-barra-docs"]
                else []




</script>

<style scoped lang="sass">

    .inner
        padding-left: 1rem


    .elemento
        margin: 0.75rem 0.5rem
        a
            text-decoration: none
            color: var(--color)

    .elemento-activo-barra-docs
        a
            color: var(--colorSecundario) !important
            font-weight: bold

</style>
