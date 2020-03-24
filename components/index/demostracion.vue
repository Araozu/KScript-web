<template lang="pug">
    div
        h2.titulo-demostracion {{ datos.titulo }}
        p.descripcion-demostracion(v-html="datos.descripcion")
        codigo(:codigo="datos.codigo")

    //
</template>

<script lang="coffee">
    import codigo from "@/components/codigo/codigo.vue"


    export default
        name: "demostracion"
        components: { codigo }
        props:
            datos:
                type: Object
                required: true

#
</script>

<style scoped lang="sass">

    .titulo-demostracion
        font:
            family: var(--fuenteTitulo)
            size: 1.25rem
        text-align: center


    .descripcion-demostracion
        text-align: center


    //
</style>
