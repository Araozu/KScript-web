# Clases

Las clases se compilan normalmente.

```
class Animal =
    
    member nombre: string
    member edad: number

    constructor of nombre edad


class Gato: Animal =

    member vidas: number

    constructor nombre edad vidas =
        super nombre edad

```

```javascript
class Animal {
    
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }

}

class Gato extends Animal {

    constructor(nombre, edad, vidas) {
        super(nombre, edad);
        this.vidas = vidas;
    }

}
```

