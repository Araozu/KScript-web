<template lang="pug">
div.consola
    div.titulo-consola Consola
    div.contenido(v-if="codigoCompilado.ok")
        div.contenido-linea(v-for="linea in lineas")
            div(v-if="linea.ok" v-html="linea.ok")
            div.contenido-linea-err(v-else-if="linea.err" v-html="linea.err")

//
</template>

<script>
    import {ref, watchEffect} from "vue";

    const consolaLogBackup = console.log;

    const escapar = (txt) => {
        return txt.replace(/\n/g, "<br>").replace(/\s/g, "&nbsp;");
    };

    export default {
        name: "consola-repl-docs",
        props: {
            codigoCompilado: {
                type: Object,
                required: true
            }
        },
        setup(props) {
            const lineas = ref([]);

            const consolaLogNueva = (...args) => {
                lineas.value.push({ok: escapar(args.join(" "))});
                consolaLogBackup.apply(console, args);
            };

            const ejecutarCodigo = (codigo) => {
                try {
                    lineas.value = [];
                    console.clear();
                    console.log = consolaLogNueva;
                    const f = Function(codigo);
                    f();
                } catch (e) {
                    console.error(e);
                    lineas.value.push({err: `${e.name}: ${e.message}`});
                } finally {
                    console.log = consolaLogBackup;
                }
            };

            watchEffect(() => {
                if (props.codigoCompilado.ok) {
                    const codigo = props.codigoCompilado.cod;
                    ejecutarCodigo(codigo);
                }
            });

            return {
                lineas
            };
        }
    }

</script>

<style scoped lang="sass">

    .consola
        height: 100%

    .titulo-consola
        border-bottom: solid 1px #4CAF50
        font-family: var(--fuenteTitulo)
        padding: 0.5rem

    .contenido
        font-family: "JetBrains Mono", monospace

    .contenido-linea
        border-bottom: solid 1px var(--color-borde)
        padding: 0.5rem

    .contenido-linea-err
        color: var(--colorSecundario)

    //
</style>
