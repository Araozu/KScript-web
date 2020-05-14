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

Ya que el compilador está escrito en F#, necesitarás un entorno de ejecución
de dotnet core. Específicamente, se usó la versión 3.1 del mismo.

Luego, necesitarás descargar el compilador desde GitHub. En la sección releases
se encuentran los archivos necesarios. Por el momento aún no hay un archivo
.exe, solo un .dll.

Finalmente, ejecuta el archivo .dll con el parametro --repl. Eso abrirá un REPL
básico en el cual se transpilará el codigo. En un futuro se podrá compilar
archivos enteros, o ejecutar el código directamente en el REPL haciendo uso de
Node.js.
