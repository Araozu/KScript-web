<template lang="pug">
div.inicio-docs
    div(v-if="versionActualExiste")
        h1 Bienvenido a la documentación de Misti

        p
            | Estás en la documentación de la versión
            b &nbsp;{{ version }}&nbsp;
            | de Misti.
            | Los temas y los detalles de esta versión se encuentran en el menú lateral.

        p Haz click en un tema para verlo.

    div(v-else)
        h1 404

        p Esta versión ({{ version }}) de la documentación no existe.
        p Selecciona una versión válida en el menú desplegable de la barra lateral.

//
</template>

<script lang="coffee">
    import { computed } from "vue"
    import { useRoute } from "vue-router"
    import { useStore } from "vuex"

    export default
        name: "index.vue"
        setup: =>
            route = useRoute()
            store = useStore()

            version = computed (=> route.params.version )
            versionesDisponibles = computed (=> store.state.variables.versiones )
            versionActualExiste = computed(=>
                !!(versionesDisponibles.value.find (x) => x == version.value)
            )

            {
                version
                versionActualExiste
            }

    #
</script>

<style scoped lang="sass">

    .inicio-docs
        margin: 0 auto
        width: 95%

    //
</style>