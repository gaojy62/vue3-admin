import type { RouteRecordRaw } from "vue-router"
import { createRouter, createWebHistory } from "vue-router"

import Layout from "@/layouts/index.vue"
import Index from "@/views/index.vue"
import "vue-router"

declare module "vue-router" {
  interface RouteMeta {
    // the title of the page && breadcrumb && sidebar
    title?: string
    // true: hide the breadcrumb, false: show the breadcrumb
    noBreadcrumb?: boolean
    // true: hide in the sidebar, false: show in the sidebar
    hidden?: boolean
    // do not need token, means do not need login
    isWhitelist?: boolean
    //is true alway show in side bar is false only one children, the path tree will show the child, the child property will cover the parent
    showSideBar?: boolean
    // user can access the page
    roles?: string[]
    // noCache: true: do not cache the page, false: cache the page, default is false
    noCache?: boolean
    // alway show in tag view, must have one
    sticky?: boolean
  }
}

export const staticRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Layout,
    redirect: "/index",
    meta: {
      icon: async () => await import("~icons/ant-design/appstore-outlined"),
    },
    children: [
      {
        path: "index",
        component: Index,
        name: "Index",
        meta: {
          title: "dashboard",
          sticky: true,
          noBreadcrumb: true,
          icon: async () => await import("~icons/ant-design/appstore-outlined"),
        },
      },
    ],
  },
  {
    path: "/guard",
    component: Layout,
    redirect: "/guard/index",
    meta: {
      title: "guard",
      icon: async () => await import("~icons/ant-design/compass-outlined"),
    },
    children: [
      {
        name: "Guard",
        path: "index",
        component: () => import("@/views/guard.vue"),
        meta: {
          title: "guard1",
          icon: async () => await import("~icons/ant-design/appstore-outlined"),
        },
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    name: "Login",
    meta: {
      title: "login",
      hidden: true,
      isWhitelist: true,
    },
  },
  {
    path: "/404",
    component: () => import(/* webpackChunkName: "404" */ "@/views/404.vue"),
    name: "404",
    meta: {
      title: "404",
      hidden: true,
      isWhitelist: true,
    },
  },
  {
    path: "/401",
    component: () => import(/* webpackChunkName: "404" */ "@/views/401.vue"),
    name: "401",
    meta: {
      title: "401",
      hidden: true,
      isWhitelist: true,
    },
  },
  {
    path: "/redirect",
    component: Layout,
    meta: {
      hidden: true,
      noCache: true,
    },
    children: [
      {
        name: "Redirect",
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue"),
      },
    ],
  },
]

export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: "/permission",
    component: Layout,
    name: "Permission",
    redirect: "/permission/user",
    meta: {
      title: "Permission",
      icon: async () => await import("~icons/ant-design/appstore-outlined"),
      showSideBar: true,
    },
    children: [
      {
        path: "admin",
        name: "admin",
        component: () => import("@/views/permission/admin.vue"),
        meta: {
          title: 'Admin Permission',
          icon: async () => await import("~icons/ant-design/appstore-outlined"),
          roles: ["admin"],
          showSideBar: true,
        },
        children: [
          {
            path: "admin",
            name: "admin1",
            component: () => import("@/views/permission/admin.vue"),
            meta: {
              title: 'Admin 1',
              roles: ["admin"],
            },
          }
        ]
      },
      {
        name: "user",
        path: "user",
        component: () => import("@/views/permission/user.vue"),
        meta: {
          title: "User Permission",
          icon: async () => await import("~icons/ant-design/appstore-outlined"),
          roles: ["user"],
        },
      },
    ],
  },
  // 404 page must be placed at the end !!!
  { path: "/:pathMatch(.*)*", redirect: "/404", meta: { hidden: true } },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL as string),
  routes: staticRoutes,
})

export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name, meta } = route
    if (name && meta?.roles)
      // 只删除有 role 的路由，不带 role 的路由表示所有用户都可访问
      router.hasRoute(name) && router.removeRoute(name)
  })
}

export default router
