<template lang="pug">
    div.contenedor-titulo
        div.cont-logo
            div
                img.logo(src="@/assets/img/kan_logo.svg")
        h1.titulo Kan
        div.etiqueta
            div Funcional · Orientado a Objetos · Seguro


</template>

<script lang="coffee">

    export default
        name: "titulo"

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
        display: table
        width: 100%
        height: 100%
        text-align: center
        div
            display: table-cell
            vertical-align: middle


    .logo
        width: 5rem


    @media only screen and (max-width: 500px)
        .contenedor-titulo
            grid-template-columns: 3rem 5rem auto

        .titulo
            font-size: 2rem

        .etiqueta div
            font-size: 1.15rem
            text-align: center

        .logo
            width: 2rem


</style>
