module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'standard',
    'prettier',
    'plugin:node/recommended'
  ],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': ['error', { 'singleQuote': true }],
    'no-console': 0,
    'no-unused-vars': 'warn',
    'node/no-unsupported-features/es-syntax': 0,
    'no-process-exit': 0
  }
}
