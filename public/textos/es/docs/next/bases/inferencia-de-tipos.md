# Inferencia de tipos

> En diseño

## Contenido

Misti identifica automáticamente qué tipo de dato tiene cada constante/variable,
sin la necesidad de anotarlo.

```
const nombre = "Hola"   //: string
const edad = 20         //: number

nombre + edad  //! Error. No se pueden sumar un string y un number
```

## Discusión

Esta característica sólo funcionaría con el código escrito en Misti. Cualquier código
escrito en JS no se puede validar.

Existe la idea de en un futuro usar las definiciones de TypeScript, pero incluso así no
es posible garantizar una buena inferencia de tipos.

