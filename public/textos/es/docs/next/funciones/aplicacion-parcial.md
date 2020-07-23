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

## Signatura

En Misti se usan flechas simples y dobles en la signatura, y ayudan a diferenciar
los parámetros de una función.

Las flechas simples `->` indican parámetros, y la flecha doble `=>` indica el
resultado de la función.

A continuación damos varios ejemplos de signaturas.

```
f: number -> number => number
```

f toma 2 parámetros de tipo number, y devuelve un number

```
f: string -> number -> boolean => ()
```

Toma como parámetros un string, un number, un boolean, y no devuelve nada.

```
f: () => ()
```

No toma ningun parámetro, y no devuelve nada.

```
f: (string -> number -> Array => ()) => ()
```

Toma 1 parámetro. Este parámetro es una función, y esta toma como parámetros:

- Un string
- Un number
- Un Array

y no devuelve nada. Finalmente, f no devuelve nada.

```
compose: (string => number) -> (number => boolean) => (string => boolean)
```

La función compose toma 2 funciones, y devuelve una nueva función.

- Función 1

  Toma como parámetro un string y devuelve un number
  
- Función 2

  Toma como parámetro un number y devuelve un boolean
  
- Función de retorno

  Toma como parámetro un string y devuelve un boolean
