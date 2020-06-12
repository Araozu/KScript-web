<template lang="pug">
// div.linea.TextoCod(@mouseenter="selecLinea" @mouseleave="deselecLinea"
div.linea.LineaCodigo.TextoCod(:class="lineaSeleccionada? 'Seleccionado' : ''")
    template(v-if="linea === ''")
        br
    template(v-else)
        token(v-for="(token, i) in tokens"
            :token="token" :posicion="i" :key="i"
        )

//
</template>

<script lang="coffee">
    import { crearLexer } from "../../Compilador/AnalisisLexico/Gramatica.bs"
    import { tknToStr } from "../../Compilador/Inicio.bs"
    import token from "./token.vue"

    crearEspBlanco = (n) => Array(n + 1).join("&nbsp;")

    obtenerTokens = (entrada) =>
        lexer = crearLexer entrada
        tokens = []

        posActual = 0

        loop
            tokenn = lexer.sigToken()
            nombreTipoToken = tokenn.name

            if tokenn.tag == 0
                preToken = tokenn[0]
                ntoken = preToken[0]
                ntoken.tipo = tknToStr preToken

                if ntoken.inicio > posActual
                    tokens.push
                        valor: crearEspBlanco(ntoken.inicio - posActual)
                        tipo: "TEspBlanco"

                tokens.push ntoken
                posActual = ntoken.final

            else
                break

        tokens


    export default
        name: "linea"
        components:
            token: token
        data: ->
            nuevaLinea: "\n"
            lineaSeleccionada: false
        props:
            linea:
                type: String
                required: true
            pos:
                type: Number
                required: true
            numLineas:
                type: Number
                required: true
        computed:
            tokens: -> obtenerTokens @linea

#
</script>

<style scoped lang="sass">

    .TextoCod
        padding: 0 15px

    .linea
        white-space: pre


    @media only screen and (max-width: 450px)
        .linea
            line-height: 1rem

    //
</style>
