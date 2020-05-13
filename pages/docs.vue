<template lang="pug">
    div.docs
        div.contenedor-docs
            barra-lateral
            nuxt-child
            repl-docs

    //
</template>

<script lang="coffee">
    import barraLateral from "@/components/docs/barra-lateral.vue"
    import replDocs from "@/components/docs/repl-docs.vue"

    export default
        name: "docs"
        components: { barraLateral, replDocs }

#
</script>

<style scoped lang="sass">

    .docs
        position: fixed
        top: 3.25rem
        left: 0
        width: 100%
        height: calc(100% - 3.2rem)

    .contenedor-docs
        display: grid
        height: 100%
        grid-template-columns: 17.5rem auto 37.5rem


</style>
