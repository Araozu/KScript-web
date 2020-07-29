# Composición de funciones

> En diseño

Toma 2 funciones y devuelve una nueva función que compone las 2.

Por ejemplo, se crea la funcion `sumar10` que suma 10 al parámetro,
y la función `multiplicar2` que multiplica por 2 el parámetro. Al componer estas 2
funciones se crea una nueva función que suma 10 y multiplica 2 a la vez.

```
fun sumar10 x = x + 10

fun multiplicar2 x = x * 2

// Composición pasa aquí
sumar10 >> multiplicar2

```

También hay composición izquierda.

```
sumar10 << multiplicar2
```
