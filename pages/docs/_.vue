<template lang="pug">
    div
        div(v-if="datos.cargando && datos.cargando === true")
            | Cargando...
        div(v-else-if="datos.error && datos.error === true")
            | Error al cargar el recurso. Razón: {{ datos.razon }}
        div(v-else)
            | Aun nos falta procesar el archivo :'D


</template>

<script lang="coffee">
    import YAML from "yaml"

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

</style>
