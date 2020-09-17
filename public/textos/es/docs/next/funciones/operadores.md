# Operadores

> En diseño

KS permite declarar operadores de la siguiente manera:

```
fun (<*>) x y = x.concat y 
```

Los operadores son funciones con 2 operadores, y se usan de forma normal.

```
const res = "Hola " <*> "mundo"
```

## Notacion infija

Rodeando el operador en parentesis se lo puede usar como si fuera una función normal.

```
const res = (+) 10 20
console.log res
```

```terminal
30
```

## Operadores con más de 3 parámetros

Si un operador tiene más de 3 parámetros se le aplica currying automáticamente,
de ese modo pasa a tener 2 parámetros, y devolver una función con los parámetros restantes.

```
fun (>*>) n1 n2 n3 = n1 + n2 + n3

// Es equivalente a
fun (>*>) n1 n2 = fn n3 -> n1 + n2 + n3
```

