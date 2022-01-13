import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import DoctorRegister from "@/components/DoctorRegister";
// lazy-loaded
const Notifications = () => import("./components/Notifications.vue")
const Profile = () => import("./components/Profile.vue")
// const BoardAdmin = () => import("./components/BoardAdmin.vue")
// const BoardUser = () => import("./components/BoardUser.vue")
// const AddProject = () => import("./components/AddProject.vue")

const routes = [
  {
    path: "/",
    name: "home",
    component: Login,
    // beforeEnter: (to, from, next) => {
    //  TODO: добавить проверку, по ключу с бека, что человек вошел
    // }
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/register/doctor",
    component: DoctorRegister,
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: Profile,
  },
  {
    path: "/notifications",
    name: "notifications",
    // lazy-loaded
    component: Notifications,
  },
  // {
  //   path: "/admin",
  //   name: "admin",
  //   // lazy-loaded
  //   component: BoardAdmin,
  // },
  // {
  //   path: "/user",
  //   name: "user",
  //   // lazy-loaded
  //   component: BoardUser,
  // },
  // {
  //   path: "/add",
  //   name: "add",
  //   // lazy-loaded
  //   component: AddProject,
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});



export default router;