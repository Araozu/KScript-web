aplicadorDeColor = (nombre, estilo) -> () ->
    if false && process.client
        elemTemp = document.getElementById "estilos"
        unless elemTemp?
            elemTemp = document.createElement "style"
            elemTemp.id = "estilos"
            document.head.appendChild elemTemp

        elemTemp.innerHTML = estilo
        nombre


palenightColor = """
.TTexto {
    color: #c3e887
}
.TNumero {
    color: #ffcb6b
}
.PalabraClave {
    color: #c792ea
}
.FuncionClave {
    color: #82aaff
}
.TIdentificador--std {
    color: #ffea7d
}
.TComentario {
    color: #676e95
}
.Fondo {
    background-color: #292d3e
}
.TextoCod {
    color: #d7d7d7
}
.TIdentificadorTipo {
    color: #85e9ff
}
"""


atomOneDark = """
.TTexto {
    color: #6db369
}
.TNumero {
    color: #d19a66
}
.PalabraClave {
    color: #c679dd
}
.FuncionClave {
    color: #61aeef
}
.TIdentificador--std {
    color: #ffe968
}
.TComentario {
    color: #59626f
}
.Fondo {
    background-color: #282c34
}
.TextoCod {
    color: #d7d7d7
}
.TIdentificadorTipo {
    color: #85e9ff
}
""" # Comentario

blackboard = """
.TTexto {
    color: #61ce3c
}
.TNumero {
    color: #d8fa3c
}
.PalabraClave {
    color: #fbde2d
}
.FuncionClave {
    color: #ff6400
}
.TIdentificador--std {
    color: #6897bb
}
.TComentario {
    color: #aeaeae
}
.Fondo {
    background-color: #0c1021
}
.TextoCod {
    color: #d7d7d7
}
.TIdentificadorTipo {
    color: #85e9ff
}
""" # Comentario

dracula = """
.TTexto {
    color: #f1fa8c
}
.TNumero {
    color: #bd93f9
}
.PalabraClave {
    color: #ff79c6
}
.FuncionClave {
    color: #50fa7b
}
.TIdentificador--std {
    color: #bd93f9
}
.TComentario {
    color: #6272a4
}
.Fondo {
    background-color: #282a36
}
.TextoCod {
    color: #d7d7d7
}
.TIdentificadorTipo {
    color: #85e9ff
}
""" #

draculaDarker = """
.TTexto {
    color: #f1fa8c
}
.TNumero {
    color: #bd93f9
}
.PalabraClave {
    color: #ff79c6
}
.FuncionClave {
    color: #50fa7b
}
.TIdentificador--std {
    color: #bd93f9
}
.TComentario {
    color: #6272a4
}
.Fondo {
    background-color: #0E1419
}
.TextoCod {
    color: #d7d7d7
}
.TIdentificadorTipo {
    color: #85e9ff
}
"""

darker = """
.TTexto {
    color: #c3e88d
}
.TNumero {
    color: #f78c6c
}
.PalabraClave {
    color: #c792ea
}
.FuncionClave {
    color: #82aaff
}
.TIdentificador--std {
    color: #89ddff
}
.TComentario {
    color: #616161
}
.Fondo {
    background-color: #212121
}
.TextoCod {
    color: #d7d7d7
}
.TIdentificadorTipo {
    color: #85e9ff
}
"""

deepOcean = """
.TTexto {
    color: #c2e77b
}
.TNumero {
    color: #f78c6c
}
.PalabraClave {
    color: #c792ea
}
.FuncionClave {
    color: #81a9dd
}
.TIdentificador--std {
    color: #89ddff
}
.TComentario {
    color: #717cb4
}
.Fondo {
    background-color: #0f111a
}
.TextoCod {
    color: #d7d7d7
}
.TIdentificadorTipo {
    color: #85e9ff
}
"""

oneLight = """
.TTexto {
    color: #468B46
}
.TNumero {
    color: #986801
}
.PalabraClave {
    color: #a626a4
}
.FuncionClave {
    color: #3f77f3
}
.TIdentificador--std {
    color: #e4564a
}
.TComentario {
    color: #a0a1a7
}
.Fondo {
    background-color: #fafafa
}

.TextoCod {
    color: black
}
.TIdentificadorTipo {
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
