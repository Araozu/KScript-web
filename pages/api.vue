<template lang="pug">
    div
        p API en construcción. Este es un ejemplo:
        h1 Storage
        code JS.Storage
        p Provee acceso a la sesión o almacenamiento local de un dominio en particular.
        h2 Propiedades
        table.tabla-api
            tbody
                tr
                    td length
                    td Devuelve un entero que representa el numero de elementos almacenados en el objeto Storage.

        h2 Métodos
        table.tabla-api
            thead
                tr
                    td Nombre
                    td Signatura
                    td Descripción
            tbody
                tr
                    td.nombre key
                    td.signatura Num -> DOMString
                    td.descripcion Devuelve el nombre de la clave en la posición del parámetro.
                tr
                    td.nombre getItem
                    td.signatura DOMString -> DOMString?
                    td.descripcion Devuelve el valor de la clave, o () si la clave no existe.
                tr
                    td.nombre setItem
                    td.signatura DOMString -> DOMString -> ()
                    td.descripcion Agrega un valor a una clave en el objeto Storage.
                tr
                    td.nombre removeItem
                    td.signatura DOMString -> ()
                    td.descripcion Elimina un valor del objeto Storage.
                tr
                    td.nombre clear
                    td.signatura () -> ()
                    td.descripcion Elimina todas las claves del objeto Storage.

    //
</template>

<script lang="coffee">
    import codigo from "@/components/codigo/codigo.vue"

    export default
        name: "api"
        components: { codigo }

#
</script>

<style scoped lang="sass">

    .tabla-api
        width: 100%
        border-spacing: 0
        td
            border-top: solid 1px #454545
            padding: 1rem 0.75rem

        .nombre, .signatura
            font-family: "JetBrains Mono", monospace
            white-space: nowrap

        .nombre
            text-decoration: underline
            cursor: pointer

        .descripcion
            width: 100%

    //
</style>
