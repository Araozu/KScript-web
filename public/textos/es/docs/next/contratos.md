# Contratos

> En diseño

Para expresar contratos se hace pattern matching en las funciones para verificar
la validez de los parámetros.

## Precondiciones

Una función que divide números puede requerir como precondición
que el divisor no sea cero, en cuyo caso se expresaría así:

```
fun dividir
| x~dividendo: number
| y~divisor: number where y != 0
=
    x / y

fun dividir _ _ = throw new Error("El divisor no puede ser cero.")

console.log <| dividir 10 5
console.log <| dividir 10 0
```

```terminal
2
Error. El divisor no puede ser cero.
```

La cláusula `where` realiza la verificación de los datos, y su bloque solo se ejecuta si
todas las condiciones son correctas. Si alguna de estas falla, es necesario definir otra
variante de la función en la cual se manejará el error.

## Postcondiciones

Para definir postcondiciones se usa una sintáxis similar.

Por ejemplo, dada una función que eleva un número al cuadrado, si se cumplen las precondiciones,
esta siempre debe devolver un número positivo.

```
fun elevarAlCuadrado
| x: number where x != NaN
: z: number where z >= 0
=
    x * x

fun elevarAlCuadrado _ = throw new Error("Se intentó elevar al cuadrado NaN.")

console.log <| elevarAlCuadrado 5
console.log <| elevarAlCuadrado -5
console.log <| elevarAlCuadrado NaN
```

```terminal
25
25
Error. Se intentó elevar al cuadrado NaN.
```

