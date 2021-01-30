import { KLexer as Lexer } from "kscript"

crearEspBlanco = (n) => Array(n + 1).join("&nbsp;")

export obtenerTokens = (entrada) =>
    lexer = new Lexer entrada
    tokens = []

    posActual = 0

    loop
        tokenn = lexer.sigToken()

        if tokenn.type == "TokenLexer"
            ntoken = tokenn.token.token
            ntoken.tipo = tokenn.token.type

            if ntoken.inicio > posActual
                tokens.push
                    valor: crearEspBlanco(ntoken.inicio - posActual)
                    tipo: "TEspBlanco"

            tokens.push ntoken
            posActual = ntoken.final

        else
            break

    tokens


export palabrasClave = ("let const rec if elif else match when is in for while " +
    "fun fn class method of trait type object as impl covar pub reg def type " +
    "member extends return new this break case catch class const continue debugger " +
    "default delete do else export extends finally for function if import in " +
    "instanceof new return super switch this throw try typeof var void while with yield " +
    "enum implements package public interface  private static protected await " +
    "abstract boolean byte char double final float goto int long native short " +
    "synchronized throws transient volatile from where init struct union").split " "
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
    if token.tipo.substring(0, 2) == "PC"
        return [token.valor, "PalabraClave"]

    switch token.tipo
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

    elemContenedor = document.createElement "div"
    elemContenedor.className = "#{if esBloque then 'cont' else 'cont-inline'} Fondo-alt"

    contNumLinea = document.createElement "div"
    contLineas = document.createElement "div"

    for linea, numLinea in lineas
        if esBloque
            indicadorNumLinea = document.createElement "div"
            indicadorNumLinea.innerText = numLinea + 1
            indicadorNumLinea.className = "num-linea"
            contNumLinea.appendChild indicadorNumLinea

        contLineas.appendChild (crearHtmlLinea linea, esBloque)

    if esBloque
        contNumLinea.className = "cont-num-linea"
        contLineas.className = "cont-lineas"
        # Eliminar el numero de lineas
        # elemContenedor.appendChild contNumLinea

    if lineas.length < 10
        elemContenedor.className += " cont-ancho-lineas-1"
    else if lineas.length < 100
        elemContenedor.className += " cont-ancho-lineas-10"
    else
        elemContenedor.className += " cont-ancho-lineas-100"

    elemContenedor.appendChild contLineas

    elemContenedor
