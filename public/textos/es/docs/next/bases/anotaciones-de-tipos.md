# Anotaciones de tipos

> En diseño

## Contenido

Se usa el operador `:` para indicar el tipo de dato:

```
const nombre: string = "Juan"

let edad: number = 20
```

Cada sección muestra cómo es la anotación respectiva.

## Discusión

Esta sintaxis crea conflictos con la sintaxis de objetos de JavaScript.

```javascript
const obj = {
    nombre: "Juan"
};
```

Uno de los objetivos de Misti es que el lenguaje sea lo más consistente posible.
Ya que los dos puntos se usan para indicar un tipo de dato, ya no se pueden usar
para los objetos. Es por ello que la propuesta actual es que los objetos en Misti
tengan la siguiente sintaxis:

```
const obj = { 
    nombre := "Juan"
}
```

Y si se quiere anotar el tipo de dato de un atributo de un objeto se haría así:

```
const obj = {
    nombre: string := "Juan"
}
```

Aunque la sintáxis es más clara y consistente, implicaría irromper en los hábitos de los 
programadores de JS existentes, sea por costumbre, funcionalidad o estética.

El caso contrario afectaría a los programadores de TS. Si se usan los dos puntos para los
objetos las anotaciones necesitarían otro operador. Una de las alternativas es el operador
`::` de Haskell:

```
const nombre :: string = "Juan"

const obj = {
    nombre::string: "Juan"
}
```

Sin embargo, no se ve bien.

Es muy probable que la sintaxis actual sea la que quede al final.


