const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config.js')

const prodWebpackConfig = baseWebpackConfig.map(config => merge(config, {
    mode: 'production',
    plugins: []
}))

module.exports = new Promise((res, rej) => {
    res(prodWebpackConfig)
})
