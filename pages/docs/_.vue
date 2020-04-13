<template lang="pug">
    div.doc
        div(v-if="datos.cargando && datos.cargando === true")
            | Cargando...
        div(v-else-if="datos.error && datos.error === true")
            | Error al cargar el recurso. Razón: {{ datos.razon }}
        div.contenido-tema-docs(v-else)
            h2.titulo-tema-docs {{ datos.titulo }}
            br
            template(v-for="frag in datos.txt")
                codigo.cod(v-if="frag.substring(0,1) === '$'" :codigo="frag.substr(2)")
                div.txt(v-else v-html="frag")
            div(v-for="tema in datos.subtemas")
                h3.subtema-tema-docs {{ tema.titulo }}
                div.pad-tema-docs
                    textos(v-for="(frag, i) in tema.txt" :txt="frag" :key="i")


</template>

<script lang="coffee">
    import YAML from "yaml"
    import codigo from "../../components/codigo/codigo.vue"
    import textos from "../../components/textos.vue"

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
        components: { codigo, textos }
        data: ->
            datos: {cargando: true}
        computed:
            idiomaActual: -> @$store.state.variables.idiomaActual
            versionDocsActual: -> @$store.state.variables.versionDocsActual
        methods:
            obtenerFragmentos: (pathMatch) ->
                ((pathMatch?.split? "/") ? []).filter ((x) => x != "")

            obtenerRutaDoc: (fragmentos) ->
                inicio = "/textos/#{ @idiomaActual }/docs/#{ @versionDocsActual }"
                (fold fragmentos, inicio, (nuevo, acc) =>
                    acc + "/" + nuevo) + ".yaml"

            cargaInicial: ->
                @cargarDatos @$route.params?.pathMatch

            cargarDatos: (pathMatch) ->
                vm = this
                vm.datos = {cargando: true}
                fragmentos = @obtenerFragmentos pathMatch
                ruta = @obtenerRutaDoc fragmentos
                vm.datos =
                    try
                        resRaw = await fetch ruta
                        if resRaw.status == 200
                            YAML.parse (await resRaw.text())
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
