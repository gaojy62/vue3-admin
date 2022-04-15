import { defineConfig } from 'windicss/helpers'
export default defineConfig({
  darkMode: 'class',
  shortcuts: {
    'bg-model': 'backdrop-blur-2xl bg-light-50/20 rounded-2xl overflow-hidden',
    'flex-center': 'flex items-center justify-center',
    'thin-scrollbar': {
      '&::-webkit-scrollbar': {
        width: '5px'
      },
      '&::-webkit-scrollbar-track': {
        'background-color': 'transparent'
      },
      '&::-webkit-scrollbar-thumb': {
        'background-color': 'rgba(0, 0, 0, 0.2)',
        'border-radius': '5px'
      }
    },
  },
  plugins: [
  ],
  variants: {
  }
})
