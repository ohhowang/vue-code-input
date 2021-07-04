module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:vue/essential', 'standard'],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'no-undef': 0,
    'space-before-function-paren': 0,
    'no-extra-boolean-cast': 0,
    'multiline-ternary': ['error', 'never'],
    'vue/require-valid-default-prop': 0,
    'vue/no-multiple-template-root': 0,
    'vue/no-v-model-argument': 0,
    'vue/no-unused-vars': 1,
    'vue/no-v-for-template-key': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-unused-vars': 0,
    'symbol-description': 0,
    'vue/no-unused-components': 1,
    'no-array-constructor': 0,
    'no-case-declarations': 0
  }
}
