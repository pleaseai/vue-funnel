import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: true,
  formatters: {
    css: true,
    html: true,
    markdown: true,
  },
  ignores: [
    '**/dist',
    '**/node_modules',
    '**/.nuxt',
    '**/.output',
    '**/coverage',
    '**/.turbo',
  ],
}, {
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'vue/multi-word-component-names': 'off',
  },
})
