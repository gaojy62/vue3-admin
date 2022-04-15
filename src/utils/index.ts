import { isObject } from './is'

export function formatterStr(str: string = 'no content', rule: 'upper' | 'lower' = 'lower') {
  return str
    .split(" ")
    .filter((item) => item.length > 0)
    .map((item) => {
      if (rule === "upper") {
        return item.charAt(0).toUpperCase() + item.substring(1)
      } else {
        return item.charAt(0).toLowerCase() + item.substring(1)
      }
    })
    .join(" ");
}

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
}
