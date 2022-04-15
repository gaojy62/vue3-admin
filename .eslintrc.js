module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/vue3-essential', // 基本的
    
    // 'plugin:vue/vue3-recommended', // 推荐的
    // 'plugin:vue/vue3-strongly-recommended', // 强烈推荐的
    'eslint:recommended',
    'vue-global-api',
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 13,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  rules: {
    // 'no-undef': 'off'
    'vue/multi-word-component-names': [
      'off',
      { ignores: ['default'] }
    ]
  }
}
