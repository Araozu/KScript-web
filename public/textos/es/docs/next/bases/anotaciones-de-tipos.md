# Anotaciones de tipos

> En diseño

## Contenido

Se usa el operador `:<` para indicar el tipo de dato:

```
const nombre:< string = "Juan"

let edad:< number = 20
```

Esto es solo una sugerencia para el programador. Misti no verifica ninguna
validación de estos. Si deseas validación en tiempo de ejecución usa [Contratos](/#/docs/next/contratos)

## Discusión

Se usa el operador `:<` porque

- Los objetos usan `:`. Ejm. `{nombre: "Juan", apellido: "Perez"}` 
- Se accede al prototipo de un objeto con `::`
- Los contratos usan `:>`

