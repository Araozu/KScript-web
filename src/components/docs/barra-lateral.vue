<template lang="pug">
div.barra-doc
    div.cont-opcion-version
        span Versión del lenguaje:
        br
        select(v-model="versionDocs")
            option(v-for="(version, i) in versionesDisponibles" :key="i") {{ version }}

        div(v-if="!versionActualExiste")
            p No existe esta versión de la documentación, por favor escoge otra.

    elemento-barra(v-for="(tema, i) in datos.temas"
        :key="i"
        :tema="tema"
        :ruta="'/' + datos.ruta + '/'"
        :padreActivo="true"
        :nivel="0"
        :fragmentosUrl="fragmentosUrl")


//
</template>

<script lang="coffee">
import YAML from "yaml"
import elementoBarra from "./elemento-barra.vue"
import {ref, computed, onMounted, watchEffect, watch} from "vue"
import {useRoute, useRouter} from "vue-router"
import {useStore} from "vuex"

export default
    name: "barra-lateral"
    components: {elementoBarra}
    setup: =>
        store = useStore()
        route = useRoute()
        router = useRouter()

        datos = ref {}
        versionDocs = ref route.params.version

        watch versionDocs, (version) =>
            router.push "/docs/#{version}/"

        versionDocsActual = computed (=> route.params.version)
        idiomaActual = computed (=> store.state.variables.idiomaActual)
        fragmentosUrl = computed (=>
            vDocs = route.params.version
            strRes = route.fullPath.substr (7 + vDocs.length)
            (strRes.split? "/") ? []
        )
        versionesDisponibles = computed (=> store.state.variables.versiones)
        versionActualExiste = computed(=>
            !!(versionesDisponibles.value.find (x) => x == versionDocsActual.value)
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
            versionesDisponibles
            versionActualExiste
        }

#
</script>

<style scoped lang="sass">
@import "src/sass/variables"

.barra-doc
    height: calc(100vh - 2.8rem)
    overflow-y: auto
    border-right: solid 1px var(--color-borde)


.cont-opcion-version
    padding: 0.75rem 0.5rem

    span
        display: inline-block
        padding-bottom: 0.5rem

//
</style>
