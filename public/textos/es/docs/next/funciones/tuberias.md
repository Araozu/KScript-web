# Tuberías

> En diseño

"Conducen" parametros a funciones.

## Izquierda

Simplemente aplica la función

```
console.log (1 + 2) (3 + 4) (5 + 6)
```

se puede hacer

```
console.log <| 1 + 2 <| 3 + 4 <| 5 + 6
```

se compila a:

```javascript
console.log(1 + 2, 3 + 4);
```

## Derecha

Permite unir varias funciones.

```
10
    |> sumar5
    |> restar2
    |> multiplicar2
```

```javascript
multiplicar2(restar2(sumar5(10)));
```

