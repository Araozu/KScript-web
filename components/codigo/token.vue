<template lang="pug">
    span.token(:class="token.tipo + adicional" v-html="escapar")
    //
</template>

<script lang="coffee">
    palabrasClave = ("sea mut rec si o sino cuando es en and or not por mientras " +
        "fun fn clase abierto abierta campo metodo de rasgo tipo objeto const let " +
        "if else return registro variante gestor cov met pub").split " "
    funcionesClave = "constructor get set log".split " "
    std = "Lista impr imprf console".split " "

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
                switch token.tipo.name
                    when "Identacion"
                        "&nbsp;&nbsp;&nbsp;&nbsp;"
                    when "Texto" then "\"#{token.res}\""
                    when "Identificador"
                        valor = token.res
                        modificador = ""
                        palabrasClave.forEach((x) -> modificador += if valor is x then "--palabraClave" else "")
                        funcionesClave.forEach((x) -> modificador += if valor is x then "--funcionClave" else "")
                        std.forEach((x) -> modificador += if valor is x then "--std" else "")
                        @adicional = modificador
                        valor
                    when "Comentario" then "//#{token.res}"
                    else token.res

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
