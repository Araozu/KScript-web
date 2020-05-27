<template lang="pug">
    div
        div.contenedor-img
            div.contenido-img-inicial
                h1
                    | Misti es un lenguaje de programación funcional
                    br
                    | que se compila a JavaScript.

                nuxt-link(to="/docs/").boton-inicio Documentación
                br
                nuxt-link(to="/api/").boton-inicio API

            div.transicion-img-inicial
            div.img-inicial

        div.caracteristicas
            div.cont-motto
                h2.motto Tipos de datos algebraicos

            div.cont-caracteristica
                div.descricipcion-caracteristica
                    p Crea tipos de datos complejos fácilmente, y opera con ellos.
                div.codigo-caracteristica
                    codigo(:codigo="codCarac1")

            div.cont-motto(style="background-color: #3F51B5;")
                h2.motto Inferencia de tipos

            div.cont-caracteristica
                div.descripcion-caracteristica
                    p.
                        Programa de forma segura, pero sin tener que anotar cada linea.
                div.codigo-caracteristica
                    codigo(:codigo="codCarac2")

            div.cont-motto(style="background-color: #673AB7;")
                h2.motto Rasgos

            div.cont-caracteristica
                div.descripcion-caracteristica
                    p Implementa funcionalidad en común sin crear jerarquias enormes.
                    p Los rasgos permiten la re-utilización de código de forma fácil, rápida, y plana.
                div.codigo-caracteristica
                    codigo(:codigo="codCarac3")

            div.cont-motto(style="background-color: #9C27B0;")
                h2.motto Clases

            div.cont-caracteristica
                div.descripcion-caracteristica
                    p O usa las clases como azúcar sintáctico para prototype.
                div.codigo-caracteristica
                    codigo(:codigo="codCarac4")

            div.cont-motto(style="background-color: #E91E63;")
                h2.motto Interoperabilidad

            div.cont-caracteristica
                div.descripcion-caracteristica
                    p Define estructura en Misti, úsala en JavaScript.
                    p Todo el código se compila a JavaScript fácíl de entender y de usar.
                div.codigo-caracteristica
                    code.language-javascript
                        codigo(:codigo="codCarac5")


            div.cont-motto(style="background-color: #f44336;")
                h2.motto Seguridad

            div.cont-caracteristica
                div.descripcion-caracteristica
                    p Misti comprueba los tipos de datos de sus estructuras en tiempo de ejecución.
                div.codigo-caracteristica
                    code.language-javascript
                        codigo(:codigo="codCarac6")

    //
</template>

<script lang="coffee">
    import primerBanner from "../components/index/primer-banner.vue"
    import codigo from "../components/codigo/codigo.vue"

    codCarac1 = """
        reg Producto = {
            id: number
            nombre: string
            precio: number
        }

        type Carrito = [Producto]
        """

    codCarac2 = """
        const carritoUsuario = [
            { id := 1, nombre := "Pan", precio := 3 }
            { id := 2, nombre := "Arroz", precio := 10 }
        ]

        //: carritoUsuario es de tipo Carrito
        //  No se necesitó anotar el tipo de dato
        """

    codCarac3 = """
        impl Igualable Producto =
            fun (==) producto1 producto2 =
                producto1.id == producto2.id

            fun (!=) p1 p2 = !p1 == p2

        carritoUsuario[0] == carritoUsuario[1]  //= false
        """

    codCarac4 = """
        class Animal =
            member nombre: string
            constructor of nombre

        class Gato: Animal =
            member vidas: string
            constructor of super vidas
        """

    codCarac5 = """
        // Representación del registro Producto en JS
        function Producto(id, nombre, precio) {
            if (!new.target) return new Producto(id, nombre, precio);
            this.id = id;
            this.nombre = nombre;
            this.precio = precio;
            Object.freeze(this);
        }
        """

    codCarac6 = """
        function imprimirProducto(producto) {
            if (!producto instanceof Producto)
                console.warn("La función actual recibe un parámetro incorrecto.");

            console.log(producto.nombre + " tiene un costo de " + producto.precio);
        }
        """

    export default
        name: "index"
        layout: "layout-inicio"
        components: { primerBanner, codigo }
        data: -> {
            codCarac1
            codCarac2
            codCarac3
            codCarac4
            codCarac5
            codCarac6
        }


#
</script>

<style scoped lang="sass">

    .boton-inicio
        display: inline-block
        margin: 0.5rem 0
        padding: 1rem 2rem
        border: none
        border-radius: 2px
        background-color: #f44336
        color: white
        text-decoration: none
        font-size: 1.25rem


    .cont-motto
        background-color: var(--colorSecundario)


    .motto
        margin: 0
        font:
            size: 2rem
            weight: normal
        color: white
        padding: 1rem 2.5%


    .cont-caracteristica
        padding: 1rem 2.5%
        display: grid
        grid-template-columns: 49% 49%
        grid-column-gap: 2%


    .contenedor-img
        position: relative
        height: 100vh


    .contenido-img-inicial
        top: 0
        left: 0
        height: 100vh
        width: 95%
        position: absolute
        z-index: 3
        color: white
        padding: 0 2.5%


    .transicion-img-inicial
        position: absolute
        bottom: 0
        left: 0
        height: 15vh
        width: 100%
        background-image: linear-gradient(rgba(0, 0, 0, 0), #151515)
        z-index: 4


    .img-inicial
        width: 100%
        height: 100vh
        background-size: cover
        background: url("../assets/img/misti1.webp") center
        position: absolute
        top: 0
        left: 0
        z-index: 1
        &::before
            background-color: rgba(0, 0, 0, 0.4)!important
            z-index: -1
            display: block
            position: absolute
            top: 0
            left: 0
            width: 100%
            height: 100%
            content: ""


    //
</style>
