<template lang="pug">
div.compilado
    div.language-javascript
        codigo(v-if="codigoCompilado.ok" :codigo="codigoCompilado.cod")

//
</template>

<script>
    import Codigo from "@/components/codigo/codigo";

    export default {
        name: "js-compilado-repl-docs",
        components: {Codigo},
        props: {
            codigoCompilado: {
                type: Object,
                required: true
            }
        }
    }

</script>

<style scoped lang="sass">



    //
</style>
