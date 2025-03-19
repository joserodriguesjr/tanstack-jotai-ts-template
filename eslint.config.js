import { defineConfig, globalIgnores } from 'eslint/config';
import checkFile from 'eslint-plugin-check-file';
import _import from 'eslint-plugin-import';
import { fixupPluginRules, fixupConfigRules } from '@eslint/compat';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores([
    '.output/*',
    '.vinxi/*',
    'node_modules/*',
    'data/*',
    'drizzle/*',
    'public/mockServiceWorker.js',
    'generators/*',
  ]),
  {
    extends: compat.extends('eslint:recommended'),

    plugins: {
      import: fixupPluginRules(_import),
      'check-file': checkFile,
    },

    languageOptions: {
      globals: {
        ...globals.node,
      },

      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],

    extends: fixupConfigRules(
      compat.extends(
        'eslint:recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:testing-library/react',
        'plugin:jest-dom/recommended',
        'plugin:prettier/recommended',
        // 'plugin:tailwindcss/recommended',
        // 'plugin:vitest/legacy-recommended',
      ),
    ),

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      parser: tsParser,
    },

    settings: {
      react: {
        version: 'detect',
      },

      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
    },

    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['./', '../'],
              message: 'Relative imports are not allowed.',
            },
          ],
        },
      ],

      'import/no-restricted-paths': [
        'error',
        {
          // 'target' contains the paths where the restricted imports should be applied.
          // 'from' paths define the folders that are not allowed to be used in an import.
          // 'except' may be defined for a zone, allowing exception paths that would otherwise violate the related 'from'.
          // e.g. 'target' can't import 'from', unless 'from' == 'except'
          zones: [
            // enforce unidirectional codebase:
            // e.g app/features can import from these shared modules but not the other way around
            {
              target: [
                './app/components',
                './app/hooks',
                './app/lib',
                './app/types',
                './app/utils',
              ],
              from: ['./app/features'],
            },
            // disables cross-feature imports:
            // eg. app/features/pokemons should not import from other features
            {
              target: './app/features/pokemons',
              from: './app/features',
              except: ['./pokemons'],
            },
          ],
        },
      ],

      'import/no-cycle': 'error',
      'linebreak-style': ['error', 'unix'],
      'react/prop-types': 'off',

      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
          ],
          'newlines-between': 'always',

          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      'import/default': 'off',
      'import/no-relative-packages': 'error',
      'import/no-relative-parent-imports': [
        'error',
        {
          ignore: ['@/'],
        },
      ],
      'import/no-named-as-default-member': 'off',
      'import/no-named-as-default': 'off',

      'import/no-unresolved': [
        'error',
        {
          ignore: ['^@/'],
        },
      ],

      // 'import/no-unused-modules': [
      //   1,
      //   {
      //     missingExports: true,
      //     unusedExports: true,
      //   },
      // ],

      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      '@typescript-eslint/no-unused-vars': ['error'],
      '@typescript-eslint/explicit-function-return-type': ['off'],
      '@typescript-eslint/explicit-module-boundary-types': ['off'],
      '@typescript-eslint/no-empty-function': ['off'],
      '@typescript-eslint/no-explicit-any': ['off'],

      'prettier/prettier': [
        'error',
        {},
        {
          usePrettierrc: true,
        },
      ],
    },
  },
  {
    ignores: ['app/routes/**/*'],
    rules: {
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/*.{ts,tsx}': 'KEBAB_CASE',
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
      'check-file/folder-naming-convention': [
        'error',
        {
          '**/*.{ts,tsx}': 'KEBAB_CASE',
        },
      ],
    },
  },
  // {
  //   files: ['app/**/!(__tests__)/*'],
  //   plugins: {
  //     'check-file': checkFile,
  //   },
  //   rules: {
  //     'check-file/folder-naming-convention': [
  //       'error',
  //       {
  //         '**/*': 'KEBAB_CASE',
  //       },
  //     ],
  //   },
  // },
]);
