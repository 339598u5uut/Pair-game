module.exports = {
    root: true,
    extends: ['airbnb-base'],
    env: {
        browser: true,
    },
    rules: {
        'no-alert': 0,
        'no-param-reassign': [2, { props: false }],
        'no-plusplus': 0,
        'no-iterator': 0,
        'no-restricted-syntax': [2, 'WithStatement'],
        'func-style': 0,
        'linebreak-style': 0,
        'indent': 'off',
        'space-before-function-paren': ['error', {
            anonymous: 'never',
            named: 'never',
            asyncArrow: 'never',
        }],
        'prefer-arrow-callback': 0,
        'prefer-template': 0,
        'func-names': ['error', 'never'],
        'eol-last': 0,
        'quotes': [
            'error',
            'single',
        ],
        'quote-props': 0,
        'trailing-comma': 0,
    },
};