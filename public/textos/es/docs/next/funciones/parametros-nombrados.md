# Parametros nombrados

> En diseño

No hay parametros nombrados en KS. Requeriría saber la signatura de todas las funciones,
y no sería compatible con JS existente.

En su lugar, puedes usar pattern matching en las funciones para desestructurar un objeto como
parámetro:

```
fun sumar {dividendo, divisor} = dividendo / divisor

sumar {dividendo := 20, divisor := 5}
```

## Deprecado

Una sintaxis para tener parametros nombrados.

```
fun dividir (x~dividendo) (y~divisor) = x / y

dividir (~dividendo = 20) (~divisor = 30)
dividir (~divisor = 30) (~dividendo = 20)
dividir
    ~dividendo = 20
    ~divisor   = 30
```

Deprecada por:

1. Hace uso del operador `~` de forma inconsistente, como operador binario y unario.
2. Requiere que el programador aprenda una nueva sintáxis.
3. Esta sintaxis requiere que el compilador sepa los nombres y orden de los parámetros.
4. No funciona con JS existente.
