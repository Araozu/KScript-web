import { crearLexer } from "@/Compilador/AnalisisLexico/Gramatica.bs"
import { tknToStr } from "@/Compilador/Inicio.bs"

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


palabrasClave = ("sea mut rec si o sino cuando es en and or not por mientras " +
    "fun fn clase abierto abierta campo metodo de rasgo tipo objeto const let " +
    "if else return registro variante gestor covar met pub para reg").split " "
funcionesClave = "constructor get set log".split " "
std = "Lista impr imprf console".split " "

verificar = (valor) =>
    for v in palabrasClave
        if valor == v then return true

    false


#: Token -> (Txt, Txt)
escaparToken = (token) ->
    switch token.tipo
        when "PC_SEA", "PC_MUT"
            [token.valor, "PalabraClave"]
        when "Indentacion"
            ["&nbsp;&nbsp;&nbsp;&nbsp;", ""]
        when "TTexto"
            ["\"#{token.valor}\"", ""]
        when "TIdentificador"
            tipo = if verificar token.valor then token.tipo = "PalabraClave" else ""
            [token.valor, tipo]
        when "TComentario"
            ["//#{token.valor}", ""]
        else
            [token.valor, ""]


crearHtmlToken = (token) =>
    contenedorToken = document.createElement "span"
    [htmlToken, claseAdicional] = escaparToken(token)
    contenedorToken.className = "#{token.tipo} #{claseAdicional}"
    contenedorToken.innerHTML = htmlToken

    contenedorToken


crearHtmlLinea = (linea, esBloque) =>
    contenedorLinea = document.createElement "div"
    if esBloque
        contenedorLinea.className = "TextoCod"

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
