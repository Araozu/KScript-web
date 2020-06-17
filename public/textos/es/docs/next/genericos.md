# Genéricos

## Estructura

Se definen con una comilla simple y un identificador de tipo.

```
'A
'Tipo_generico

// Uso

// 'A -> 'A
fun devolverParametro x = x

// ('A -> 'B) -> 'A -> 'B
fun aplicar f x = f x

// ('A -> B) -> ('B -> 'C) -> ('A -> 'C)
fun componer f g = fn x -> g (f x)
```

## Pattern Matching

```
// 'A -> ()
fun imprimirTipo x =
    console.log
        match x with
        | number -> "Numero"
        | string -> "Texto"
        | (string, number) -> "Tupla con Txt y Num"
        | _ -> "Cualquier cosa"

imprimirTipo "Hola"   //: Texto
imprimirTipo 100      //: Numero
imprimirTipo ("A", 2) //: Tupla con Txt y Num
imprimirTipo (0, 0)   //: Cualquier cosa
imprimirTipo true     //: Cualquier cosa
```

## Pattern matching de genéricos en funciones

```
// 'A -> ()
fun imprimirTipo (x: number) = console.log "Numero"
fun imprimirTipo (x: string) = console.log "Texto"
fun imprimirTipo (x: (string, number)) =
    console.log "Tupla con Txt y Num"

fun imprimirTipo _ = console.log "Cualquier cosa"


imprimirTipo "Hola"   //: Texto
imprimirTipo 100      //: Numero
imprimirTipo ("A", 2) //: Tupla con Txt y Num
imprimirTipo (0, 0)   //: Cualquier cosa
imprimirTipo true     //: Cualquier cosa
```
