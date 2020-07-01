<template lang="pug">
div
    div.contenedor-principal
        div.cont-logo-principal
            div.cont-logo
                img(src="/img/misti-logo-beta.svg")
            div.titulo
                h1 Misti
                h2 Seguridad para el dinamismo de JavaScript.

    p Pagina de inicio en construccion.

    router-link(:to="rutaDocs")
        h3 Documentacion

//
</template>

<script lang="coffee">
    import { computed } from "vue"
    import { useStore } from "vuex"
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
        name: "Inicio"
        components: { primerBanner, codigo }
        setup: ->
            store = useStore()

            versionesDocs = computed (=> store.state.variables.versiones)
            rutaDocs = computed (=>
                sigVer = versionesDocs.value.find (x) => x != "next"
                "/docs/#{ sigVer }/"
            )

            {
                rutaDocs
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

    .contenedor-principal
        margin: 5rem auto
        width: 90%
        max-width: 1400px


    .cont-logo-principal
        display: grid
        grid-template-columns: 20% auto
        grid-column-gap: 5%

        .cont-logo
            text-align: right
            img
                width: 100%

        .titulo
            h1
                font-size: 3rem

    //
</style>
