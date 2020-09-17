# Parametros

> En diseño

Aunque ya hemos visto la estructura básica de los parámetros, JavaScript tiene un comportamiento más complejo,
el cual KS debe incluir para poder tener la mayor compatibilidad con el mismo.

## Cómo se compila la invocación de funciones a JS

La invocación de funciones en KS tiene el mismo comportamiento que en JS. Se puede llamar a
una función con la cantidad de parámetros adecuada, con menos parámetros o con más parámetros.

A continuación vamos a mostrar una función de ejemplo, y varias invocaciones a esta en KS,
y luego en el JS compilado.

```
fun sumar x y = x + y

sumar 10 20           //= 30
sumar 10              //= NaN
sumar 10 20 30 40 50  //= 30
```
```javascript
const sumar = (x, y) => x + y;

sumar(10, 20);
sumar(10);
sumar(10, 20, 30, 40, 50);
```
















