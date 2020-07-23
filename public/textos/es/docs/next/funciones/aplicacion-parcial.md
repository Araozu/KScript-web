# Aplicación Parcial

> En diseño

A diferencia de otros lenguajes funcionales, Misti no cuenta con currying automático,
debido a que esto entra en conflicto con la semántica de JavaScript.

En JavaScript puedes llamar una función con con cualquier cantidad de parámetros,
y varias funciones dependen de este comportamiento. Por ejemplo, el método `map` de Array.

```javascript
const arr = [];

arr.map((x) => x + 1);
arr.map((x, pos) => x + 1 + pos);
arr.map((x, pos, that) => x + 1 + pos);
```

El callback es una función que toma 3 parámetros, pero si pasas una función con más o menos
parámetros no habrá problema. Esto es posible debido a la sintáxis de JavaScript.

Si quisieramos tener el mismo comportamiento en Misti, tendriamos que saber la signatura de
todas las funciones y exigir la cantidad exacta de parámetros. Lo primero es imposible y lo
segundo limita las capacidades de JavaScript.

Por lo tanto, Misti no cuenta con Currying, sin embargo, es posible aplicar parcialmente
una función de forma sencilla.

## Propuesta 1

Un operador para aplicar parcialmente una función. Dada una función f con una cantidad desconocida
de parámetros, se aplicaría parcialmente así:

```
const nuevaFun = f* 1 2 3 4
```

Esto se compila a:

```javascript
const nuevaFun = (...params) => f.call(undefined, 1, 2, 3, 4, ...params);
```

