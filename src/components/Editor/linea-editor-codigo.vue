<template lang="pug">
div.LineaCodigo.padding-linea-codigo.cont-linea-codigo
    div.resaltado(:style="[estilosResaltado]")
    template(v-if="linea === ''")
        br
    template(v-else)
        span(v-for="datos in datosTokens" :class="datos[0]" v-html="datos[1]")

//
</template>

<script>
    import {ref, computed, watchEffect} from "vue";
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

            const estilosResaltado = ref({});

            const manejarResaltado = () => {
                const [izq, der] = props.resaltadoArr;

                if (izq !== der ) {
                    estilosResaltado.value = {
                        transform: `translateX(${izq * 0.6}rem)`,
                        width: `${(der - izq) * 0.6}rem`
                    };
                } else {
                    estilosResaltado.value = {};
                }
            };

            watchEffect(manejarResaltado);

            return {
                estilosResaltado,
                datosTokens
            }
        }
    }

</script>

<style scoped lang="sass">

    .cont-linea-codigo, .resaltado
        line-height: calc(var(--altoE) * 1.1)
        height: calc(var(--altoE) * 1.1)


    .padding-linea-codigo
        padding: 0 var(--anchoE)


    .cont-linea-codigo
        position: relative


    .resaltado
        position: absolute
        top: 0
        left: 15px
        height: 100%
        width: 0
        background-color: var(--color-cod)
        opacity: 0.25

    //
</style>
