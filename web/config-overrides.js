const { override, addBabelPlugin } = require('customize-cra')
const { alias, configPaths } = require('react-app-rewire-alias')

module.exports = override(
    alias({ ...configPaths('tsconfig.paths.json') }),
    addBabelPlugin(['babel-plugin-styled-components', { displayName: true }])
)
