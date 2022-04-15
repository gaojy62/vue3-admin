import defaultSetting from '@/settings'

const defaultTitle = defaultSetting?.title || 'whoami'

export function getPageTitle (title: string | undefined) {
  if (title) {
    return `${title} - ${defaultTitle}`
  }
  return `${defaultTitle}`
}
