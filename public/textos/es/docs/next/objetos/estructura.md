# Objetos

> En diseño

## Sintaxis

La misma de JavaScript.

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
