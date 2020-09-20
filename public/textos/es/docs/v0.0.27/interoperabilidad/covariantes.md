# Covariantes

Los casos de covariantes se compilan a clases para que se puedan usar fácilmente en JavaScript.

Los casos que no contienen ningún dato se compilan a un Symbol, y los que contienen datos
se compilan a una función constructora, a la cual se le aplica `Object.freeze` para que sea inmutable.

```
covar ArbolBinario =
    | Hoja
    | Nodo of number ArbolBinario ArbolBinario
```

```javascript
const ArbolBinario = Object.freeze({
    Hoja: Symbol(),
    Nodo: function Nodo(_1, _2, _3) {
        if (!new.target) return new Nodo(_1, _2, _3);

        this._1 = _1;
        this._2 = _2;
        this._3 = _3;
        Object.freeze(this); 
    }
});

const Hoja = ArbolBinario.Hoja;
const Nodo = ArbolBinario.Nodo;
```
