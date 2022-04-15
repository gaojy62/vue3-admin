export default {
  install: (app: any, options: any) => {
    app.config.globalProperties.$translate = (key: String) => {
      const res = key.split('.').reduce((obj, i) => {
        return obj[i]
      }, options)
      return res
    }
  }
}
