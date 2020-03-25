import * as Webpack from 'webpack'
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config.js')

const buildWebpackConfig = merge(baseWebpackConfig, <Webpack.Configuration>{
    mode: 'production',
    plugins: []
})

module.exports = new Promise((res, rej) => {
    res(buildWebpackConfig)
})
