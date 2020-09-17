# Arrays y Tuplas

> En diseño

Los Arrays en JavaScript pueden tener cualquier tamaño y cualquier tipo de dato en su
interior. En KS son iguales.

## Arrays

La sintaxis para crear y acceder a Arrays es la misma de JavaScript.

```
const numeros = [1, 2, 3, 4, 5]
const letras = ["a", "b", "c", "d", "e"]

numeros[0]  //= 1
letras[4]   //= e

// Con signatura
const numeros:< [number] = [1, 2, 3, 4, 5]
```

La signatura señala el tipo de dato de los elementos del array, en el ejemplo anterior
`[number]` significa un array de numeros.

Para señalar arrays anidados se usa una sintaxis similar, `[[number]]` significa un array que
contiene arrays de numeros.

Tambien se puede especificar el número de elementos del array, colocando un número antes del
tipo.
Por ejemplo, `[5 number]` significa un array de 5 números, `[2 [3 number]]` significa un array de
2 arrays de 3 números.

Nótese que la signatura es solo una sugerencia, nada nos impide de colocar otros
tipos de datos u cantidad de elementos:

```
const numeros:< [4 number] = [1, "2", (), null, 5]
```

Para enforzar la signatura se utilizan contratos.

```
const numeros:> [4 number] = [1, "2", (), null, 5]  //! Error.
```

## Tuplas

Las tuplas en KS son simplemente una anotación para un array con un número fijo
de elementos y sus tipos de datos. Por ejemplo, dado el siguiente array:

```
const persona = ["Juan", "Perez", 25]
```

su signatura sería `[string, string, number]`. Esto es una tupla.

Las tuplas no pueden especificar el número de elementos como los arrays.
Es decir, no se puede hacer cosas como `[2 string, 3 boolean, Date]` o similares.

Y del mismo modo que los arrays, solo se verifican si se usan junto con contratos. Caso
contrario son solo sugerencias.
