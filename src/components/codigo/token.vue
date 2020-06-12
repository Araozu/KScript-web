<template lang="pug">
span.token(:class="token.tipo" v-html="escapar")
//
</template>

<script lang="coffee">
    import { palabrasClave, funcionesClave, std, escaparToken } from "./kanAHTML.coffee"

    verificar = (valor) =>
        for v in palabrasClave
            if valor == v then return true

        false

    export default
        name: "token"
        props:
            token:
                type: Object
                required: true
            posicion:
                type: Number
                required: true
        computed:
            escapar: ->
                [valor, claseAdicional] = escaparToken @token
                @token.tipo += " #{ claseAdicional }"
                valor

#
</script>

<style scoped lang="sass">

    .token
        font-size: var(--tamanoFuenteCodigo)


    @media only screen and (max-width: 450px)
        .token
            line-height: 1.2rem

    //
</style>
