import js from '@eslint/js';
import globals from 'globals';

export default [{
  ignores: [
    'tmp/**',
    'dist/**',
    'node_modules/**',
    'reports/**',
    'tests/fixtures/**'
  ]
}, {
  name: 'node',
  ...js.configs.recommended,
  languageOptions: {
    globals: {
      ...globals.node
    }
  }
}, {
  name: 'tests',
  files: [
    'tests/**'
  ],
  languageOptions: {
    globals: {
      ...globals.mocha
    }
  }
}]