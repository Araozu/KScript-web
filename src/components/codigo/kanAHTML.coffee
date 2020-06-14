import { crearLexer } from "../../Compilador/AnalisisLexico/Gramatica.bs"
import { tknToStr } from "../../Compilador/Inicio.bs"

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


export palabrasClave = ("let const rec if else match when is in for while " +
    "fun fn class method of trait type object as impl covar pub reg def type " +
    "member extends return new this break case catch class const continue debugger " +
    "default delete do else export extends finally for function if import in " +
    "instanceof new return super switch this throw try typeof var void while with yield " +
    "enum implements package public interface  private static protected await " +
    "abstract boolean byte char double final float goto int long native short " +
    "synchronized throws transient volatile").split " "
export funcionesClave = "constructor get set".split " "
export std = "Lista impr imprf console".split " "

verificar = (valor) =>
    for v in palabrasClave
        if valor == v then return "PalabraClave"

    for v in funcionesClave
        if valor == v then return "FuncionClave"

    false


#: Token -> (Txt, Txt)
export escaparToken = (token) ->
    switch token.tipo
        when "PC_LET", "PC_CONST"
            [token.valor, "PalabraClave"]
        when "Indentacion"
            ["&nbsp;&nbsp;&nbsp;&nbsp;", ""]
        when "TTexto"
            ["\"#{token.valor}\"", ""]
        when "TIdentificador"
            [token.valor, verificar token.valor]
        when "TOperador"
            claseAdicional =
                switch token.valor
                    when ".", ",", ";" then ""
                    else "TOperador_Color"
            [token.valor, claseAdicional]
        else
            [token.valor, ""]


crearHtmlToken = (token) =>
    contenedorToken = document.createElement "span"
    [htmlToken, claseAdicional] = escaparToken(token)
    contenedorToken.className = "token #{token.tipo} #{claseAdicional}"
    contenedorToken.innerHTML = htmlToken

    contenedorToken


crearHtmlLinea = (linea, esBloque) =>
    contenedorLinea = document.createElement "div"
    if esBloque
        contenedorLinea.className = "LineaCodigo TextoCod"

    if linea != ""
        tokens = obtenerTokens linea
        for token in tokens
            contenedorLinea.appendChild (crearHtmlToken token)
    else
        contenedorLinea.appendChild (document.createElement "br")

    contenedorLinea


#: Txt -> HTMLElement
export kanAHtml = (codigo, esBloque) =>
    lineas = codigo.split "\n"
    if lineas[lineas.length - 1] == ""
        lineas.pop()

    elemContenedor = document.createElement "div"
    elemContenedor.className = "#{if esBloque then 'cont' else 'cont-inline'} Fondo-alt"

    for linea in lineas
        elemContenedor.appendChild (crearHtmlLinea linea, esBloque)

    elemContenedor