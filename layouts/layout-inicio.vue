<template lang="pug">
    div.layout-inicio
        nuxt

    //
</template>

<script lang="coffee">

    export default
        name: "layout-inicio"
        mounted: ->
            @$store.dispatch "variables/inicializarColor"

#
</script>

<style scoped lang="sass">



    //
</style>
