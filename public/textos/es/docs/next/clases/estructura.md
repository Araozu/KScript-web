# Clases

> En diseño

Todas las estructuras en Misti son herramientas. Cada una cumple una función
y se usan en diferentes escenarios. Las clases no son diferentes.

## Estructura

Se muestra como ejemplo una jerarquia de poderes de un videojuego.

```
class Poder =

    let nombre
    let costoMana
    let tiempoRecarga

    constructor nombre costoMana tiempoRecarga =
        this.nombre = nombre
        this.costoMana = costoMana
        this.tiempoRecarga = tiempoRecarga

class PoderPasivo:> Poder =
    
    constructor nombre =
        super nombre 0 0

class PoderAutoLanzable:> Poder =

    constructor nombre costoMana =
        super nombre costoMana 0
```

## Diferencias

Esta sección es sumamente importante. Misti es mucho más estricto con OOP que otros
lenguajes o el propio JavaScript. Las más importantes son:

- No existen campos/métodos estáticos

  Misti cuenta con otras formas para obtener el mismo comportamiento,
  a diferencia de por ejemplo Java, donde debido a que todo se basa en clases,
  es necesario crear campos/métodos estáticos.

- No es posible acceder a los campos desde afuera de la clase (?)

  Los campos no se definen en el objeto que se devuelve al crear la clase, sino
  como variables normales. (Es esto posible?)

