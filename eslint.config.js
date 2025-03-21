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
import crossImporter from './.plugins/eslint-plugin-cross-importer.mjs';

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
      'cross-importer': crossImporter,
    },

    languageOptions: {
      globals: {
        ...globals.node,
      },

      ecmaVersion: 'latest',
      sourceType: 'module',
    },

    rules: {
      'cross-importer/check': 'error',
    },
  },
  {
    files: ['src/**/*.ts', 'src/**/*.tsx', 'app/**/*.ts', 'app/**/*.tsx'],

    ignores: ['src/app/**'],

    rules: {
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
              target: './src/shared',
              from: './src',
              except: ['./shared'],
              message: 'Shared should not depend on other layers.',
            },
            {
              target: './src/entities',
              from: './src',
              except: ['./entities', './shared'],
              message:
                'Entities should not depend on features, widgets or pages.',
            },
            {
              target: './src/features',
              from: './src',
              except: ['./features', './entities', './shared'],
              message: 'Features should not depend on widgets or pages.',
            },
            {
              target: './src/widgets',
              from: './src',
              except: ['./widgets', './features', './entities', './shared'],
              message: 'Widgets should not depend on pages.',
            },
            // Commented because app folder is outside for TanStack Start
            // {
            //   target: './src/pages',
            //   from: './src',
            //   except: [
            //     './pages',
            //     './widgets',
            //     './features',
            //     './entities',
            //     './shared',
            //   ],
            //   message: 'Pages should not depend on app.',
            // },
            {
              target: './src',
              from: './app',
              message: 'Source files should not depend on app.',
            },

            // ❌ Only entities/api can import server code
            {
              target: [
                './src/shared',
                './src/entities/*/!(api)/**',
                './src/features',
                './src/widgets',
                './src/pages',
              ],
              from: './server',
              message: 'Only an entity API can access server code.',
            },

            // ❌ Server side can't depend on client side
            {
              target: './server',
              from: './src',
              message: 'Server side cant depend on client side.',
            },
            {
              target: './server',
              from: './app',
              message: 'Server side cant depend on client side.',
            },

            // ❌ Prevent cross-entity imports (entities should not depend on each other)
            {
              target: './src/entities/pokemon',
              from: './src/entities',
              except: ['./pokemon'],
              message: '[pokemon] entity must be independent.',
            },

            // ❌ Prevent cross-feature imports (features should not import each other)
            {
              target: './src/features/pokemon',
              from: './src/features',
              except: ['./pokemon'],
              message:
                '[pokemon] should not import another feature. Use entities/shared instead.',
            },
            {
              target: './src/features/mercado-pago',
              from: './src/features',
              except: ['./mercado-pago'],
              message:
                '[mercado-pago] should not import another feature. Use entities/shared instead.',
            },

            // ❌ Prevent cross-widget imports (entities should not depend on each other)
            {
              target: './src/widgets/pokemon',
              from: './src/widgets',
              except: ['./pokemon'],
              message:
                '[pokemon] should not import another widget. Use features/entities/shared instead',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/**/*.ts', 'src/**/*.tsx', 'app/**/*.ts', 'app/**/*.tsx'],

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
              group: ['../'],
              message: 'Relative imports are not allowed.',
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
          ignore: ['@/', '@app/', '@server/'],
        },
      ],
      'import/no-named-as-default-member': 'off',
      'import/no-named-as-default': 'off',

      'import/no-unresolved': [
        'error',
        {
          ignore: ['@/', '@app/', '@server/'],
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
    ignores: ['src/pages/**/*'],
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
