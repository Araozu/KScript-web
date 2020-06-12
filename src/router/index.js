import {createRouter, createWebHashHistory} from 'vue-router';
import Inicio from "../views/Inicio.vue"
import Docs from "../views/Docs.vue"
import Docs_ from "../views/Docs/_.vue"

const routes = [
    {
        path: '/',
        name: 'Inicio',
        component: Inicio
    },
    {
        path: "/docs/",
        name: "Docs",
        component: Docs,
        children: [
            {
                path: "",
                redirect: "/docs/introduccion/"
            },
            {
                path: ":catchAll(.*)",
                name: "Docs_",
                component: Docs_
            }
        ]
    }
];

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
});

export default router;
