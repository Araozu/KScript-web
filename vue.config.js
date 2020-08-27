const webpack = require("webpack");

module.exports = {
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.coffee$/,
                    loader: 'coffee-loader',
                },
                {
                    test: /\.ya?ml$/,
                    type: 'json', // Required by Webpack v4
                    use: 'yaml-loader'
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                __VUE_OPTIONS_API__: false,
                __VUE_PROD_DEVTOOLS__: true
            })
        ],
        devServer: {
            compress: true,
            disableHostCheck: true
        }
    },
    productionSourceMap: false
};
