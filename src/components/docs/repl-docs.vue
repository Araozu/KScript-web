<template lang="pug">
div.repl-docs
    div.contenedor-editor
        editor(style="height: 100%" v-model:codigo="codigo")

    div.cont-botones(:class="claseBorde")
        button.boton-repl.boton-repl-verde.material-icons(title="Ejecutar" @click="compilar(true)") play_arrow
        button.boton-repl.boton-repl-rojo.material-icons(title="Compilar" @click="compilar()") build

    div.resultado-repl-docs
        consola-repl-docs(v-if="accionActual === 'ejecutar'" :codigoCompilado="resultado")

        js-compilado-repl-docs(v-if="accionActual === 'compilar'" :codigoCompilado="resultado")
        div.resultado-error(v-if="resultado.err" v-html="escapar(resultado.msg, false)")

//
</template>

<script lang="coffee">
import {ref, computed} from "vue"
import {Lexer, parseTokens, crearCodeWithSourceMap} from "kscript"
import editor from "@/components/Editor/editor"
import consolaReplDocs from "./repl-docs/consola-repl-docs.vue"
import JsCompiladoReplDocs from "@/components/docs/repl-docs/js-compilado-repl-docs"

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
    components: {JsCompiladoReplDocs, consolaReplDocs, editor}
    setup: ->
        accionActual = ref "ejecutar"
        codigo = ref "console.log \"Hola mundo!\"\n"
        resultado = ref {vacio: true}

        claseBorde = computed (=> "cont-botones-borde-#{accionActual.value}")

        compilar = (esEjecucion = false) =>
            accionActual.value = if esEjecucion then "ejecutar" else "compilar"
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
            accionActual
            codigo
            resultado
            claseBorde
            compilar
            escapar
        }


#
</script>

<style scoped lang="sass">

.repl-docs
    border-left: solid 1px var(--color-borde)

.contenedor-editor
    height: calc(50% - 1.5rem)

.boton-repl
    height: 100%
    width: 5rem
    padding: 0
    cursor: pointer
    font-size: 150%
    background-color: transparent
    border: none
    transition: background-color 100ms, color 100ms

    &:hover
        color: white


.boton-repl-verde
    color: var(--color-a)

    &:hover
        background-color: var(--color-a)

.boton-repl-rojo
    color: var(--colorSecundario)

    &:hover
        background-color: var(--colorSecundario)


.resultado-repl-docs
    box-sizing: border-box


.cont-botones
    height: 2.8rem
    border-top: solid 0.2rem var(--colorSecundario)
    border-bottom: solid 0.2rem var(--colorSecundario)


.cont-botones-borde-ejecutar
    border-color: var(--color-a)

.cont-botones-borde-compilar
    border-color: var(--colorSecundario)


.resultado-repl-docs
    width: 100%
    height: calc(50% - 1.5rem)


.resultado-error
    color: var(--color-borde-error)

//
</style>
