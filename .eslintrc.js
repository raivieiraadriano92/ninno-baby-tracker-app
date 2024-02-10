module.exports = {
  root: true,
  extends: [
    'universe/native',
    'universe/shared/typescript-analysis',
    'plugin:react-hooks/recommended'
  ],
  plugins: ['autofix', 'react-hooks'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],
      parserOptions: {
        project: './tsconfig.json'
      }
    }
  ],
  rules: {
    'react-hooks/exhaustive-deps': 'error',
    'no-restricted-imports': [
      'error',
      {
        patterns: ['../']
      }
    ],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports'
      }
    ],
    'autofix/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
        destructuredArrayIgnorePattern: '^_'
      }
    ],
    'react/self-closing-comp': ['error', { component: true }],
    'arrow-body-style': ['error', 'as-needed'],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'object', 'type'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before'
          }
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: '*' },
      { blankLine: 'any', prev: 'import', next: 'import' }
    ],
    'no-fallthrough': ['error', { allowEmptyCase: true }]
  }
}
