# Introducción

Bienvenido(a) a la documentación de Kan. A lo largo de las siguientes páginas
aprenderás todo sobre este lenguaje, desde las razones por las que fue creado,
hasta la sintaxis y semántica del mismo.

## Estructura de la documentación

La documentación está divida en diferentes secciones.
Cada una de estas tiene una página principal, por ejemplo, esta página
es la página principal de la sección Introducción.

Cada página principal contiene un resumen de los temas a tratar,
y cada sección tiene páginas específicas, las cuales explican
a fondo cada concepto del lenguaje
así como conceptos de programación funcional.

De este modo, si quieres aprender un concepto desde 0 usarías la
página especifica correspondiente, mientras que si solo quieres recordar
la sintaxis, o ya has trabajado con lenguajes similares a este, usarías
el resumen de la página principal.

## v0.0.1

Esta es la primera versión del lenguaje que se puede considerar "completa".
Cuenta con las faces imprescindibles de un compilador (análisis lexico,
análisis sintáctico, generacion de código), y también brinda soporte para
ciertas estructuras del lenguaje.

En un futuro además de añadir más estructuras definidas en la versión 'next'
del lenguaje, también se añadirá una fase de análisis semántico, así como
compatibilidad con los archivos *.d.ts de typescript.

## Motivación

Cierto día, un programador descubrió F#, programación funcional y la sintaxis
de ML luego de ver un post en reddit, quedando asombrado.

Queriendo hacer uso de esta nueva sintaxis y paradigma, se apresuró a buscar
lenguajes similares a F# que pueda usar en el desarrollo front-end.

Así encontró Coffeescript, el cual tiene una sintaxis similar a ML, usa las
APIs de JS, y es un poco más funcional. Sin embargo, era de tipado debil.

Luego encontró ReasonML, el cual es mucho más funcional y de tipado fuerte,
pero con la sintáxis de C y una nueva API.

TypeScript, a pesar de usar las APIs de JS y tener tipado fuerte, sigue estando
ampliamente influenciado por C/C#/C++/Java.

Así que el programador decidió que si nadie iba a crear un lenguaje que se adapte
a sus necesidades, el mismo tendría que hacerlo.

## Instalación

El compilador está escrito en ReasonML, y permite compilar archivos y ejecutar un
REPL. Este se encuentra en [GitHub](https://github.com/Araozu/Kan-Reason "Repositorio del compilador de Kan"), solo
necesitas clonarlo e instalar dependencias.

Los scripts se encuentran en package.json.

