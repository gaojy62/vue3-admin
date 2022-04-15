import type { RouteRecordRaw } from 'vue-router'
import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import { getPageTitle } from '@/utils/pageTitle'
import { useUserStore } from '@/store/modules/user'
import { usePermissionStore } from '@/store/modules/permission'
import { message } from 'ant-design-vue'

NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, from) => {
  const userStore = useUserStore()
  NProgress.start()
  const token = getToken() // 获取持久化的 token，不能从 store 中取，只能从 cookie 中取
  document.title = getPageTitle(to?.meta?.title as string)
  if (token) {
    if (to.name === 'Login') {
      // 已知 routeRecord 有明确的 name 属性，可以直接返回 name 即可，会自动重定向到 name 所属的 route
      return { name: 'Index' }
    } else {
      // 有 token 没有 roles 说明时刚刚登陆成功或者刷新页面导致 store 丢失, 需要重新初始化 roles
      if (!userStore.hasRoles) {
        try {
          await userStore.getUserInfo()
          const roles = userStore.roles
          const accessRouters = await getAccessRoutes(roles)
          accessRouters.forEach(route => {
            router.addRoute(route)
          })
          return to.fullPath
        } catch(err) {
          message.error('获取用户权限失败，请重新登录')
          console.error(err)
          await userStore.resetToken()
          return { name: 'Login', query: { redirect: to.fullPath } }
        }
      }
    }
  } else {
    if (!to?.meta?.isWhitelist) { // 白名单不需要 token，非白名单需要重定向到 login 页面
      return { name: 'Login', query: { redirect: to.path } }
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})


async function getAccessRoutes (roles: string[]): Promise<RouteRecordRaw[]> {
  const permissionStore = usePermissionStore()
  const addRoutes =  await permissionStore.getAccessRoute(roles)
  return addRoutes
}
