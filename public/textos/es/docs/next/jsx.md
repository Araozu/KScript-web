# JSX

Nope.

## Implementación usando funciones

No tengo intencion de crear sintaxis para JSX. Sin embargo, se pueden usar
funciones, objetos y funciones anónimas para obtener un comportamiento similar.

```
R.div {className: "test", style: {fontFamily: "Roboto, sans-serif"}} #{
    R.span {className: "txt", style: {fontWeight: "bold"}} #{
        "Una especie de JSX raro..."
    }
}
```

Esto debería ser implementado por alguien más.
