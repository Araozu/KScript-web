# Signatura

> En diseño

## Signatura general

### Propuesta 1

Separar parametros con flecha, y retornos con flecha doble

```
number -> number => number
string -> (number => bool) => bool
```

Problema: Puede ser confuso cuando usar `->` y cuando usar `=>`

### Propuesta 2

Separar parametros con comas y retornos con flechas

```
(number, number) -> number
(string, (number -> bool) -> bool
```

Problema: Inconsistente con la forma de llamar a una funcion, y posible conflicto
con las tuplas

### Propuesta 3 - preferida

Separar parametros con espacios y retornos con flechas

```
number number -> number
number ...number -> number
string (number -> bool) -> number
```

Problema: Genéricos?

## Signatura en la misma funcion

### Propuesta 1

Estilo de F#

```
fun sumar (x: number) (y: number): number = x + y
fun sumar x y : number = x + y
```

Problema: `:` ya se usa para objetos (Puede que no)

### Propuesta 2

Estilo de Haskell

```
def sumar number number -> number  // Reemplazar
fun sumar x y = x + y
```

### Propuesta 3

Personalizado. Si los objetos ya no van a usar `:` para separar nombre de valor,
entonces se puede usar el operador para definir tipos de datos.

```
fun sumar (x: number) (y: number) -> number = x + y
fun sumar x y -> number = x + y
```

Bien podrian eliminarse los dos puntos...

```
fun sumar (x number) (y number) -> number = x + y
```

Esta última sería consistente con la signatura preferida

```
number number -> number
```

Aunque seria inconsistente con los tipos de objetos

```
{nombre: string}
```

Y como se anotaria un objeto y se coloca su valor?

```
{nombre: string "Juan"}   // ?
{(nombre: string) "Juan"} // ?!
```
