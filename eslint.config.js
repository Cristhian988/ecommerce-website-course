import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    rules:{
      'no-unused-vars': 'error',     // Bloquea si hay variables sin usar
      'no-console': 'warn',         // Mantiene los console.log como advertencia (no bloquean)
      'react/prop-types': 'off',    // Si no usas TypeScript, esto evita falsos positivos
      'no-undef': 'error'           // Bloquea si intentas usar algo que no existe
      // Puedes añadir más reglas según necesites
    },
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
])
