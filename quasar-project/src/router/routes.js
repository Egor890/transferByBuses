const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "Index",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "/tickets/:id",
        name: "tickets",
        component: () => import("pages/TicketsList.vue"),
      },
      {
        path: "/SignUp",
        name: "SignUp",
        component: () => import("pages/SignUp.vue"),
      },
      {
        path: "/SignIn",
        name: "SignIn",
        component: () => import("pages/SignIn.vue"),
      },
      {
        path: "/Admin",
        name: "Admin",
        component: () => import("pages/AdminPanel.vue"),
      },
      {
        path: "/CreateRoute",
        name: "CreateRoute",
        component: () => import("pages/CreateRoute.vue"),
      },
      {
        path: "/TicketOrder/:info",
        name: "TicketOrder",
        component: () => import("pages/TicketOrder.vue"),
      },
      {
        path: "/ProfileDefault",
        name: "ProfileDefault",
        component: () => import("pages/ProfileDefault.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
