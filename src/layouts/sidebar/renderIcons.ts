import { defineAsyncComponent } from 'vue'

type iconParam = {
  'iconName': string
}

export async function renderIcons(props: iconParam) {
  const { iconName } = props
  console.log(iconName)
  const icon = defineAsyncComponent(
    async() => {
      console.log(`w:async-icons/${iconName}`);
      const icon = await import(`w:async-icons/${iconName}`)
      return icon
    }
  )
  return h(icon)
}

export default renderIcons