# Estructura

> En diseño

Las funciones se declaran con la palabra clave `fun`, seguida del nombre de la función, los parámetros,
el signo `=` y el cuerpo de la función.

Por ejemplo, una función que suma 2 números se define así:

```
fun sumar x y =
    x + y
```

En este ejemplo, `sumar` es el nombre de la función, `x` y `y` son parámetros. El valor que devuelve la
función es `x + y`. Al igual que otras estructuras que vimos anteriormente, las funciones devuelven el
valor de la última expresión evaluada.

Para llamar a la función hacemos lo siguiente:

```
sumar 10 20  //= 30
```

Colocamos el nombre de la función, luego los parámetros separados por espacios.

## Realizar cálculos en los parámetros de la función

En JavaScript es común realizar operaciones dentro de los parámetros de una función. Por ejemplo, si
quisieramos imprimir el valor de `10 + 20` por consola, haríamos esto:

```javascript
console.log(10 + 20);  // 30
```

Sin embargo, hacer algo parecido en KS da lugar a un error:

```err
console.log 10 + 20   //! Error. El operador '+' trabaja con number.
```

Esto se debe a que llamar a una función tiene una menor precedencia que usar un operador. En otras palabras,
el código anterior es equivalente al siguiente:

```
(console.log 10) + 20
```

Llamar a console.log devuelve `()`, y no se le puede sumar 20.

Para conseguir nuestro objetivo debemos encerrar la suma en paréntesis, entonces el resultado será correcto.

```ok
console.log (10 + 20)  // 30
```

## Funciones sin parámetros

Tecnicamente, en KS todas las funciones necesitan al menos 1 parámetro. Pero existe una forma de
crear y llamar funciones 'sin parámetros'. Por ejemplo, la siguiente función imprime "Hola mundo" en
la consola:

```
fun imprimirHolaMundo () =
    console.log "Hola mundo"

imprimirHolaMundo ()
```

```terminal
Hola mundo
```

En este ejemplo la función `imprimirHolaMundo` toma como primer parámetro una unidad `()`, y luego
imprime el mensaje. Del mismo modo, al llamar la función pasamos como parámetro una unidad `()`.
Esa unidad que se pasa como parámetro simplemente se ignora, creando una funcion 'que no toma parámetros'.








