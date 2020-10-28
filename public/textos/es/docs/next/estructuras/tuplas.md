# Tuplas

> En diseño

## Propuesta 1 - preferida

Hacer que las tuplas se encierren dentro de parentesis:

```
const tupla = (10, 20)
const (v1, v2) = tupla
```

Problema: La signatura de funciones podría usar los paréntesis para representar parametros
(probablemente no)

```
(number, number) -> number
```

## Propuesta 2

Usar sintaxis de TypeScript:

```
const tupla = [10, 20]
const [v1, v2] = tupla
```

Problema: Causa conflicto con la notación de arrays y es confuso:

```
[number]            // Array de number
[number, number]    // Tupla de 2 number
[[number]]          // Array de arrays de number
[[number, number]]  // Array de tupla de 2 number
```

## Propuesta 3

Usar sintaxis nueva:

```
const tupla = #[10, 20]
const #[v1, v2] = tupla
```

Problema: Sintaxis no familiar
