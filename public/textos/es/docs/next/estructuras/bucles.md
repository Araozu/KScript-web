# Bucles

> En diseño

En misti, solo existen los bucles for each y while

## For of (arrays)

```
const numeros = [1, 2, 3]

for (pos, numero) of numeros do
    console.log "Posicion ${pos}, valor ${numero}"
```

```terminal
Posicion 0, valor 1
Posicion 1, valor 2
Posicion 2, valor 3
```

## For in (objetos)

Para iterar sobre las propiedades de un objeto se usa `for in`.

```
const persona = {
    nombre := "Juan"
    apellido := "Perez"
}

for (key, value) in persona do
    console.log "Clave ${key}, valor ${value}"
```

```terminal
Clave nombre, valor Juan
Clave apellido, valor Perez
```

Si no necesitas una clave o un valor, usa el comodin `_` para ignorarlo:

```
for (_, value) in persona do
    // ...
```

## While

```
while i < 20 do
    // ...

```
