<template lang="pug">
    div.elemento-barra
        div.elemento
            nuxt-link(:to="rutaActual") {{ tema.titulo }}
        div.inner(v-if="tema.temas")
            elemento-barra(v-for="(subtema, i) in tema.temas"
                :key="i"
                :tema="subtema"
                :ruta="ruta + tema.ruta + '/'")

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
        computed:
            rutaActual: -> @ruta + @tema.ruta + "/"


</script>

<style scoped lang="sass">

    .inner
        padding-left: 1rem


    .elemento
        margin: 0.75rem 0.5rem
        a
            text-decoration: none
            color: var(--color)


</style>
