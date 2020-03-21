aplicadorDeColor = (nombre, estilo) -> () ->
    if process.client
        elemTemp = document.getElementById "estilos"
        unless elemTemp?
            elemTemp = document.createElement "style"
            elemTemp.id = "estilos"
            document.head.appendChild elemTemp

        elemTemp.innerHTML = estilo
        nombre

palenightColor = """
.Texto {
    color: #c3e887
}
.Numero {
    color: #ffcb6b
}
.Identificador--palabraClave {
    color: #c792ea
}
.Identificador--funcionClave {
    color: #82aaff
}
.Identificador--std {
    color: #ffea7d
}
.Comentario {
    color: #676e95
}
.Fondo {
    background-color: #292d3e
}
.TextoCod {
    color: #d7d7d7
}
.IdentificadorTipo {
    color: #85e9ff
}
"""


atomOneDark = """
.Texto {
    color: #6db369
}
.Numero {
    color: #d19a66
}
.Identificador--palabraClave {
    color: #c679dd
}
.Identificador--funcionClave {
    color: #61aeef
}
.Identificador--std {
    color: #ffe968
}
.Comentario {
    color: #59626f
}
.Fondo {
    background-color: #282c34
}
.TextoCod {
    color: #d7d7d7
}
.IdentificadorTipo {
    color: #85e9ff
}
""" # Comentario

blackboard = """
.Texto {
    color: #61ce3c
}
.Numero {
    color: #d8fa3c
}
.Identificador--palabraClave {
    color: #fbde2d
}
.Identificador--funcionClave {
    color: #ff6400
}
.Identificador--std {
    color: #6897bb
}
.Comentario {
    color: #aeaeae
}
.Fondo {
    background-color: #0c1021
}
.TextoCod {
    color: #d7d7d7
}
.IdentificadorTipo {
    color: #85e9ff
}
""" # Comentario

dracula = """
.Texto {
    color: #f1fa8c
}
.Numero {
    color: #bd93f9
}
.Identificador--palabraClave {
    color: #ff79c6
}
.Identificador--funcionClave {
    color: #50fa7b
}
.Identificador--std {
    color: #bd93f9
}
.Comentario {
    color: #6272a4
}
.Fondo {
    background-color: #282a36
}
.TextoCod {
    color: #d7d7d7
}
.IdentificadorTipo {
    color: #85e9ff
}
""" #

draculaDarker = """
.Texto {
    color: #f1fa8c
}
.Numero {
    color: #bd93f9
}
.Identificador--palabraClave {
    color: #ff79c6
}
.Identificador--funcionClave {
    color: #50fa7b
}
.Identificador--std {
    color: #bd93f9
}
.Comentario {
    color: #6272a4
}
.Fondo {
    background-color: #0E1419
}
.TextoCod {
    color: #d7d7d7
}
.IdentificadorTipo {
    color: #85e9ff
}
"""

darker = """
.Texto {
    color: #c3e88d
}
.Numero {
    color: #f78c6c
}
.Identificador--palabraClave {
    color: #c792ea
}
.Identificador--funcionClave {
    color: #82aaff
}
.Identificador--std {
    color: #89ddff
}
.Comentario {
    color: #616161
}
.Fondo {
    background-color: #212121
}
.TextoCod {
    color: #d7d7d7
}
.IdentificadorTipo {
    color: #85e9ff
}
"""

deepOcean = """
.Texto {
    color: #c2e77b
}
.Numero {
    color: #f78c6c
}
.Identificador--palabraClave {
    color: #c792ea
}
.Identificador--funcionClave {
    color: #81a9dd
}
.Identificador--std {
    color: #89ddff
}
.Comentario {
    color: #717cb4
}
.Fondo {
    background-color: #0f111a
}
.TextoCod {
    color: #d7d7d7
}
.IdentificadorTipo {
    color: #85e9ff
}
"""

oneLight = """
.Texto {
    color: #468B46
}
.Numero {
    color: #986801
}
.Identificador--palabraClave {
    color: #a626a4
}
.Identificador--funcionClave {
    color: #3f77f3
}
.Identificador--std {
    color: #e4564a
}
.Comentario {
    color: #a0a1a7
}
.Fondo {
    background-color: #fafafa
}

.TextoCod {
    color: black
}
.IdentificadorTipo {
    color: #5392A0
}
"""

# Comentario
aplicadorDeColor true, 20

export colores =
    OneLight: aplicadorDeColor "OneLight", oneLight
    OneDark: aplicadorDeColor "OneDark", atomOneDark
    Blackboard: aplicadorDeColor "Blackboard", blackboard
    Dracula: aplicadorDeColor "Dracula", dracula
    DraculaDarker: aplicadorDeColor "DraculaDarker", draculaDarker
    Darker: aplicadorDeColor "Darker", darker
    DeepOcean: aplicadorDeColor "DeepOcean", deepOcean
    Palenight: aplicadorDeColor "Palenight", palenightColor
