# Bases

## Identificadores
    
Las reglas para crear identificadores en Misti (serán) las mismas de JS.
De momento, los identificadores:

- Inician con una minuscula, MAYUSCULA o guion bajo _
- Luego pueden tener minusculas, MAYUSCULAS, guiones bajos _ y números

En un futuro se podrán usar los caracteres '$'.

```
identificador
IdentificadorValido
_valido

__identificador_valido_2__
```

## Constantes

```
let nombre = "Pedro"
```


## Variables

```
let mut edad = 20

edad = 21  // OK
```

## Tipos de datos

Misti usa los mismos tipos de datos de JS. Los tipos soportados actualmente son:

```
// Txt o string
let nombre = "Hola"

// No se usan comillas simples para crear Txt
let canal = 'beta' // Error


// Num o number
let edad = 20


// Bool o boolean
let esSoltero = true
let esCasado  = false
```
