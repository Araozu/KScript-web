<template lang="pug">
    div.doc
        div.opciones
            div.opcion(@click="cargaInicial")
                i.material-icons cached
                span  Regargar

        div(v-if="datos.cargando && datos.cargando === true")
            | Cargando...
        div(v-else-if="datos.error && datos.error === true")
            | Error al cargar el recurso. Razón: {{ datos.razon }}
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


    #: ['A] -> 'B -> (('A -> 'B) -> 'B)
    fold = (arr, state, fn) =>
        if arr.length is 0 then state
        else
            res = state
            for elem in arr
                res = fn elem, res

            res


    export default
        name: "docs-sub"
        components: { codigo, contenidoDocs }
        data: ->
            datos: {cargando: true}
            htmlPagina: ""
        computed:
            idiomaActual: -> @$store.state.variables.idiomaActual
            versionDocsActual: -> @$store.state.variables.versionDocsActual
        methods:
            obtenerFragmentos: (pathMatch) ->
                ((pathMatch?.split? "/") ? []).filter ((x) => x != "")

            obtenerRutaDoc: (fragmentos) ->
                inicio = "/textos/#{ @idiomaActual }/docs/#{ @versionDocsActual }"
                (fold fragmentos, inicio, (nuevo, acc) =>
                    acc + "/" + nuevo) + ".md"

            cargaInicial: ->
                @cargarDatos @$route.params?.pathMatch

            escaparHtml: (texto) -> DOMPurify.sanitize texto

            cargarDatos: (pathMatch) ->
                vm = this
                vm.datos = {cargando: true}
                fragmentos = @obtenerFragmentos pathMatch
                ruta = @obtenerRutaDoc fragmentos
                vm.datos =
                    try
                        resRaw = await fetch ruta
                        if resRaw.status == 200
                            html = marked (await resRaw.text())
                            @htmlPagina = @escaparHtml html
                            @datos = { cargando: false }
                        else
                            throw new Error("Archivo no encontrado.")
                    catch e
                        console.log e
                        error: true
                        razon: e.message

        beforeRouteUpdate: (to, from, next) ->
            @cargarDatos to.params?.pathMatch
            next()
        mounted: ->
            @cargaInicial()


</script>

<style lang="sass">

    .opcion
        display: inline-block
        cursor: pointer
        padding: 0.5rem
        user-select: none
        i, span
            font-size: 1rem
        &:hover
            background-color: var(--color-borde)


    .doc
        overflow-y: auto


    .contenido-tema-docs
        margin: 0 auto
        width: 95%


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
