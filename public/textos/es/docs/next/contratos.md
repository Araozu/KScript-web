# Contratos

> En diseño

KScript cuenta con mecanismos para validar el tipo de dato y valor de una expresión en tiempo de
ejecución. Este mecanismo se conoce como contratos.

## Sintaxis

Para definir contratos se usa el operador `:` junto con expresiones. Por ejemplo, si queremos validar
que una constante es de tipo `number` usando contratos, lo haríamos de la siguiente forma:

```
const id: $ is number = sql.getUsers().[0].id;
```

El contrato está definido entre los operadores `:` y `=`.

Allí el signo de dolar hace referencia a la constante `id`. El operador `is` se usa para validar
un tipo de dato. En este caso se usa para verificar que id es number.

## Validar un tipo de dato



## Validar un valor




