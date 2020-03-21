<template lang="pug">
    // div.linea.TextoCod(@mouseenter="selecLinea" @mouseleave="deselecLinea"
    div.linea.TextoCod(:class="lineaSeleccionada? 'Seleccionado' : ''")
        token(v-for="(token, i) in tokens"
            :token="token" :posicion="i" :key="i"
        )

    //
</template>

<script lang="coffee">
    import { generarParser } from "@/Compilador/AnalisisLexico/Gramatica.fs"
    import token from "./token.vue"

    crearEspBlanco = (n) => Array(n + 1).join("&nbsp;")


    obtenerTokens = (entrada) =>
        generador = generarParser entrada
        tokens = []

        posActual = 0

        loop
            tokenn = generador()
            if tokenn.name is "Exito"
                ntoken = tokenn.fields[0]

                if ntoken.posInicio > posActual
                    tokens.push
                        res: crearEspBlanco(ntoken.posInicio - posActual)
                        tipo: "EspBlanco"

                tokens.push ntoken
                posActual = ntoken.posFinal

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
        created: ->
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
