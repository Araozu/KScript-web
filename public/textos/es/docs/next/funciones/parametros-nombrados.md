# Parametros nombrados

> En diseño

No hay parametros nombrados en KS. Requeriría saber la signatura de todas las funciones,
y no sería compatible con JS existente.

En su lugar, puedes usar pattern matching en las funciones para desestructurar un objeto como
parámetro:

```
fun sumar {dividendo, divisor} = dividendo / divisor

sumar {dividendo 20, divisor 5}
```
