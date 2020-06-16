<template lang="pug">
div#app
    div(v-if="mostrarBarra")
        barra-navegacion
        div#separador
    router-view

//
</template>

<script lang="coffee">
    import { computed, onMounted } from "vue"
    import { useStore } from "vuex"
    import { useRoute } from "vue-router"
    import BarraNavegacion from "./components/default/barra-navegacion"

    export default
        components: {BarraNavegacion}
        setup: =>
            { dispatch } = useStore()

            onMounted (->
                dispatch "variables/inicializarColor"
                dispatch "variables/inicializarListaVersiones"
            )

            {
                mostrarBarra: computed(=> useRoute().path != "/")
            }

    #
</script>

<style scoped lang="sass">

    #separador
        width: 100%
        height: 3.25rem

</style>
