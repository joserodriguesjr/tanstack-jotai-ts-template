import { defineConfig, globalIgnores } from 'eslint/config';
import checkFile from 'eslint-plugin-check-file';
import unusedImports from 'eslint-plugin-unused-imports';
import _import from 'eslint-plugin-import';
import { fixupPluginRules, fixupConfigRules } from '@eslint/compat';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import pluginRouter from '@tanstack/eslint-plugin-router'
import crossImporter from './.plugins/eslint-plugin-cross-importer.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  ...pluginRouter.configs['flat/recommended'],

  globalIgnores([
    '.output/*',
    '.vinxi/*',
    'node_modules/*',
    'data/*',
    'drizzle/*',
    'public/*',
    'vite.sw.config.ts',
    'tsconfig.json',
    'package.json',
    'package-lock.json',
    'generators/*',
  ]),
  {
    extends: compat.extends('eslint:recommended'),

    plugins: {
      import: fixupPluginRules(_import),
      'check-file': checkFile,
      'cross-importer': crossImporter,
      'unused-imports': unusedImports,
    },

    languageOptions: {
      globals: {
        ...globals.node,
      },

      ecmaVersion: 'latest',
      sourceType: 'module',
    },

    linterOptions: {
      reportUnusedDisableDirectives: false,
    },

    rules: {
      'cross-importer/check': 'error',
    },
  },

  {
    files: [
      'app/**/*.ts',
      'app/**/*.tsx',
      'server/**/*.ts',
      'app.config.ts',
    ],

    extends: fixupConfigRules(
      compat.extends(
        'eslint:recommended',
        'plugin:import/errors',
        'plugin:import/recommended',
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
              group: ['../'],
              message: 'Relative imports are not allowed.',
            },
          ],
        },
      ],

      'import/no-internal-modules': [
        'error',
        {
          forbid: [
            // folders
            // '**/ui/*',
            // '**/api/*',
            // '**/model/*',
            // file type
            '**/*.ui',
            '**/*.api',
            '**/*.model',
          ],
        },
      ],

      'import/no-restricted-paths': [
        'error',
        {
          // 'target' contains the paths where the restricted imports should be applied.
          // 'from' paths define the folders that are not allowed to be used in an import.
          // 'except' may be defined for a zone, allowing exception paths that would otherwise violate the related 'from'.
          // “when linting a file inside 'target', if it imports a file from 'from', that’s an error”.
          // e.g. 'target' can't import 'from', unless 'from' == 'except'
          zones: [
            // ❌ Prevent lower layers from importing higher layers (Following FSD)
            {
              target: './app/shared',
              from: './app',
              except: ['./shared'],
              message: 'Shared should not depend on other layers.',
            },
            {
              target: './app/entities',
              from: './app',
              except: ['./entities', './shared'],
              message:
                'Entities should not depend on features, widgets or pages.',
            },
            {
              target: './app/features',
              from: './app',
              except: ['./features', './entities', './shared'],
              message: 'Features should not depend on widgets or pages.',
            },
            {
              target: './app/widgets',
              from: './app',
              except: ['./widgets', './features', './entities', './shared'],
              message: 'Widgets should not depend on pages.',
            },

            // ❌ Only entities/api can import server code
            {
              target: [
                './app/shared',
                './app/entities/*/!(api)/**',
                './app/features',
                './app/widgets',
                './app/pages',
              ],
              from: './server',
              message: 'Only an entity API can access server code.',
            },

            // ❌ Server side can't depend on client side
            {
              target: './server',
              from: './app',
              message: 'Server side cant depend on client side.',
            },

            // ❌ Prevent cross-entity imports (entities should not depend on each other)
            {
              target: './app/entities/pokemon',
              from: './app/entities',
              except: ['./pokemon'],
              message: '[pokemon] entity must be independent.',
            },

            // ❌ Prevent cross-feature imports (features should not import each other)
            {
              target: './app/features/pokemon',
              from: './app/features',
              except: ['./pokemon'],
              message:
                '[pokemon] should not import another feature. Use entities/shared instead.',
            },
            {
              target: './app/features/mercado-pago',
              from: './app/features',
              except: ['./mercado-pago'],
              message:
                '[mercado-pago] should not import another feature. Use entities/shared instead.',
            },

            // ❌ Prevent cross-widget imports (entities should not depend on each other)
            {
              target: './app/widgets/pokemon',
              from: './app/widgets',
              except: ['./pokemon'],
              message:
                '[pokemon] should not import another widget. Use features/entities/shared instead',
            },
          ],
        },
      ],

      'import/no-cycle': 'error',
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
          ignore: ['@/', '@server/'],
        },
      ],
      'import/no-named-as-default-member': 'off',
      'import/no-named-as-default': 'off',
      'import/no-unresolved': [
        'error',
        {
          ignore: ['@/', '@server/'],
        },
      ],

      'linebreak-style': ['error', 'unix'],

      'react/prop-types': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'off',

      'jsx-a11y/anchor-is-valid': 'off',

      '@typescript-eslint/no-unused-vars': ['error'],
      'no-unused-vars': 'off', // or "@typescript-eslint/no-unused-vars": "off",
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/explicit-function-return-type': ['off'],
      '@typescript-eslint/explicit-module-boundary-types': ['off'],
      '@typescript-eslint/no-empty-function': ['off'],
      '@typescript-eslint/no-explicit-any': ['off'],

      'no-useless-rename': [
        'error',
        {
          ignoreDestructuring: false,
          ignoreImport: false,
          ignoreExport: false,
        },
      ],

      yoda: ['error'],

      'sort-vars': ['error'],

      'vars-on-top': ['error'],

      'prefer-const': ['error'],
      'prefer-object-spread': ['error'],
      'prefer-rest-params': ['error'],
      'prefer-template': ['error'],

      radix: ['error'],

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
    files: [
      'app/**/*.ts',
      'app/**/*.tsx',
      'server/**/*.ts',
    ],
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
