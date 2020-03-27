<template lang="pug">
    div
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
        data: ->
            datos: {cargando: true}
        methods:
            obtenerFragmentos: (pathMatch) ->
                ((pathMatch?.split? "/") ? []).filter ((x) => x != "")

            obtenerRutaDoc: (fragmentos) ->
                (fold fragmentos, "/textos/es/docs", (nuevo, acc) =>
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

    .contenido-tema-docs
        margin: 0 auto
        width: 95%


    .titulo-tema-docs
        font:
            family: "Source Sans Pro", sans-serif
            size: 1.8rem
            weight: lighter
        border-left: solid 10px var(--colorSecundario)
        padding-left: 25px

    .subtema-tema-docs
        margin: 50px 0
        font:
            family: "Source Sans Pro", Arial, sans-serif
            size: 1.6rem
            weight: lighter
        border-left: solid 3px var(--colorSecundario)
        padding-left: 10px

    .pad-tema-docs
        padding-left: 17px

    @media only screen and (max-width: 450px)
        .subtema-tema-docs
            margin: 25px 0
            font-size: 1.4rem

    //
</style>
