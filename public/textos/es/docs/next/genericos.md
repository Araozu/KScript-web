# Genéricos

> En diseño

### Propuesta 1

Estilo Java

```
def operar <T> T -> T
fun operar <T> (x: T) -> T = ...
class Array<T> = ...

const instancia = Array<number> 5
```

Ventajas: Familiar

Problemas: Dificil de implementar (a menos que sea estricto con los espacios en blanco)

### Propuesta 2

Estilo Scala

```
def operar [T] T -> T
fun operar[T] (x: T) -> T = ...
class Array[T] = ...

const instancia = Array[T] 5
```

Ventajas: Se evita usar menor/mayor que.

Problemas: ¿Cómo diferenciar entre el tipo y un parametro?

```
operar [T] 5  // 2 parametros, un array con T y un numero 5?
              // O 1 tipo de dato T y el numero 5?

arr[1]  // Parametro o tipo de dato?
```

### Propuesta 3

Estilo Haskell

```
def operar T => T -> T
fun operar x = ...
class Array T => param = ...

const instancia = Array 5
```

Problema: ¿Cómo especificar el tipo de dato?

Posible solución: Usar la definicion de tipos de haskell

```
def operar T => T -> T
fun operar x = ...

def Array T => number T -> Array
class Array param1 param2

def instancia T => Array T
const instancia = Array 5
```

### Propuesta 3

??? - preferida

```
fun operar 'T x = ...
class Array 'T param1 param 2

const instancia: Array 'number = Array 'number 5
```
