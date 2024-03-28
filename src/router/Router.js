import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import MainView from "../views/MainView.vue";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "Login",
            component: Login,
        },
        {
            path: "/main",
            name: "MainView",
            component: MainView,
        },
    ],
});
