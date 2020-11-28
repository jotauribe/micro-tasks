module.exports = {
    extends: [
        'react-app',
        'react-app/jest',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
            modules: true
        }
    },
    rules: {
        'no-unused-vars': 'off',
        'react/jsx-boolean-value': ['error', 'never'],
        '@typescript-eslint/no-unused-vars': ['error'],
        '@typescript-eslint/no-explicit-any': 'off'
    },
    overrides: [
        {
            files: ['*.js'],
            rules: {
                '@typescript-eslint/no-var-requires': 'off'
            }
        }
    ]
}
