# Condicionales

> Aprobado

## Contenido

- Se coloca `if`, la condición, `do` y la expresión a ejecutar.
- Las condiciones con `else if` funcionan igual.
- No es necesario encerrar la condición en paréntesis
- No es necesario colocar `do` luego de `else`.

```
const nombre = "Juan"

if nombre == "Pedro" do
    console.log "Hola Pedro"
else if nombre == "Juan" do
    console.log "Hola Juan"
else
    console.log "Hola forastero"
```

```terminal
Hola Juan
```

Por cierto, no hay operador ternario `a? b: c`. Los condicionales son expresiones, y
se usan en su lugar.

## Expresiones

Los condicionales se pueden usar como expresiones, es decir:

```
const mensaje = if edad > 18 do "si"
                else "no"
```

Es importante notar que la indentacion debe ser correcta. Si el `if` inicia en la columna 17,
toda la expresión debe estar indentada desde la columna 17.

A continuación se muestran otros estilos de indentación.

```

const mensaje = if true do
                    console.log "Hola mundo"
                else
                    console.log "Adios mundo"

const mensaje =
    if true do
        console.log "Hola mundo"
    else
        console.log "Adios mundo"
```

## Discusión

Se usa `do` en lugar de `then` para que los condicionales sean más concisos.

