# Constantes y Variables

Vamos a empezar la documentación con el concepto más básico de la programación:
Variables.

Si estás leyendo este documento en una PC, te invito a ejecutar el código de ejemplo
en el REPL que está al costado izquierdo. De este modo, tu aprendizaje será mucho
más rápido.


## Constantes


En la programación funcional es natural trabajar con constantes, y Misti favorece
estas sobre las variables. Podemos declarar una constante del siguiente modo:

```
const constante = 10
```

La primera palabra que colocamos es `const`. Esta indica que estamos declarando
una constante. Luego, le asignamos un nombre, en este caso es `constante`.
Finalmente, asignamos un valor a esta constante, el cual es `10`.

Una vez hecho esto, podemos usar nuestra constante en el resto del código,
como estamos acostumbrados:

```
constante + 20  //= 30
```

Esta constante tiene el mismo comportamiento a las constantes de JavaScript.
Eso quiere decir que no podemos cambiar su valor directamente.

Por ejemplo, el sig. código no funcionará:

```
const precio = 200
precio = 220     //! Error: precio es una constante, y no se puede cambiar su valor.
```

Pero este si:

```
const precio = [200]
precio[0] = 250   // Si funciona.
```

## Variables

En ciertas situaciones es más eficiente simplemente usar una variable en vez de un patron funcional.
Por ello Misti también permite trabajar con variables de forma similar a Javascript.

Las variables se declaran de la siguiente manera:

```
const let edad = 20
```

Como en JavaScript usamos let. De ese modo podemos re-asignar el valor
que contiene.

```
let edad = 20
edad = 21         // OK
```


## Consideraciones

Las variables y constantes de Misti se compilan a let y const, de modo que tienen el mismo comportamiento que en
JavaScript, llamense hoisting, alcance, TDZ, etc.

Es necesario entender estos conceptos para trabajar adecuadamente en Misti.

A partir de ahora, al tratar nuevos temas usaré como ejemplos únicamente constantes.
Sin embargo, los conceptos también se aplican a las variables, a menos que se indique
lo contrario.
