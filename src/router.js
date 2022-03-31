import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/Home.vue";
import ContactPage from "./pages/contact.vue";
import TagArchieve from "@/pages/TagArchieve.vue";

import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";
import useAuthStore from "./store/auth";

const routes = [
  { name: "home", path: "/", component: HomePage },
  {
    path: "/:slug",
    name: "jobs.details",
    component: () => import("@/pages/JobDetails.vue"),
  },
  {
    path: "/my-jobs",
    name: "jobs.mine",
    component: () => import("@/pages/my-jobs.vue"),
  },
  { name: "tag.jobs", path: "/tags/:slug", component: TagArchieve },
  {
    name: "auth.register",
    path: "/register",
    component: Register,
  },
  { name: "auth.login", path: "/login", component: Login },
  {
    path: "/jobs",
    component: () => import("@/components/JobFormLayout.vue"),
    meta: { auth: true },
    children: [
      {
        name: "jobs.create",
        path: "create",
        component: () => import("@/pages/jobs/create.vue"),
      },
      {
        name: "jobs.update",
        path: "update/:id",
        component: () => import("@/pages/jobs/update.vue"),
      },
    ],
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  if (to?.meta?.auth && !auth.loggedIn) return next("/login");
  next();
});

export default router;
