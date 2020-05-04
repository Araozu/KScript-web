<template>
  <div>
    <nuxt />
    <div id="separador"></div>
    <barraNavegacion />
  </div>
</template>

<script lang="coffee">
    import barraNavegacion from "@/components/default/barra-navegacion.vue"

    export default
        name: "default"
        components: { barraNavegacion}


#
</script>

<style scoped lang="sass">

    #separador
        width: 100%
        height: 3rem

</style>
