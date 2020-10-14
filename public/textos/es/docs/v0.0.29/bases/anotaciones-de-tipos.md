# Anotaciones de tipos

> En diseño

En KS es posibler colocar anotaciones de los tipos de datos de las variables/constantes.
Estas anotaciones no realizan ninguna verificación, solamente se usan como sugerencia. En
un futuro se implementará una forma de validar los tipos de datos (Contratos). 

Su uso es el siguiente:

```
const nombre:< string = "Juan"
```

Se hace uso del operador `:<` para anotar la declaración.

## Consideraciones

Se usa el operador `:<` porque: 

- El operador `:` se usará en objetos

- El operador `::` se usará para acceder al prototipo de un objeto

- El operador `:>` se usará para definir Contratos.
