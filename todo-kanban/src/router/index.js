import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import KanbanBooard from "@/components/kanbanBooard.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "kanban",
      component: KanbanBooard,
    },
  ],
});

export default router;
