<template lang="pug">
div(ref="elem")
    // linea(v-for="(linea, i) in lineas"
    //     :key="i" :pos="i" :linea="linea" :numLineas="lineas.length"
    // )
//
</template>

<script lang="coffee">
    import { ref, onMounted } from "vue"
    import linea from "./linea.vue"
    import { kanAHtml } from "./kanAHTML.coffee"

    export default
        name: "contenedor-codigo"
        components:
            linea: linea
        props:
            codigo:
                type: String
                required: true
            esBloque:
                type: Boolean
                default: true
        setup: (props, context) =>
            elem = ref(null)

            onMounted (=>
                elemento = elem.value
                elementoCodigo = kanAHtml props.codigo, props.esBloque
                elemento.appendChild elementoCodigo
            )

            {
                elem
            }


#
</script>

<style scoped lang="sass">

    //
</style>
