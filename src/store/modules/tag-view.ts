import { defineStore } from "pinia"

export interface AllShowTag {
  name: string
  path: string
  fullPath: string
  meta?: { [x: string]: any }
  query?: { [x: string]: any }
  isSticky?: boolean
}

export const useTagView = defineStore("tagView", {
  state: (): {
    visitedView: AllShowTag[]
    cachedView: string[]
  } => ({
    visitedView: [],
    cachedView: [],
  }),
  getters: {
    getVisitedView: (state) => state.visitedView,
    getCachedView: (state) => state.cachedView,
  },
  actions: {
    add(route: AllShowTag) {
      this.addVisited(route)
      this.addCached(route)
    },
    addVisited(route: AllShowTag) {
      if (route.name === "Redirect") return false
      if (this.visitedView.find((v) => v.path === route.path)) return false
      this.visitedView.push(
        Object.assign({}, route, {
          title: route?.meta?.title || "no-title",
        })
      )
      return true
    },
    addCached(route: AllShowTag) {
      // 没有 name 属性的路由不会被缓存
      if (!route.name) return false
      if (this.cachedView.find((name) => name === route.name)) return false
      if (!route?.meta?.noCache) {
        this.cachedView.push(route.name as string)
      }
      return true
    },

    delete(route: AllShowTag): Promise<{
      visitedView: AllShowTag[]
      nextTagIndex: number
    }> {
      return new Promise((resolve, reject) => {
        let index = this.deleteVisited(route)
        index = Math.min(this.visitedView.length - 1, index)
        this.deleteCached(route)
        resolve({ visitedView: [...this.visitedView], nextTagIndex: index })
      })
    },
    deleteVisited(route: AllShowTag) {
      let index = -1
      this.visitedView = this.visitedView.filter((r, i) => {
        if (r.path === route.path) {
          index = i
        }
        return r.path !== route.path
      })
      return index
    },
    deleteCached(route: AllShowTag) {
      if (!route.name) return false
      this.cachedView = this.cachedView.filter((name) => name !== route.name)
      return true
    },

    deleteRight(
      router: AllShowTag
    ): Promise<{ visitedView: AllShowTag[]; cachedView: string[] }> {
      return new Promise(async (resolve, reject) => {
        try {
          await this.deleteRightVisited(router)
          await this.resetCached()
          resolve({
            visitedView: [...this.visitedView],
            cachedView: [...this.cachedView],
          })
        } catch (err) {
          reject(err)
        }
      })
    },
    deleteRightVisited(router: AllShowTag): Promise<AllShowTag[]> {
      return new Promise((resolve, reject) => {
        if (!router.path) return reject("route path is not exist")
        let index: number = this.visitedView.length
        this.visitedView = this.visitedView.filter((r, i) => {
          if (r.path === router.path) {
            index = i
          }
          return !router?.isSticky && i <= index
        })
        resolve([...this.visitedView])
      })
    },

    deleteOther(
      router: AllShowTag
    ): Promise<{ visitedView: AllShowTag[]; cachedView: string[] }> {
      return new Promise(async (resolve, reject) => {
        try {
          await this.deleteOtherVisited(router)
          await this.resetCached()
          resolve({
            visitedView: [...this.visitedView],
            cachedView: [...this.cachedView],
          })
        } catch (err) {
          reject(err)
        }
      })
    },
    deleteOtherVisited(router: AllShowTag): Promise<AllShowTag[]> {
      return new Promise((resolve, reject) => {
        if (!router.path) return reject("route path is not exist")
        this.visitedView = this.visitedView.filter((r, i) => {
          return r.path === router.path || r.isSticky
        })
        resolve([...this.visitedView])
      })
    },
    
    resetCached(): Promise<string[]> {
      return new Promise((resolve) => {
        this.visitedView.forEach((visited) => {
          if (visited.name) this.cachedView.push(visited.name)
        })
        resolve([...this.cachedView])
      })
    },
  }
})
export default useTagView
