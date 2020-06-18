# Import

> En diseño

## Contenido

Misti usará los módulos de ECMAScript 2015, pero con el estilo de Python:

```
from "vue" import Vue

from "vue-router" import * as VueRouter

from "react" import React, { Component }

from "./foo.js" import { foo }

from "../scripts/bar.misti" import { bar as baz }

import "./Button.css"

```

## Discusión


Se coloca `from` al inicio para que los IDEs puedan autocompletar correctamente. Eso es todo.
