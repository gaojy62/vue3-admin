import { defineStore } from "pinia"
import { asyncRoutes, staticRoutes } from "@/router/index"
import { RouteRecordRaw } from "vue-router"
export const usePermissionStore = defineStore("permission", {
  state: (): { routes: RouteRecordRaw[]; addRoutes: RouteRecordRaw[] } => ({
    routes: [],
    addRoutes: [],
  }),
  getters: {
    getAllRoutes: state => state.routes,
    getAddRoutes: state => state.addRoutes
  },
  actions: {
    async getAccessRoute(roles: string[]): Promise<RouteRecordRaw[]> {
      return new Promise(resolve => {
        let accessedRoutes = []
        if (roles.includes('admin')) {
          accessedRoutes = asyncRoutes || []
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        }
        this.routes = staticRoutes.concat(accessedRoutes)
        this.addRoutes = accessedRoutes
        resolve(accessedRoutes)
      })
    },
  },
})

function filterAsyncRoutes(
  asyncRoutes: RouteRecordRaw[],
  roles: string[]
): RouteRecordRaw[] {
  let res: RouteRecordRaw[] = []
  const rolesSet = new Set(roles)
  asyncRoutes.forEach((route) => {
    const routeCopy = { ...route }
    if (hasPermission(routeCopy, rolesSet)) {
      if (routeCopy.children) {
        routeCopy.children = filterAsyncRoutes(routeCopy.children, roles)
      }
      res.push(routeCopy)
    }
  })
  return res
}

function hasPermission(route: RouteRecordRaw, rolesSet: Set<string>): boolean {
  console.log(rolesSet);
  if (!route?.meta?.roles) return true
  for (const role of route.meta.roles as string[]) {
    if (rolesSet.has(role)) {
      return true
    }
  }
  return false
}

export default usePermissionStore
