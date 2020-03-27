<template lang="pug">
    div
        codigo.cod(v-if="txt.substring(0,1) === '$'" :codigo="txt.substr(2)")
        div.txt(v-else v-html="txt")

    //
</template>

<script lang="coffee">

    import codigo from "./codigo/codigo.vue"

    export default
        name: "textos"
        components: { codigo }
        props:
            txt:
                type: String
                required: true

    #
</script>

<style scoped lang="sass">

    .cod
        margin: 0.5rem 0

    .txt
        word-break: break-word

    @media only screen and (max-width: 450px)
        .txt
            font-size: 1rem

    //
</style>
