<template lang="pug">
    div
        titulo
        primer-banner

        // caracteristicas

    //
</template>

<script lang="coffee">
    import titulo from "@/components/index/titulo.vue"
    import caracteristicas from "@/components/index/caracteristicas.vue"
    import primerBanner from "../components/index/primer-banner.vue"

    export default
        name: "index"
        components: { titulo, caracteristicas, primerBanner }
        mounted: ->
            @$store.dispatch "variables/inicializarColor"


#
</script>

<style scoped lang="sass">



    //
</style>
