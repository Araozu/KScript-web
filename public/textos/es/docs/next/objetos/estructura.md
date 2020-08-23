# Objetos

> En diseño

## Sintaxis

La sintaxis es similar a JavaScript.

```
const persona = {nombre: "Juan", apellido: "Perez"}
persona.nombre
persona["apellido"]

delete persona.apellido
```

Cuando el objeto se extiende a 2 o más lineas no es necesario
colocar comas.

```
const persona = {
    nombre: "Juan"
    apellido: "Perez"
}
```

## Métodos

> Experimental

- Usando funcionen anonimas
- Usando palabra clave `met` (experimental)

```
{
    nombre: "Juan"
    apellido: "Perez"
    nombreCompleto: fn -> this.nombre <> this.apellido
    met nombreCompleto = this.nombre <> this.apellido
}
```

Para hacer uso de `this` en los métodos con funciones anónimas se usa
una flecha simple `->`.
En `met` siempre se tiene acceso a `this`.



