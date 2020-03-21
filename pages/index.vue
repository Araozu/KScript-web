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
            titulo: "Múltiples parámetros nombrados por defecto"
            codigo:
                """
                fun repetir
                | m~mensaje: Txt = "Hola"
                | i~iteraciones: Num = 1
                =
                    si i > 0
                        console.log m
                        repetir m (i - 1)
                    sino ()

                repetir _
                    //: Hola

                repetir (~iteraciones = 3) _
                    //: Hola
                    //: Hola
                    //: Hola

                """
        },
        {
            titulo: "Currying"
            codigo:
                """
                fun sumar x y = x + y

                sea sumar20 = sumar 20

                console.log <| sumar20 10  //: 30
                """
        },
        {
            titulo: "Clases"
            codigo:
                """
                clase Animal =

                    campo nombre: Txt
                    campo vida: Num  // Puntos de vida del animal.
                    campo dañoAtaque: Num

                    constructor nombre vida dañoAtaque


                    met recibirAtaque daño =
                        @vida -= daño
                        console.log "${@nombre} recibió ${daño} de daño!"


                    met pub atacar objetivo =
                        console.log "${@nombre} ataca a ${objetivo.nombre}."
                        objetivo.recibirAtaque @dañoAtaque
                """
        },
        {
            titulo: "Covariantes"
            codigo:
                """
                cov Personal = Director Txt | Profesor Txt | Alumno Num

                sea director  = Director "Juan"
                sea profesor1 = Profesor "Mario"
                sea alumno1   = Alumno "Bob"
                """
        },
        {
            titulo: "Tipos nulos"
            codigo:
                """
                sea tabla1 = document.getElementById "tabla-uno" ?:
                    sea elem = document.createElement "table"
                    elem.id = "tabla-uno"
                    document.body.appendChild elem
                    elem

                tabla1.style.color = "#06060a"
                """
        },
        {
            titulo: "Inferencia de tipos"
            codigo:
                """
                // Num -> Num -> Num
                fun sumar x y = x + y

                sumar 10 20    //: 30
                sumar 10 "20"  // Error. Se esperaba un Num, no un Txt
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


    //
</style>
