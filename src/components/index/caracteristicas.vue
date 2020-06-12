<template lang="pug">
div.contenedor-demostracion
    demostracion(v-for="(obj, k) in datos" :key="k" :datos="obj")

//
</template>

<script lang="coffee">
    import demostracion from "./demostracion.vue"
    import datos from "./datos.yaml"

    export default
        name: "caracteristicas"
        components: { demostracion }
        data: ->
            datos: datos

#
</script>

<style scoped lang="sass">


    .contenedor-demostracion
        display: grid
        grid-template-columns: 32.6% 32.6% 32.6%
        grid-column-gap: 1%


    @media only screen and (max-width: 950px)
        .contenedor-demostracion
            grid-template-columns: 48% 48%
            grid-column-gap: 4%


    @media only screen and (max-width: 500px)
        .contenedor-demostracion
            grid-template-columns: 100%
            grid-column-gap: 0


    //
</style>
