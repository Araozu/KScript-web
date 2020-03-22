<template lang="pug">
    div
        h2.titulo-demostracion {{ titulo }}
        codigo(:codigo="codigo")

    //
</template>

<script lang="coffee">
    import codigo from "@/components/codigo/codigo.vue"


    export default
        name: "demostracion"
        components: { codigo }
        props:
            codigo:
                type: String
                required: true
            titulo:
                type: String
                required: true

#
</script>

<style scoped lang="sass">

    .titulo-demostracion
        font:
            family: var(--fuenteTitulo)
            size: 1.25rem
        text-align: center


    //
</style>
