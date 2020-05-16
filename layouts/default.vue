<template>
    <div>
        <barraNavegacion/>
        <div id="separador"></div>
        <nuxt/>
    </div>
</template>

<script lang="coffee">
    import barraNavegacion from "@/components/default/barra-navegacion.vue"

    export default
        name: "default"
        components: { barraNavegacion }
        mounted: ->
            @$store.dispatch "variables/inicializarColor"


#
</script>

<style scoped lang="sass">

    #separador
        width: 100%
        height: 4rem

</style>
