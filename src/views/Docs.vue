<template lang="pug">
div.docs
    div.contenedor-docs
        div
            barra-lateral
        router-view
        repl-docs

//
</template>

<script lang="coffee">
    import barraLateral from "../components/docs/barra-lateral.vue"
    import replDocs from "../components/docs/repl-docs.vue"

    export default
        name: "Docs"
        components: { barraLateral, replDocs }

    #
</script>

<style scoped lang="sass">

    .docs
        position: fixed
        top: 3.3rem
        left: 0
        width: 100%
        height: calc(100% - 3.45rem)


    .contenedor-docs
        display: grid
        height: 100%
        grid-template-columns: 15% auto 30%

    @media only screen and (max-width: 1100px)
        .contenedor-docs
            grid-template-columns: 15% auto 40%

    @media only screen and (max-width: 800px)
        .contenedor-docs
            grid-template-columns: 15% auto 30%


    @media only screen and (max-width: 700px)
        .contenedor-docs
            grid-template-columns: 9rem auto 0

    //
</style>