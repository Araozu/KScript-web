<template lang="pug">
    div.barra-nav
        div.cont-img-logo
            img.img-logo(:src="rutaImg" alt="Logo")
        div.ruta-barra-nav
            nuxt-link(to="/") KAN
        div.ruta-barra-nav
            nuxt-link(to="/docs/") Documentación
        div.ruta-barra-nav
            nuxt-link(to="/api/") API
        div.ruta-barra-nav
            a(@click.prevent="cambiarColor") {{ textoModoColor }}

    //
</template>

<script lang="coffee">

    export default
        name: "barra-navegacion"
        computed:
            esClaro: -> @$store.state.variables.esClaro
            textoModoColor: -> if @esClaro then "claro" else "oscuro"
            rutaImg: -> "/img/kan_logo_#{ if @esClaro then 'oscuro' else 'claro' }.svg"
        methods:
            cambiarColor: ->
                @$store.commit "variables/cambiarColor", !@esClaro

#
</script>

<style scoped lang="sass">

    .barra-nav
        position: fixed
        top: 0
        left: 0
        width: 100%
        background-color: var(--fondo)
        color: var(--color)
        font-family: var(--fuenteNormal)
        padding-left: 3rem
        border-bottom: solid 1px var(--color-borde)

        .cont-img-logo
            position: absolute
            top: 0
            left: 0
            display: inline-table
            padding: 0.5rem

        .img-logo
            display: inline-block
            height: 2rem
            width: auto

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
