# Funciones anónimas

> En diseño

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
