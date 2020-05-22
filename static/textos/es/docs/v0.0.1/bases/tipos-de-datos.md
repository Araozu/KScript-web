# Tipos de datos

Los tipos de datos de Kan son los mismos de JavaScript, con algunas diferencias.


## String (o Txt)

Los string tienen algunas diferencias respecto a JS.

```
let nombre   = "Juan"
let apellido = "Perez"
```

#### Solo se definen con comillas dobles

En Kan no es posible crear strings con comillas simples. Hacerlo significa un error.

```
let strCorrecto   = "Juan"
let strIncorrecto = 'Juan'  //! Error. No se reconoce como string.
```

Las comillas simples se usan para declarar genéricos, que aún no están soportados.

Kan soportará interpolación de strings en un futuro. Sin embargo, se haran dentro de comillas dobles y no tildes.

```
let nombre = "Juan"
let nombreCompleto = "${nombre} Perez"  // Proximamente: Juan Perez
```

#### Se concatena con el operador `<>`

Para evitar ambiguedades con el operador `+`, en Kan se concatenan los strings con el operador `<>`.

```
"Hola" <> " mundo!"  //= Hola mundo
"Hola" + " mundo:"   //! Error: el operador `+` se usa con números.
```


## Number (o Num)

Los números son los mismos de JS. Por ahora no soporta notación cientifica, hexadecimal, octal o binario.

```
let edad = 30
let porcentaje = 0.05
```

Los números usan los operadores comunes.

```
10 + 20  //= 30
45 - 12  //= 33
5 * 2    //= 10
5 / 2    //= 2.5
5 ** 2   //= 25
```


## Boolean (o Bool)

Los booleanos también funcionan igual a JS.

```
let terminado = true
let activo = false
```

```
true && false   //= false
true || false   //= true
!true           //= false
```


## Consideraciones

No se puede operar con tipos de datos incompatibles. Por ejemplo, concatenar un string y un número.
Misti tampoco cambia los tipos de datos implícitamente.

```
"10" <> 10  //! Error
"10" + 10   //! Error

true + 2    //! Error
```
