import merge from 'webpack-merge'
import baseWebpackConfig from './webpack.base.config.js'

const buildWebpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    plugins: []
})

export default new Promise((res, rej) => {
    res(buildWebpackConfig)
})
