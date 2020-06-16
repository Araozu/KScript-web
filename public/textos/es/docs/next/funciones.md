# Funciones

## Estructura

```
fun nombre param1 param2 =
    expr

nombre 10 20

// Funcion sin argumentos
fun devolverHola () = "Hola"

const hola = devolverHola ()
```

## Parámetros anotados

```
fun nombreCompleto (nombre: string) (apellido: string) : Txt =
    nombre <> " " <> Apellido

fun sumarYConvertirAStr n1 n2 : Txt =
    (n1 <> n2).toString()

```

## Currying / Aplicación parcial

El currying será opcional debido a la forma en la que funcionan las funciones en JavaScript.
Se usará un símbolo especial (por ejemplo `sumar# 10`)

```
fun sumar x y z = x + y + z

const sumar10 = sumar# 10
sumar10 20 30  //: 60

const sumar50 = sumar10# 40
sumar50 -10  //: 40
```

## Signatura

```
// Num -> Num -> Num
fun sumar x y = x + y

// (Num -> Num) -> Num
fun aplicar f = f 10 + 20

// Txt -> (Txt -> Txt)
fun imbuir saludo =
    fun saludar nombre =
        saludo <> " " <> nombre

    saludar
```

## Operadores

```
fun (<>) s1 s2 = s1.concat s2

"Hola " <> "mundo"  //= Hola mundo

fun (>*>) s1 s2 = s1.concat s2

"Hola " >*> "mundo" //= Hola mundo

// Notacion prefija
(>*>) "Hola " "mundo"  //= Hola mundo

// Currying
const saludar = (>*>) "Hola "

saludar "Pedro"  //= Hola Pedro
saludar "Juan"   //= Hola Juan

// Currying con operadores estilo Haskell
const sumar2 = (+2)
sumar2 10  //= 12

const saludar = ("Hola "<>)
saludar "mundo"  //= "Hola mundo"
```

## Parametros opcionales

**_Ya que no hay currying automático, es posible cambiar esto._**

En sí, Kan no tiene parámetros opcionales. Para simular ese comportamiento
se usa un tipo indefinido como parámetro.

```
// Num -> Num? -> Num
fun areaCuadrilatero base (altura: Num?) =
    // Re-definir altura
    const altura' = if altura? then altura else base

    base * altura'

areaCuadrilatero 10 20  //= 200
areaCuadrilatero 10 ()  //= 100
```

## Parámetros por defecto

```
// Num -> Num
fun areaCirculo (radio = 1) = Math.PI * radio ** 2

areaCirculo 5  //= 78.539816...
areaCirculo _  //= 3.141592...


fun areaTriangulo (base = 1) altura =
    (base * altura) / 2

areaTriangulo 2 4  //: 4
areaTriangulo _ 5  //: 2.5

// Con currying
const f1 = areaTriangulo# _
f1 5   //= 2.5
f1 10  //= 5
```

## Parámetros nombrados

```
fun areaTriangulo base altura =
    (base * altura) / 2

areaTriangulo (~base = 10) 20  //= 100
areaTriangulo (~base = 10) (~altura = 20) //= 100
areaTriangulo (~altura = 20) (~base = 10) //= 100

areaTriangulo
    ~base = 10
    ~altura = 20


// Tener nombres 'publicos' y nombres 'privados'
fun areaTriangulo b~base h~altura =
    (b * h) / 2

areaTriangulo (~base = 10) 20
areaTriangulo
    ~base = 10
    20
```

## Parametros en varias lineas

```
fun saludar
| s~saludo = "Hola"
| n~nombre = ""
| f~final = ""
=
    console.log (s <> " " <> n <> f)

saludar "Bienvenido" "Pedro" "!"  //= Bienvenido Pedro!
saludar _ _ _    //= Hola
saludar _ _ "!"  //= Hola!
```

## Funciones anonimas

```
const funAnonima = fn x y -> x + y

const funAnonima: Num -> Num -> Num = fn x y -> x + y

const elevarAlCuadrado = fn (x: Num) -> x ** 2
```

## Conductores

```
console.log ("El resultado es " <> (10 + 20))

console.log <| "El resultado es " <> (10 + 20)

"El resultado es" <> (10 + 20) |> console.log
```

## Composicion

```
// ('A -> 'B) -> ('B -> 'C) -> ('A -> 'C)
fun (>>) f g = fn x -> g (f x)

sea masDosPorDos = (+2) >> (*2)

masDosPorDos 10  //: 24
masDosPorDos 23  //: 50

sea porDosMasDos = (*2) >> (+2)

porDosMasDos 10  //: 22
porDosMasDos 23  //: 48

// Inverso
// ('A -> 'B) -> ('C -> 'A) -> ('C -> 'B)
fun (<<) f g = fn x -> f (g x)

sea porDosMasDos = (+2) << (*2)
sea masDosPorDos = (*2) << (+2)
```

## Funciones flecha

```
// Para usar funciones flecha se usa una fun. anonima
const funFlecha = fn x y => x + y
```

## Rest/Spread

```
fun imprimirNombres ...nombres =
    for (_, nombre) in nombres do
        console.log nombre

fun imprimirNumeros (...nums: [number]) =
    for (_, num) in nums do
        console.log num

```
