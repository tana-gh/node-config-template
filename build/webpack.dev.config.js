const webpack           = require('webpack')
const { merge }         = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config.js')

const devWebpackConfig = baseWebpackConfig('development').map(config => merge(config, {
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        static: [ baseWebpackConfig.externals.paths.assets ],
        port: 8080,
        client: {
            overlay: {
                warnings: true,
                errors  : true
            }
        }
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        })
    ]
}))

module.exports = new Promise((res, rej) => {
    res(devWebpackConfig)
})
