<template lang="pug">
div.LineaCodigo.TextoCod.cont-linea-codigo
    div.resaltado
    template(v-if="linea === ''")
        br
    template(v-else)
        template(v-for="datos in datosTokens")
            span(:class="datos[0]" v-html="datos[1]")

//
</template>

<script>
    import {computed} from "vue";
    import {obtenerTokens, escaparToken} from "../codigo/kanAHTML.coffee";

    export default {
        name: "linea-editor-codigo.vue",
        props: {
            linea: {
                type: String,
                required: true
            },
            resaltadoArr: {
                type: Array,
                required: true
            }
        },
        setup(props) {
            const datosTokens = computed(() =>
                obtenerTokens(props.linea).map((t) => {
                    const [htmlToken, claseAdicional] = escaparToken(t);
                    return [`token ${t.tipo} ${claseAdicional}`, htmlToken];
                })
            );

            return {
                datosTokens
            }
        }
    }

</script>

<style scoped lang="sass">

    .cont-linea-codigo
        position: relative

    .resaltado
        position: absolute
        top: 0
        left: 15px
        height: 1.35rem
        width: 5rem
        background-color: var(--color-cod)
        opacity: 0.25

    //
</style>
