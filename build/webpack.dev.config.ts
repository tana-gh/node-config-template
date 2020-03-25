import * as Webpack from 'webpack'
const merge             = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config.js')

const devWebpackConfig = merge(baseWebpackConfig, <Webpack.Configuration>{
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: baseWebpackConfig.externals.paths.dist,
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
