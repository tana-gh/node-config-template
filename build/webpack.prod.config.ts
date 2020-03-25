import * as Webpack from 'webpack'
const merge      = require('webpack-merge')
const baseConfig = require('./webpack.base.config')

const buildWebpackConfig = merge(baseConfig, <Webpack.Configuration>{
    mode: 'production',
    plugins: []
})

export default new Promise((res, rej) => {
    res(buildWebpackConfig)
})
