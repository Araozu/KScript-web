import {ref, computed, onUnmounted, onMounted} from "vue";

export const useTamanoLetra = () => {

    const refElemento = ref(null);
    const altoE = ref(0);
    const anchoE = ref(0);

    const fnListener = () => {
        if (refElemento.value) {
            const alto = refElemento.value.scrollHeight;
            const ancho = refElemento.value.scrollWidth;

            if (altoE.value !== alto) {
                altoE.value = alto;
            }
            if (anchoE.value !== ancho) {
                anchoE.value = ancho;
            }
        }
    };

    const listener = setInterval(fnListener, 2500);

    onMounted(() => {
        fnListener();
    });

    onUnmounted(() => clearInterval(listener));

    const altoEX = computed(() => `${altoE}px`);
    const anchoEX = computed(() => `${anchoE}px`);

    return {
        refElemento,
        altoE,
        anchoE,
        altoEX,
        anchoEX
    }
};
