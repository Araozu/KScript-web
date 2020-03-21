<template lang="pug">
    div
        div.contenedor-titulo
            div.cont-logo
                img.logo(src="@/assets/img/kan_logo.svg")
            h1.titulo Kan
            div.etiqueta
                div Funcional · Orientado a Objetos · Identado


    //
</template>

<script lang="coffee">

    export default
        name: "index"


#
</script>

<style scoped lang="sass">

    .contenedor-titulo
        display: grid
        grid-template-columns: 7rem 9rem auto
        font-family: var(--fuenteTitulo)


    .etiqueta
        display: table
        text-align: center
        width: 100%
        height: 100%
        div
            display: table-cell
            vertical-align: middle
            text-align: left
            font-size: 1.5rem



    .titulo
        text-align: center
        font:
            weight: normal
            size: 2.5rem


    .cont-logo
        text-align: center


    .logo
        width: 5rem


    //
</style>
