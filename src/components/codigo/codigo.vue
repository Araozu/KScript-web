<template lang="pug">
div(ref="elem")
//
</template>

<script lang="coffee">
    import { ref, onMounted, computed, watch } from "vue"
    import { kanAHtml } from "./kanAHTML.coffee"

    export default
        name: "codigo"
        props:
            codigo:
                type: String
                required: true
            esBloque:
                type: Boolean
                default: true
        setup: (props, context) =>
            elem = ref null

            codigoRef = computed (=> props.codigo)

            compilar = (codigo) =>
                elemento = elem.value
                elementoCodigo = kanAHtml codigo, props.esBloque
                if elem.value && elem.value.firstChild
                    elem.value.removeChild elem.value.firstChild

                elemento.appendChild elementoCodigo

            watch codigoRef, compilar

            onMounted (=> compilar props.codigo)

            {
                elem
            }


#
</script>

<style scoped lang="sass">

    //
</style>
