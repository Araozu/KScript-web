<template lang="pug">
nav.barra-nav2
    router-link.link-logo-barra-nav(to="/")
        img.img-logo(:src="'/img/KScript_logo_cuadrado_claro.svg'" alt="Logo")

    ul.links
        li.ruta-barra-nav.color-y
            router-link(:to="rutaDocs") Documentación
        li.ruta-barra-nav.color-r
            router-link(to="/api/") API
        li.ruta-barra-nav.color-m
            a(href="https://github.com/Araozu/kscript" target="_blank") GitHub
        li.ruta-barra-nav.color-t
            a(href="https://www.npmjs.com/package/kscript" target="_blank") npm
        li.ruta-barra-nav.color-a
            a(@click.prevent="cambiarColor") Tema {{ textoModoColor }}


//
</template>

<script lang="coffee">
import {ref, computed} from "vue"
import {useStore} from "vuex"

export default
    name: "barra-navegacion"
    setup: =>
        store = useStore()

        esClaro = computed (=>  store.state.variables.esClaro)
        rutaImg = computed(=>
            if esClaro.value == true then "/img/misti-logo-largo.svg" else "/img/misti-logo-largo_dark.svg")
        textoModoColor = computed (=> if esClaro.value then "claro" else "oscuro")
        versionesDocs = computed (=> store.state.variables.versiones)
        rutaDocs = computed (=>
            sigVer = versionesDocs.value.find (x) => x != "next"
            "/docs/#{ sigVer }/"
        )

        cambiarColor = => store.commit "variables/cambiarColor", !esClaro.value

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
@import "src/sass/variables"

.link-logo-barra-nav
    display: block
    float: left
    margin: 0 1rem
    overflow: hidden
    position: relative

.img-logo
    display: inline-block
    vertical-align: middle
    border-style: none
    max-width: 100%
    max-height: 100%
    height: $tamano-barra-nav

.links
    display: flex
    flex-wrap: wrap
    position: relative
    list-style: none
    align-items: center
    padding: 0
    margin-top: 0
    margin-bottom: 0

.barra-nav2
    display: flex
    background-color: var(--fondo)
    color: var(--color)
    font-family: var(--fuenteTitulo)
    border-bottom: solid 1px var(--color-borde)
    height: $tamano-barra-nav

$tamano-borde: 3px
.ruta-barra-nav
    display: inline-block
    text-align: center
    padding: 0 0.15rem
    border-bottom: solid $tamano-borde transparent

    a
        padding: ($tamano-barra-nav / 4) 0.5rem
        display: inline-block
        color: var(--color)
        transition: background-color 50ms
        text-decoration: none
        cursor: pointer
        user-select: none


.color-y:hover
    border-bottom: solid $tamano-borde var(--colorSecundario)

.color-r:hover
    border-bottom: solid $tamano-borde var(--color-r)

.color-m:hover
    border-bottom: solid $tamano-borde var(--color-m)

.color-t:hover
    border-bottom: solid $tamano-borde var(--color-t)

.color-a:hover
    border-bottom: solid $tamano-borde var(--color-a)


//
</style>
