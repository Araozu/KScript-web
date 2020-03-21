<template lang="pug">
    div.barra-nav
        div
            nuxt-link(to="/") Inicio
        div
            nuxt-link(to="/docs/") Documentación
        div
            nuxt-link(to="/api/") API
        div
            nuxt-link(to="/repl/") REPL

    //
</template>

<script lang="coffee">

    export default
        name: "barra-navegacion"

#
</script>

<style scoped lang="sass">

    .barra-nav
        position: fixed
        bottom: 0
        left: 0
        width: 100%
        background-color: var(--fondo)
        color: var(--color)
        border-top: solid 3px var(--colorSecundario)

        display: grid
        grid-template-columns: auto auto auto auto

        div
            text-align: center
            a
                padding: 0.5rem 0
                display: inline-block
                width: 100%
                color: var(--color)
                transition: background-color 50ms
                &:hover
                    background-color: rgba(255, 255, 255, 0.25)



//
</style>
