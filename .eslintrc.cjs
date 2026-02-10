module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:boundaries/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'prettier', 'import', 'boundaries'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': 'warn',

    // Правила boundaries для FSD
    'boundaries/element-types': [
      'error',
      {
        default: 'disallow',
        rules: [
          // Страницы могут импортировать из любых слоев
          {
            from: ['pages'],
            allow: ['widgets', 'features', 'entities', 'shared'],
          },
          // Виджеты могут импортировать из features, entities, shared
          {
            from: ['widgets'],
            allow: ['features', 'entities', 'shared'],
          },
          // Фичи могут импортировать из entities, shared
          {
            from: ['features'],
            allow: ['entities', 'shared'],
          },
          // Сущности могут импортировать только из shared
          {
            from: ['entities'],
            allow: ['shared'],
          },
          // Shared могут импортировать только внутри себя
          {
            from: ['shared'],
            allow: ['shared'],
          },
        ],
      },
    ],

    // Правила импортов
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'index',
          'object',
          'type',
        ],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@app/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@pages/**',
            group: 'internal',
          },
          {
            pattern: '@widgets/**',
            group: 'internal',
          },
          {
            pattern: '@features/**',
            group: 'internal',
          },
          {
            pattern: '@entities/**',
            group: 'internal',
          },
          {
            pattern: '@shared/**',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],

    'import/no-internal-modules': [
      'error',
      {
        forbid: [
          // Запрещаем импортировать из внутренних модулей
          '@app/**/*/*',
          '@pages/**/*/*',
          '@widgets/**/*/*',
          '@features/**/*/*',
          '@entities/**/*/*',
          '@shared/**/*/*',
        ],
        allow: [
          // Разрешаем импортировать только из публичного API
          '@app/**/index',
          '@pages/**/index',
          '@widgets/**/index',
          '@features/**/index',
          '@entities/**/index',
          '@shared/**/index',
          // Разрешаем импортировать компоненты UI напрямую
          '@shared/ui/**',
          // Разрешаем импортировать типы
          '@shared/types/**',
        ],
      },
    ],

    // Запрещаем относительные пути выше одного уровня
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['../*'],
            message: 'Используйте абсолютные пути через алиасы',
          },
          {
            group: ['src/*'],
            message: 'Используйте алиасы (@app, @pages, etc.) вместо src',
          },
        ],
      },
    ],

    // Дополнительные правила
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'react/prop-types': 'off',
  },
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
      alias: {
        map: [
          ['@', './src'],
          ['@app', './src/app'],
          ['@pages', './src/pages'],
          ['@widgets', './src/widgets'],
          ['@features', './src/features'],
          ['@entities', './src/entities'],
          ['@shared', './src/shared'],
        ],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      },
    },
    'boundaries/elements': [
      {
        type: 'app',
        pattern: 'src/app/**/*.ts?(x)',
        mode: 'folder',
      },
      {
        type: 'pages',
        pattern: 'src/pages/**/*.ts?(x)',
        mode: 'folder',
      },
      {
        type: 'widgets',
        pattern: 'src/widgets/**/*.ts?(x)',
        mode: 'folder',
      },
      {
        type: 'features',
        pattern: 'src/features/**/*.ts?(x)',
        mode: 'folder',
      },
      {
        type: 'entities',
        pattern: 'src/entities/**/*.ts?(x)',
        mode: 'folder',
      },
      {
        type: 'shared',
        pattern: 'src/shared/**/*.ts?(x)',
        mode: 'folder',
      },
    ],
  },
};
