<template lang="pug">
div.repl-docs
    textarea.entrada-kan.Fondo.TextoCod(placeholder="Código Misti" v-model="codigo")
    div.cont-botones
        button.boton-transpilar(@click="transpilar") Transpilar

    div.resultado-repl-docs
        div(v-if="resultado.ok" v-html="escapar(resultado.cod)")
        div.resultado-error(v-if="resultado.err" v-html="escapar(resultado.msg, false)")


//
</template>

<script lang="coffee">
    import { ref } from "vue"
    import { Lexer, parseTokens, crearCodeWithSourceMap } from "misti"

    reemplazarEspacios = (txt) =>
        letras = txt.split ""
        i = 0
        Array::join.call (
            Array::map.call letras, ((letra) =>
                if letra == " "
                    i++
                    if i == 1
                        ""
                    else if i == 2
                        "&nbsp;"
                    else
                        "&nbsp;"
                else
                    if i == 1
                        i = 0
                        " " + letra
                    else
                        i = 0
                        letra
            )
        ), ""

    escapar = (txt, esCodigo = true) ->
        s1 = txt.replace /\n/g, "<br>"
        if esCodigo
            s1.replace /\s\s+/g, "&nbsp;"
        else
            reemplazarEspacios s1

    export default
        name: "repl-docs"
        setup: ->
            codigo = ref ""
            resultado = ref {vacio: true}

            transpilar = =>
                lexer = new Lexer codigo.value
                preExpresion = parseTokens lexer
                resultado.value =
                    switch preExpresion.type
                        when "ExitoParser"
                            expresion = preExpresion.expr
                            strRes = (crearCodeWithSourceMap expresion, true, 0, null)[0].toString()
                            {
                                ok: true
                                cod: strRes
                            }
                        when "ErrorLexerP"
                            err: true
                            msg: "Error Lexico:\n#{preExpresion.err}"
                        when "ErrorParser"
                            err: true
                            msg: "Error Sintáctico:\n#{preExpresion.err}"

            {
                codigo
                resultado
                transpilar
                escapar
            }


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


    .resultado-error
        color: var(--color-borde-error)

    //
</style>
