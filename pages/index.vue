<template lang="pug">
    div
        div.contenedor-titulo
            div.cont-logo
                img.logo(src="@/assets/img/kan_logo.svg")
            h1.titulo Kan
            div.etiqueta
                div Funcional · Orientado a Objetos · Seguro
        div.contenedor-demostracion
            demostracion(v-for="(obj, k) in datos" :key="k" :codigo="obj.codigo" :titulo="obj.titulo")

    //
</template>

<script lang="coffee">
    import demostracion from "@/components/index/demostracion.vue"

    datos = [
        {
            titulo: "Parámetros anotados"
            codigo:
                """
                fun areaTriangulo b~base h~altura =
                    (b * h) / 2

                areaTriangulo 10 20  //: 100
                areaTriangulo (~base = 10) (~altura = 20)
                areaTriangulo
                    ~altura = 20
                    ~base   = 10
                """
        },
        {
            titulo: "Currying"
            codigo:
                """
                fun areaTriangulo b~base h~altura =
                    (b * h) / 2

                sea areaTrianguloBase20 = areaTriangulo 20
                areaTrianguloBase20 5   //: 50

                sea areaTrianguloAlto50 = areaTriangulo (~altura = 50)
                areaTrianguloAlto50 10  //: 250
                """
        },
        {
            titulo: "Clases"
            codigo:
                """
                clase Triangulo =
                    campo base: Num
                    campo altura: Num

                    constructor base altura

                    met calcularArea () =
                        (@base * @altura) / 2
                """
        },
        {
            titulo: "Covariantes"
            codigo:
                """
                cov Alto = Alto Num
                cov Base = Base Num

                cov Figura =
                    | Cuadrado Alto
                    | Triangulo Alto Base

                sea triangulo = Triangulo (Alto 100) (Base 50)
                """
        },
        {
            titulo: "Pattern matching"
            codigo:
                """
                fun calcularArea figura =
                    cuando figura es
                    | Cuadrado (Alto alto) ->
                        alto ** 2
                    | Triangulo (Alto alto) (Base base) ->
                        (alto * base) / 2

                calcularArea triangulo  //: 2500
                """
        },
        {
            titulo: "Tipos nulos"
            codigo:
                """
                fun dividir x y =
                    si y == 0
                        ()
                    sino
                        x / y

                sea resultado: Num? = dividir 20 0
                console.log <| resultado.toString() ?: "Error"
                """
        }
    ]

    export default
        name: "index"
        components: { demostracion }
        data: ->
            datos: datos


#
</script>

<style scoped lang="sass">

    .contenedor-demostracion
        display: grid
        grid-template-columns: 32.6% 32.6% 32.6%
        grid-column-gap: 1%


    .contenedor-titulo
        display: grid
        grid-template-columns: 7rem 9rem auto
        font-family: var(--fuenteTitulo)


    .etiqueta
        display: table
        text-align: center
        width: 100%
        height: 100%
        div
            display: table-cell
            vertical-align: middle
            text-align: left
            font-size: 1.5rem



    .titulo
        text-align: center
        font:
            weight: normal
            size: 2.5rem


    .cont-logo
        text-align: center


    .logo
        width: 5rem


    @media only screen and (max-width: 950px)
        .contenedor-demostracion
            grid-template-columns: 48% 48%
            grid-column-gap: 4%


    //
</style>
