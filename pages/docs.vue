<template lang="pug">
    div.docs
        div.contenedor-docs
            barra-lateral
            p Olol v:

</template>

<script lang="coffee">
    import barraLateral from "@/components/docs/barra-lateral.vue"

    export default
        name: "docs"
        components: { barraLateral }

</script>

<style scoped lang="sass">

    .docs
        position: fixed
        top: 0
        left: 0
        width: 100%
        height: calc(100% - 2.35rem)

    .contenedor-docs
        display: grid
        height: 100%
        grid-template-columns: 17.5rem auto
        grid-column-gap: 2rem



</style>
