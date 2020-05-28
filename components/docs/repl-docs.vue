<template lang="pug">
    div.repl-docs
        textarea.entrada-kan.Fondo.TextoCod(placeholder="Código Kan" v-model="codigo")
        div.cont-botones
            button.boton-transpilar(@click="transpilar") Transpilar
        div.resultado-repl-docs(v-html="resultado === '' ? 'Codigo JS': escapar(resultado)")

    //
</template>

<script lang="coffee">
    import { crearLexer } from "@/Compilador/AnalisisLexico/Gramatica.bs"
    import { parseTokens } from "@/Compilador/AnalisisSintactico/Parser.bs"
    import { generarJs } from "@/Compilador/Generador/Generador.bs"

    export default
        name: "repl-docs"
        data: ->
            codigo: ""
            resultado: ""
        methods:
            transpilar: ->
                lexer = crearLexer @codigo
                preExpresion = parseTokens lexer
                if preExpresion.tag == 0
                    expresion = preExpresion[0]
                    @resultado = (generarJs expresion, true, 0)[0]
            escapar: (txt) ->
                s1 = txt.replace /\n/g, "<br>"
                s2 = s1.replace /\s/g, "&nbsp;"


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
