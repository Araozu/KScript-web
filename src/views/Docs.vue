<template lang="pug">
div.docs
    div(:class="claseContenedorDocs")
        div
            div(v-show="!barraLateralOculta")
                barra-lateral
        router-view
        repl-docs

//
</template>

<script lang="coffee">
import {ref, computed, watch} from "vue"
import barraLateral from "../components/docs/barra-lateral.vue"
import replDocs from "../components/docs/repl-docs.vue"
import {useStore} from "vuex"

export default
    name: "Docs"
    components: {barraLateral, replDocs}
    setup: =>
        store = useStore()

        barraLateralOculta = ref false
        barraLateralOculta = computed => store.state.variables.barraLateralDocsOculta
        claseContenedorDocs = computed () =>
            if barraLateralOculta.value then "contenedor-docs-oculto"
            else "contenedor-docs"

        {
            claseContenedorDocs
            barraLateralOculta
        }

#
</script>

<style scoped lang="sass">
@import "src/sass/variables"

.docs
    position: fixed
    top: $tamano-barra-nav + 0.1rem
    left: 0
    width: 100%
    height: calc(100% - 2.8rem)


.contenedor-docs
    display: grid
    height: 100%
    grid-template-columns: 14rem auto 35%

@media only screen and (max-width: 1400px)
    .contenedor-docs
        grid-template-columns: 11rem auto 30%

@media only screen and (max-width: 1000px)
    .contenedor-docs
        grid-template-columns: 8rem auto 0

@media only screen and (max-width: 800px)
    .contenedor-docs
        grid-template-columns: 9rem auto 0


.contenedor-docs-oculto
    display: grid
    height: 100%
    grid-template-columns: 0 auto 55rem

@media only screen and (max-width: 1400px)
    .contenedor-docs-oculto
        grid-template-columns: 0 auto 40%

@media only screen and (max-width: 1000px)
    .contenedor-docs-oculto
        grid-template-columns: 0 auto 0

@media only screen and (max-width: 800px)
    .contenedor-docs-oculto
        grid-template-columns: 0 auto 0


//
</style>
