import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    files: ['js/**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        IntersectionObserver: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        requestAnimationFrame: 'readonly',
        mapboxgl: 'readonly',
        Math: 'readonly',
        Date: 'readonly',
        Object: 'readonly'
      }
    },
    rules: {
      'no-var': 'error',
      'prefer-const': 'warn',
      'eqeqeq': ['error', 'always'],
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
    }
  },
  {
    ignores: ['node_modules/**', 'dist/**']
  }
];
