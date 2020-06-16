<template lang="pug">
div.barra-nav
    router-link.link-logo-barra-nav(to="/")
        img.img-logo(:src="rutaImg" alt="Logo")

    ul.lista-links-barra-nav
        li.ruta-barra-nav
            router-link(to="/") Misti
        li.ruta-barra-nav
            router-link(:to="rutaDocs") Documentación
        li.ruta-barra-nav
            router-link(to="/api/") API
        li.ruta-barra-nav
            a(@click.prevent="cambiarColor") {{ textoModoColor }}

//
</template>

<script lang="coffee">
    import { ref, computed } from "vue"
    import { useStore } from "vuex"

    export default
        name: "barra-navegacion"
        setup: =>
            store = useStore()

            rutaImg = ref "/img/logo-misti-lambda.svg"
            esClaro = computed (=>  store.state.variables.esClaro)
            textoModoColor = computed (=> if esClaro.value then "claro" else "oscuro" )
            rutaDocs = computed (=>
                "/docs/#{ store.state.variables.versionDocsActual }/"
            )

            cambiarColor = =>
                store.commit "variables/cambiarColor", !esClaro.value

            {
                rutaImg
                esClaro
                textoModoColor
                rutaDocs
                cambiarColor
            }

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
        height: 3.25rem
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
