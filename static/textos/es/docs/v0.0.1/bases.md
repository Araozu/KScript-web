# Bases

## Identificadores
    
Las reglas para crear identificadores en Kan (serán) las mismas de JS.
De momento, los identificadores:


- Inician con una minuscula, MAYUSCULA o guion bajo _
- Luego pueden tener minusculas, MAYUSCULAS, guiones bajos _ y números

En un futuro se podrán usar los caracteres '$' y '#'.

```
identificador
IdentificadorValido
_valido

__identificador_valido_2__
```

## Constantes

```
sea nombre = "Pedro"
```

Las constantes no se pueden re-asignar. Actualmente, intentarlo dará un mensaje
de error diciendo 'no implementado'.

## Variables

```
sea mut edad = 20

edad = 21  // OK
```

A pesar de que las variables si se pueden re-asignar, de momento
intentarlo dará un mensaje de error diciendo 'no implementado'.

## Tipos de datos

Kan usa los mismos tipos de datos de JS. Los tipos soportados actualmente son:

```
// Txt o string
sea nombre = "Hola"

// No se usan comillas simples para crear Txt
sea canal = 'beta' // Error


// Num o number
sea edad = 20


// Bool o boolean
sea esSoltero = true
sea esCasado  = false
```
