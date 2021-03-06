<template lang="pug">
div.doc
    div.opciones
        div.opcion(@click="cambiarEstadoBarraLateral")
            i.material-icons {{barraLateralOculta? 'keyboard_arrow_right': 'keyboard_arrow_left' }}
            span {{barraLateralOculta? 'Mostrar': 'Ocultar' }}
        div.opcion(@click="cargaInicial")
            i.material-icons cached
            span  Recargar

    div.contenido-tema-docs(v-if="datos.cargando && datos.cargando === true")
        h3 Cargando la documentación...
    div.contenido-tema-docs(v-else-if="datos.error && datos.error === true")
        h3 Hubo un error al cargar el recurso. Razón: {{ datos.razon }}
    div.contenido-tema-docs(v-else)
        contenidoDocs(:mdhtml="htmlPagina")

//
</template>

<script lang="coffee">
import YAML from "yaml"
import DOMPurify from "dompurify"
import marked from "marked"
import codigo from "../../components/codigo/codigo.vue"
import contenidoDocs from "../../components/docs/contenido-docs.vue"
import {ref, computed, onMounted} from "vue"
import {useStore} from "vuex"
import {useRoute, onBeforeRouteUpdate} from "vue-router"


#: ['A] -> 'B -> (('A -> 'B) -> 'B)
fold = (arr, state, fn) =>
    if arr.length is 0 then state else
        res = state
        for elem in arr
            res = fn elem, res

        res

obtenerFragmentos = (pathMatch) ->
    ((pathMatch?.split? "/") ? []).filter ((x) => x != "")

escaparHtml = (texto) => DOMPurify.sanitize texto

obtenerRutaDoc = (fragmentos, idiomaActual) =>
    inicio = "/textos/#{ idiomaActual }/docs"
    (fold fragmentos, inicio, (nuevo, acc) =>
        acc + "/" + nuevo) + ".md"

export default
    name: "docs-sub"
    components: {codigo, contenidoDocs}
    setup: =>
        store = useStore()
        state = store.state
        route = useRoute()
        datos = ref({cargando: true})
        htmlPagina = ref("")
        barraLateralOculta = computed => state.variables.barraLateralDocsOculta

        idiomaActual = computed(=> state.variables.idiomaActual)

        cargarDatos = (pathMatch) =>
            datos.value = {cargando: true}
            fragmentos = obtenerFragmentos pathMatch
            ruta = obtenerRutaDoc fragmentos, idiomaActual.value
            datos.value =
                try
                    resRaw = await fetch ruta
                    if resRaw.status == 200
                        html = marked (await resRaw.text())
                        htmlPagina.value = escaparHtml html
                        datos.value = {cargando: false}
                    else
                        throw new Error("Archivo no encontrado.")
                catch e
                    console.log e
                    error: true
                    razon: e.message

        cargaInicial = =>
            cargarDatos route.fullPath.substr 6

        onMounted(cargaInicial)

        onBeforeRouteUpdate (to, from, next) =>
            cargarDatos to.fullPath.substr 6
            next()

        cambiarEstadoBarraLateral = () =>
            store.commit "variables/setBarraLateralDocsOculta", !barraLateralOculta.value

        {
            datos
            htmlPagina
            cargaInicial
            cambiarEstadoBarraLateral
            barraLateralOculta
        }

#
</script>

<style lang="sass">

.opcion
    display: inline-block
    cursor: pointer
    padding: 0.5rem
    user-select: none
    color: var(--color)
    z-index: 2

    i, span
        font-size: 1rem

    &:hover
        background-color: var(--colorSecundario)
        color: white


.opciones
    background-color: var(--fondo)
    position: sticky
    top: 0
    border-bottom: solid 3px var(--colorSecundario)
    font-family: var(--fuenteTitulo)
    z-index: 2

    .material-icons
        vertical-align: bottom
        font-size: 1.175rem


.doc
    overflow-y: auto


.contenido-tema-docs
    margin: 0 auto
    width: 90%


.titulo-tema-docs
    font:
        family: Roboto, sans-serif
        size: 1.75rem
        weight: 600


.subtema-tema-docs
    margin-top: 2.5rem
    margin-bottom: 1.5rem
    font:
        family: Roboto, sans-serif
        size: 1.5rem
        weight: 600
    line-height: 1.5


.pad-tema-docs
    padding-left: 0

@media only screen and (max-width: 450px)
    .subtema-tema-docs
        margin: 25px 0
        font-size: 1.4rem

//
</style>
