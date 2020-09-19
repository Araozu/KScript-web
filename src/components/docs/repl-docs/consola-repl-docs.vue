<template lang="pug">
div.consola
    div.titulo-consola Consola
    div.contenido

//
</template>

<script>

    export default {
        name: "consola-repl-docs"
    }

</script>

<style scoped lang="sass">

    .consola
        height: 100%

    .titulo-consola
        border-bottom: solid 1px #4CAF50
        font-family: var(--fuenteTitulo)
        padding: 0.5rem

    .contenido
        padding: 0.5rem

    //
</style>
