import { Ref } from "vue";
export interface IsCollapsed {
  isCollapsed: Ref<boolean>
  toggleCollapsed: () => void
}
