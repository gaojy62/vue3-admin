import { defineConfig } from 'windicss/helpers'
import scrollSnapPlugin from 'windicss/plugin/scroll-snap'
export default defineConfig({
  darkMode: 'class',
  shortcuts: {
    'bg-model': 'backdrop-blur-2xl bg-light-50/20 rounded-2xl overflow-hidden',
    'flex-center': 'flex items-center justify-center',
    'thin-scrollbar': {
      '&::-webkit-scrollbar': {
        'width': '2px',
        'height': '2px',
      },
      '&::-webkit-scrollbar-track': {
        'background-color': 'transparent'
      },
      '&::-webkit-scrollbar-thumb': {
        'background-color': 'rgba(0, 0, 0, 0.2)',
        'border-radius': '2px',
        'height': '2px',
      }
    },
  },
  plugins: [
    scrollSnapPlugin
  ],
  variants: {
  }
})
