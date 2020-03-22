
export default {
    mode: 'universal',
    /*
    ** Headers of the page
    */
    head: {
        title: "Kan",
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: "Lenguaje de programación funcional que se compila a JavaScript." }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Roboto&display=swap" },
            { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Sen&display=swap" },
            { rel: "stylesheet", href: "https://cdn.jsdelivr.net/gh/tonsky/FiraCode@1.207/distr/fira_code.css"}
        ]
    },
    /*
    ** Customize the progress-bar color
    */
    loading: { color: "#03A9F4" },
    /*
    ** Global CSS
    */
    css: [
        "@/sass/global.sass"
    ],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
    ],
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
    ],
    /*
    ** Nuxt.js modules
    */
    modules: [
        '@nuxtjs/pwa',
    ],
    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend (config, ctx) {
            config.module.rules.push({
                test: /\.coffee$/,
                loader: 'coffee-loader',
            });
        }
    }
}
