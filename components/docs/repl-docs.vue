<template lang="pug">
    div.repl-docs
        textarea.entrada-kan.Fondo.TextoCod(placeholder="Código Kan" v-model="codigo")
        div.cont-botones
            button.boton-transpilar(@click="transpilar") Transpilar
        div.resultado-repl-docs {{ resultado === '' ? 'Codigo JS': resultado }}

    //
</template>

<script lang="coffee">
    import { Lexer, Lexer$$SigToken } from "@/Compilador/AnalisisLexico/Gramatica"
    import { parseTokens } from "@/Compilador/AnalisisSintactico/Parser"
    import { generarJs } from "@/Compilador/Generacion/Generador"

    export default
        name: "repl-docs"
        data: ->
            codigo: ""
            resultado: ""
        methods:
            transpilar: ->
                lexer = new Lexer @codigo
                expresion = parseTokens lexer
                @resultado = generarJs expresion, true, 0


#
</script>

<style scoped  lang="sass">

    .entrada-kan, .resultado-repl-docs
        padding: 0.5rem
        box-sizing: border-box


    .entrada-kan
        resize: none
        font:
            family: "JetBrains Mono", monospace
            size: 0.85rem
        width: 100%
        height: 50%


    .cont-botones
        text-align: center


    .boton-transpilar
        font-size: 1rem
        padding: 0.25rem 0.5rem


    .resultado-repl-docs
        font:
            family: "JetBrains Mono", monospace
            size: 0.85rem
        width: 100%
        height: calc(50% - 1.5rem)


    //
</style>
