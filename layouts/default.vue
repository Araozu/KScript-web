<template>
  <div>
    <nuxt />
    <div id="separador"></div>
    <barraNavegacion />
  </div>
</template>

<script lang="coffee">
    import barraNavegacion from "@/components/default/barra-navegacion.vue"
    import { colores } from "@/components/colores.coffee"

    export default
        name: "default"
        components: { barraNavegacion}
        created: ->
            colores.DraculaDarker()


#
</script>

<style scoped lang="sass">

    #separador
        width: 100%
        height: 3rem

</style>
