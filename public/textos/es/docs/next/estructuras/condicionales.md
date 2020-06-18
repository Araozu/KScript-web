# Condicionales

> Aprobado

## Contenido

- Se coloca `if`, la condición, `then` y la expresión a ejecutar.
- Las condiciones con `else if` funcionan igual.
- No es necesario encerrar la condición en paréntesis
- No es necesario colocar `then` luego de `else`.

```
const nombre = "Juan"

if nombre == "Pedro" then
    console.log "Hola Pedro"
else if nombre == "Juan" then
    console.log "Hola Juan"
else
    console.log "Hola forastero"
```

```terminal
Hola Juan
```

Por cierto, no hay operador ternario `a? b: c`. Los condicionales son expresiones, y
se usan en su lugar.

## Discusión

En un principo se planeaba no usar `then`, sino que sea la indentación la que delimite
la condición. Pero para hacer el lenguaje más consistente se agregó `then`.

