
export default {
    plugins: [
        require('autoprefixer')(),
        require('postcss-normalize')(),
        require('cssnano')({
            preset: [
                'default', {
                    discardComments: {
                        removeAll: true
                    }
                }
            ]
        })
    ]
}
