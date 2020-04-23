<template lang="pug">
    // div.linea.TextoCod(@mouseenter="selecLinea" @mouseleave="deselecLinea"
    div.linea.TextoCod(:class="lineaSeleccionada? 'Seleccionado' : ''")
        template(v-if="linea === ''")
            br
        template(v-else)
            token(v-for="(token, i) in tokens"
                :token="token" :posicion="i" :key="i"
            )

    //
</template>

<script lang="coffee">
    import { Lexer, Lexer$$SigToken } from "@/Compilador/AnalisisLexico/Gramatica"
    import token from "./token.vue"

    crearEspBlanco = (n) => Array(n + 1).join("&nbsp;")


    obtenerTokens = (entrada) =>
        lexer = new Lexer entrada
        tokens = []

        posActual = 0

        loop
            tokenn = Lexer$$SigToken lexer
            nombreTipoToken = tokenn.name

            if tokenn.name is "Token"
                preToken = tokenn.fields[0]
                nombreTipoToken = preToken.name
                ntoken = preToken.fields[0]
                ntoken.tipo = nombreTipoToken

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
            tokens: []
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
        mounted: ->
            @tokens = obtenerTokens @linea



#
</script>

<style scoped lang="sass">

    .TextoCod
        padding: 0 15px

    @media only screen and (max-width: 450px)
        .linea
            line-height: 1rem

    //
</style>
