<template lang="pug">
div#app
    div(v-if="mostrarBarra")
        barra-navegacion
    router-view

//
</template>

<script lang="coffee">
import {computed, onMounted} from "vue"
import {useStore} from "vuex"
import {useRoute} from "vue-router"
import BarraNavegacion from "./components/default/barra-navegacion"

export default
    components: {BarraNavegacion}
    setup: =>
        {dispatch} = useStore()

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
@import "src/sass/variables"

#separador
    width: 100%
    height: $tamano-barra-nav

</style>
