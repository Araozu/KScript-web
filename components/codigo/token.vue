<template lang="pug">
    span.token(:class="token.tipo + adicional" v-html="escapar")
    //
</template>

<script lang="coffee">
    palabrasClave = ("sea mut rec si o sino cuando es en and or not por mientras " +
        "fun fn clase abierto abierta campo metodo de rasgo tipo objeto const let " +
        "if else return registro variante gestor covar met pub para reg").split " "
    funcionesClave = "constructor get set log".split " "
    std = "Lista impr imprf console".split " "

    verificar = (valor) =>
        for v in palabrasClave
            if valor == v then return true

        false

    export default
        name: "token"
        data: ->
            adicional: ""
        props:
            token:
                type: Object
                required: true
            posicion:
                type: Number
                required: true
        computed:
            escapar: ->
                token = @token
                switch token.tipo
                    when "PC_SEA", "PC_MUT"
                        token.tipo = "PalabraClave"
                        token.valor
                    when "Indentacion"
                        "&nbsp;&nbsp;&nbsp;&nbsp;"
                    when "TTexto" then "\"#{token.valor}\""
                    when "TIdentificador"
                        if verificar token.valor
                            token.tipo = "PalabraClave"
                        token.valor
                    when "TComentario" then "//#{token.valor}"
                    else token.valor

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
