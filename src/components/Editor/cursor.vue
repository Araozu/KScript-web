<template lang="pug">
div.indicador-cursor-editor(:style="[estilosIndicador, variables]")

//
</template>

<script>
    import {ref, computed, watch, onMounted, onUnmounted} from "vue";

    export default {
        name: "cursor",
        props: {
            largosLineas: {
                type: Array,
                required: true
            },
            posAbsCursor: {
                type: Number,
                required: true
            },
            posTop: {
                type: Number,
                required: true
            },
            posLeft: {
                type: Number,
                required: true
            },
            enFoco: {
                type: Boolean,
                required: true
            }
        },
        setup(props) {
            const posXIndicador = ref(0);
            const posYIndicador = ref(0);
            const cursorOculto = ref(false);
            const cursorMoviendose = ref(false);

            const dummyPosAbsCursor = computed(() => props.posAbsCursor);

            const estilosIndicador = computed(() => {
                return {
                    opacity: (!props.enFoco || (cursorOculto.value && !cursorMoviendose.value) ? "0" : "0.9")
                }
            });

            let intervaloParpadeoCursor;
            const funParpadeoCursor = () => {
                cursorOculto.value = !cursorOculto.value;
            };

            let timeoutCursorMoviendose;
            const actualizarCursor = (nuevaPos) => {
                let posAbsolutaActual = 0;
                let offsetLinea = 0;
                for (const largoLinea of props.largosLineas) {
                    if (nuevaPos <= posAbsolutaActual + largoLinea) {
                        posXIndicador.value = nuevaPos - posAbsolutaActual;
                        posYIndicador.value = offsetLinea;
                        cursorMoviendose.value = true;

                        if (timeoutCursorMoviendose) {
                            clearTimeout(timeoutCursorMoviendose);
                            timeoutCursorMoviendose = undefined;
                        }
                        if (intervaloParpadeoCursor) {
                            clearInterval(intervaloParpadeoCursor);
                            intervaloParpadeoCursor = undefined;
                        }
                        timeoutCursorMoviendose = setTimeout(() => {
                            cursorMoviendose.value = false;
                            cursorOculto.value = true;
                            clearTimeout(timeoutCursorMoviendose);
                            clearInterval(intervaloParpadeoCursor);
                            intervaloParpadeoCursor = setInterval(funParpadeoCursor, 600);
                            timeoutCursorMoviendose = undefined;
                        }, 500);

                        break;
                    } else {
                        posAbsolutaActual += largoLinea + 1;
                        offsetLinea++;
                    }
                }
            };

            watch(dummyPosAbsCursor, actualizarCursor);

            onMounted(() => {
                intervaloParpadeoCursor = setInterval(funParpadeoCursor, 600);
            });

            onUnmounted(() => {
                if (intervaloParpadeoCursor) clearInterval(intervaloParpadeoCursor);
                if (timeoutCursorMoviendose) clearTimeout(timeoutCursorMoviendose);
            });

            const variables = computed(() => `--posX: ${posXIndicador.value}; --posY: ${posYIndicador.value};`)

            return {
                estilosIndicador,
                variables
            }
        }
    }

</script>

<style lang="sass" vars="{posX, posY}">

    .indicador-cursor-editor
        z-index: 3
        position: absolute
        width: 2px
        height: var(--altoE)
        background-color: var(--color-cod)
        top: calc(var(--altoE) / 2 + 2px)
        left: calc(var(--anchoE) * 3 + var(--anchoE) * var(--numDigitos) + 1px)
        transform: translateX(calc(var(--posX) * var(--anchoE))) translateY(calc(var(--posY) * var(--altoE) * 1.1))

    //
</style>
