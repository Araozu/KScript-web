# Clases

> En diseño

Similar a Kotlin:

```
class Persona nombre edad =

    fun decirNombre () =
        console.log @nombre

    fun decirEdad () =
        console.log @edad

```

nombre y edad son los parametros.

## Parametros anotados

Para anotar el tipo de dato de los parametros se usa la misma sintaxis que para anotar funciones.

```
class Persona (nombre: string) (edad: number) =
    // ...
```

## Herencia

Similar a funciones

```
class Alumno nombre edad codigo : Persona nombre edad =
    // ...
```

Los 2 puntos denotan la herencia.

## Genericos

No disponible hasta que se resuelva cómo se usarán.
