<template lang="pug">
    div.barra-nav
        nuxt-link.link-logo-barra-nav(to="/")
            img.img-logo(:src="rutaImg" alt="Logo")

        ul.lista-links-barra-nav
            li.ruta-barra-nav
                nuxt-link(to="/") Misti
            li.ruta-barra-nav
                nuxt-link(to="/docs/") Documentación
            li.ruta-barra-nav
                nuxt-link(to="/api/") API
            li.ruta-barra-nav
                a(@click.prevent="cambiarColor") {{ textoModoColor }}

    //
</template>

<script lang="coffee">

    export default
        name: "barra-navegacion"
        computed:
            esClaro: -> @$store.state.variables.esClaro
            textoModoColor: -> if @esClaro then "claro" else "oscuro"
            rutaImg: -> "/img/logo-misti-lambda.svg"
        methods:
            cambiarColor: ->
                @$store.commit "variables/cambiarColor", !@esClaro

#
</script>

<style scoped lang="sass">

    .lista-links-barra-nav
        padding: 0
        margin: 0
        display: inline-block
        vertical-align: top
        li
            list-style-type: none
            padding: 0 0.15rem


    .barra-nav
        position: fixed
        top: 0
        left: 0
        width: 100%
        background-color: var(--fondo)
        color: var(--color)
        font-family: var(--fuenteNormal)
        border-bottom: solid 1px var(--color-borde)


    .img-logo
        margin-right: 1rem
        display: inline-block
        height: 2.5rem
        width: auto
        transform: translateX(0.5rem) translateY(0.5rem)


    .ruta-barra-nav
        display: inline-block
        text-align: center
        padding: 0 0.15rem

        a
            padding: 1rem 0.5rem
            display: inline-block
            color: var(--color)
            transition: background-color 50ms
            text-decoration: none
            cursor: pointer
            user-select: none
            &:hover
                text-decoration: underline


//
</style>
