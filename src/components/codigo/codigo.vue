<template lang="pug">
div(ref="elem")
//
</template>

<script lang="coffee">
    import { ref, onMounted } from "vue"
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
