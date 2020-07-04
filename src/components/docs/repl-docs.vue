<template lang="pug">
div.repl-docs
    textarea.entrada-kan.Fondo.TextoCod(placeholder="Código Kan" v-model="codigo")
    div.cont-botones
        button.boton-transpilar(@click="transpilar") Transpilar

    div.resultado-repl-docs
        div(v-if="resultado.ok" v-html="escapar(resultado.cod)")
        div.resultado-error(v-if="resultado.err" v-html="escapar(resultado.msg, false)")


//
</template>

<script lang="coffee">
    import { ref } from "vue"
    import { crearLexer } from "@/Compilador/AnalisisLexico/Gramatica.bs"
    import { parseTokens } from "@/Compilador/AnalisisSintactico/Parser.bs"
    import { generarJs } from "@/Compilador/Generador/Generador.bs"

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
                lexer = crearLexer codigo.value
                preExpresion = parseTokens lexer
                resultado.value =
                    switch preExpresion.tag
                        when 0
                            expresion = preExpresion[0]
                            {
                                ok: true
                                cod: (generarJs expresion, true, 0)[0]
                            }
                        when 1
                            err: true
                            msg: "Error Lexico:\n#{preExpresion[0]}"
                        when 2
                            err: true
                            msg: "Error Sintáctico:\n#{preExpresion[0]}"

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
