<template lang="pug">
div.barra-doc
    // div.cont-opcion-version
        span v0.0.13
    div.cont-opcion-version
        span Versión del lenguaje:
        select(v-model="versionDocs")
            option v0.0.13
            option next
    elemento-barra(v-for="(tema, i) in datos.temas"
        :key="i"
        :tema="tema"
        :ruta="'/' + datos.ruta + '/'"
        :padreActivo="true"
        :nivel="0"
        :fragmentosUrl="fragmentosUrl")


</template>

<script lang="coffee">
    import YAML from "yaml"
    import elementoBarra from "./elemento-barra.vue"
    import { ref, computed, onMounted, watchEffect, watch } from "vue"
    import { useRoute } from "vue-router"
    import { useStore } from "vuex"

    export default
        name: "barra-lateral"
        components: { elementoBarra }
        setup: =>
            store = useStore()
            route = useRoute()

            datos = ref {}
            versionDocs = ref "v0.0.13"

            watch versionDocs, (version) =>
                console.log version
                store.commit "variables/estVersionDocsActual", version

            versionDocsActual = computed (=> route.params.version)
            idiomaActual = computed (=> store.state.variables.idiomaActual)
            fragmentosUrl = computed (=>
                vDocs = route.params.version
                strRes = route.fullPath.substr (7 + vDocs.length)
                (strRes.split? "/") ? []
            )

            watchEffect (=>
                try
                    datosRaw = await fetch "/textos/#{ idiomaActual.value }/docs/#{ versionDocsActual.value }/indice.yaml"
                    datos.value = YAML.parse await datosRaw.text()
                catch e
                    console.error e
                    datos.value = {}
            )

            {
                datos
                versionDocs
                fragmentosUrl
                idiomaActual
                versionDocsActual
            }

#
</script>

<style scoped lang="sass">

    .barra-doc
        height: 100%
        overflow-y: auto
        border-right: solid 1px var(--color-borde)


    .cont-opcion-version
        padding: 0.75rem 0.5rem
        span
            display: inline-block
            padding-bottom: 0.5rem

    //
</style>
