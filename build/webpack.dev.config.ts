import * as Webpack from 'webpack'
const merge      = require('webpack-merge')
const baseConfig = require('./webpack.base.config')

const devWebpackConfig = merge(baseConfig, <Webpack.Configuration>{
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: baseConfig.externals.paths.dist,
        port: 8080,
        overlay: {
            warnings: true,
            errors  : true
        }
    },
    plugins: [
        new Webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        })
    ]
})

export default new Promise((res, rej) => {
    res(devWebpackConfig)
})
