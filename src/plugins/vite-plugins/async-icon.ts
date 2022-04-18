export default function asyncImportIcon() {
  const virtualModuleId = 'virtual:posts/async-icons'
  let resolveVirtualModuleId = ''
  return {
    name: 'async-import-icons', 
    enforce: 'pre',
    resolveId(id: string) {
      if (id.startsWith(virtualModuleId)) {
        resolveVirtualModuleId = `${id.replace(virtualModuleId, '~icons')}.js`
        return resolveVirtualModuleId
      }
      return null
    },
    load(id: string) {
      if (id === resolveVirtualModuleId) {
        return `const icon = async() => await import('${JSON.stringify(id)}')\nexport default icon`
      }
    }
  }
}