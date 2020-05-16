# Inferencia de tipos

Anteriormente dijimos que ciertos operadores trabajan solo con ciertos tipos de datos,
por ejemplo, el operador `<>` solo opera con strings, y si le pasamos algo que no sea
un string, lanzaba un error.

Ahora veremos cómo es que el compilador sabe qué tipos de datos tienen nuestras
expresiones, y cómo podemos nosotros especificar estos.

## Inferencia

Vamos a crear una constante:

```
sea nombre = "Juan"
```

Nosotros sabemos que `nombre` es un string, y también que hay cosas que no podemos
hacer con este. Por ejemplo, no podemos sumarlo:

```
"Juan" + 20  // ¿Cómo se suma un numero a un nombre?
```

Y el compilador tambien lo sabe, porque este es capaz de inferir qué tipos de datos
estamos usando, sea el tipo que sea. Por ejemplo:

```
sea apellido = "Perez"  //: string
sea edad = 30           //: number
sea despierto = false   //: boolean

20.5 * 27.5      //: number
"Ho" <> "la"     //: string
7.84 * 2.3 < 20  //: boolean

sea 
```

En estos simples ejemplos es fácil saber los tipos de datos de datos correctos, pero
la inferencia de tipos soporta estructuras más complejas que veremos más adelante.
Por ahora lo importante es saber que no necesitamos especificar qué tipo de dato
tiene cada expresión.

Pero, ¿y si de todos modos quiero especificarlo?

## Anotaciones

Existen buenas razones para especificar qué tipos de datos estamos usando. En proyectos
grandes es fácil perder el rastro de ellos, cuando estamos trabajando con código que
no es nuestro, incluso cuando (inevitablemente) haya que mezclar Kan con JS.

Para anotar una declaración:

1. Se coloca dos puntos `:` despues del nombre.
1. Se coloca el tipo de datos.

Por ejemplo:

```
sea nombre: string = "Juan"
```

Así de simple. Cada sección explicará las anotaciones que le conciernen. Es decir,
cuando hablemos de arrays, habrá una parte explicando cómo anotarlos, y así con
los temas que lo requieran.

## Anotacion de expresiones

Similar a ReasonML, Kan permite anotar cualquier expresión. Para ello también se coloca
dos puntos y el tipo.

```
(20: number) + 40  //= 60
```

Es obligatorio encerrar la anotación en paréntesis para evitar confusiones.

Estas anotaciones siempre tienen precedencia sobre otras expresiones,
por ejemplo, el siguiente fragmento

```
(sumar 10 20: number)
```

equivale a

```
((sumar 10 20): number)
```

