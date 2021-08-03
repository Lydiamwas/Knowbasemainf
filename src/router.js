import { createRouter, createWebHistory } from 'vue-router'


const routes =  [

        {
            path: "/",
            alias: "/kbdocs",
            name: "kbdocs",
            component: () => import("./components/KbdocsList")
        },
        {
            path: "/kbdocs/:id",
            name: "Kbdoc-details",
            component: () => import("./components/Kbdocs")
        },
        {
            path: "/add",
            name: "add",
            component: () => import("./components/AddKbdoc")
        },
       
    ]

    const router = createRouter({
        history: createWebHistory(process.env.BASE_URL),
        routes
    })

    export default router
