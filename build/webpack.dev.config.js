import webpack from 'webpack'
import merge   from 'webpack-merge'
import baseWebpackConfig from './webpack.base.config.js'

const devWebpackConfig = merge(baseWebpackConfig, {
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
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        })
    ]
})

export default new Promise((res, rej) => {
    res(devWebpackConfig)
})
