# Operadores comunes

> En uso (parcial)

```
// Txt
// La concatenación se hace con <>
"Hola " <> "mundo"  //: hola mundo

// Num
4 + 2   //: 6
4 - 2   //: 2
4 * 2   //: 8
4 / 2   //: 2
4 % 2   //: 0
4 ** 2  //: 16

// Bool
1 > 2   //: false
1 >= 2  //: false
1 < 2   //: true
1 <= 2  //: true
"a" < "b"  //: true

1 == 2    //: false
1 != 2    //: true
"1" == 1  // Error. No se pueden comparar Txt y Num

true && false  //: false
true || false  //: true
!true          //: false

// de asignación
// solo funcionan en variables
let num = 10

num += 1   //: 11
num -= 2   //: 9
num *= 2   //: 18
num /= 3   //: 6
num %= 4   //: 2
num **= 3  //: 8
```

## Discusión

El operador `<>` solo trabaja con strings, sin embargo el compilador aun no aplica
este comportamiento.

