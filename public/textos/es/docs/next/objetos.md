# Objetos

## Estructura

```
const persona = {
    nombre := "Abel"
    edad := 32
}

const persona =
    nombre := "Abel"
    edad := 32

const persona = { nombre := "Abel", edad := 32 }


const (nombre, edad) = ("Abel", 32)

const persona = { nombre, edad }
const persona = {
    nombre
    edad
}


persona.nombre
persona.edad
```

## Anotaciones

```
const persona = {
    nombre: string := "Abel"
    edad: number := 32
}
```

## Signatura

```
const persona: {nombre: string, edad: number} = {
    nombre := "Abel"
    edad := 32
}
```

## Métodos

```
const persona = {
    nombre := "Juan"
    apellido := "Perez"
    nombreCompleto := fn ->
        @nombre <> " " <> @apellido
}

persona.nombreCompleto ()  //: Juan Perez
```

## this

```
const producto = {
    nombre := "Leche"
    precio := 20
    descuento := 0.05
    precioFinal := fn ->
        // Puedes usar  `this.`  o  `@`
        const precio = this.precio
        const descuento = @descuento

        precio - (precio * descuento)
}
```

Si usas una función anónima con una flecha doble (=>), se creará
el metodo como una función flecha.

```
// Hacer
fn ->

// Genera
function () {}


// Hacer
fn =>

// Genera
() => {}
```
