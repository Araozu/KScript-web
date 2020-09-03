# Funciones anónimas

> En diseño

## Sintaxis verbosa

Usa la siguiente sintaxis:

```
fun x y -> x + y
```

Los parametros son `x` y `y`, y devuelve `x + y`.

Si la función anónima necesita hacer uso de un `this` dinámico, se usa una flecha
simple `->`.

```
fun descuento -> this.precio * descuento
```

```javascript
function (descuento) {
    return this.precio * descuento;
}
```

Si la función anónima necesita hacer uso de this léxico, se usa una flecha doble `=>`.

```
fun descuento => this.precio * descuento
```

```javascript
(descuento) => this.precio * descuento;
```

## Sintaxis compacta

Con esta sintaxis se pueden declarar funciones anónimas más cortas:

```
#{$1 + $2}
```

```javascript
($1, $2) => $1 + $2;
```

Se acceden a los parámetros usando `$1, $2, $3`, etc.

Si la función solo toma un parámetro se puede usar solamente `$`.

```
#{$ * $}
```

Si la función toma un parametro rest se usa `$$`.

```
#{$1.concat $$}
```

```javascript
($1, ...$$) => $1.concat($$);
```

Estas funciones anónimas siempre se compilan a funciones flecha, y pueden
causar conflictos con jQuery.
