<template lang="pug">
    div
        div.contenedor-img
            div.contenido-img-inicial
                h1
                    | Kei es un lenguaje de programación funcional
                    br
                    | que se compila a JS.

            div.transicion-img-inicial
            div.img-inicial

        nuxt-link(to="/docs/introduccion") Ir a la documentación.
        p Como puedes ver, la página (y el compilador) están en construcción.
        p Algún día estarán listos. O eso espero.
        primer-banner

    //
</template>

<script lang="coffee">
    import primerBanner from "../components/index/primer-banner.vue"

    export default
        name: "index"
        layout: "layout-inicio"
        components: { primerBanner }


#
</script>

<style scoped lang="sass">

    .contenedor-img
        position: relative
        height: 100vh


    .contenido-img-inicial
        top: 0
        left: 0
        height: 100vh
        width: 100%
        position: absolute
        z-index: 3
        color: white


    .transicion-img-inicial
        position: absolute
        bottom: 0
        left: 0
        height: 15vh
        width: 100%
        background-image: linear-gradient(rgba(0, 0, 0, 0), #151515)
        z-index: 4


    .img-inicial
        width: 100%
        height: 100vh
        background-size: cover
        background: url("../assets/img/misti1.webp") center
        position: absolute
        top: 0
        left: 0
        z-index: 1
        &::before
            background-color: rgba(0, 0, 0, 0.4)!important
            z-index: -1
            display: block
            position: absolute
            top: 0
            left: 0
            width: 100%
            height: 100%
            content: ""




    //
</style>
