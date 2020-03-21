const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin    = require('copy-webpack-plugin')
const HtmlWebpackPlugin    = require('html-webpack-plugin')

let VueLoader
try {
    VueLoader = require('vue-loader')
}
catch {
    VueLoader = undefined
}

const PATHS = {
    src   : path.join(__dirname, '../../src'),
    dist  : path.join(__dirname, '../../dist'),
    assets: path.join(__dirname, '../../assets')
}

const ENTRIES = {
    main: PATHS.src
}

const PAGES_DIR = `${PATHS.assets}/html`
const PAGES = {
    main: 'index.html'
}

module.exports = {
    externals: {
        paths: PATHS
    },
    entry: ENTRIES,
    output: {
        filename: `assets/js/[name].[contenthash].js`,
        path: PATHS.dist,
        publicPath: '/'
    },
    resolve: {
        extensions: [ '.js', '.jsx', '.ts', '.tsx', 'json' ],
        alias: {
            '~': PATHS.src,
            ...(VueLoader ? { vue$: 'vue/dist/vue.js' } : {})
        }
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    test: /node_modules/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.tsx?$/,
                use: [
                    'babel-loader',
                    {
                        loader: 'ts-loader',
                        ...(VueLoader ? { options: { appendTsSuffixTo: [/\.vue$/] } } : {})
                    }
                ]
            },
            ...(VueLoader ? [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loader: {
                        scss: 'vue-style-loader!css-loader!sass-loader'
                    }
                }
            }] : []),
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    },
                    {
                        loader: 'postcss-loader',
                        options: { sourceMap: true }
                    }
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                'style-loader',
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: { sourceMap: true }
                },
                {
                    loader: 'postcss-loader',
                    options: { sourceMap: true }
                },
                {
                    loader: 'sass-loader',
                    options: { sourceMap: true }
                }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'assets/images/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'assets/fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    plugins: [
        ...(VueLoader ? [new VueLoader.VueLoaderPlugin()] : []),

        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].[contenthash].css'
        }),
        
        new CopyWebpackPlugin([
            { from: `${PATHS.assets}/images` , to: 'assets/images' },
            { from: `${PATHS.assets}/favicon`, to: 'assets/favicon' }
        ]),

        ...Object.keys(PAGES).map(key =>
            new HtmlWebpackPlugin({
                template: `${PAGES_DIR}/${PAGES[key]}`,
                filename: `./${PAGES[key]}`,
                inject  : 'body',
                chunks  : [ key, 'vendor' ]
            })
        )
    ]
}
