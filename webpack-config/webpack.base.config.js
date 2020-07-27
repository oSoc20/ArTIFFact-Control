const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    node: {
        __dirname: false,
        __filename: false
    },
    resolve: {
        alias: {
            Interfaces: path.resolve(__dirname, '../src/interfaces'),
            Assets: path.resolve(__dirname, '../src/renderer/assets'),
            Styles: path.resolve(__dirname, '../src/renderer/styles'),
            Theme: path.resolve(__dirname, '../src/renderer/theme'),
            Actions: path.resolve(__dirname, '../src/renderer/actions'),
            Reducers: path.resolve(__dirname, '../src/renderer/reducers'),
            Components: path.resolve(__dirname, '../src/renderer/components'),
            ExtConfig: path.resolve(__dirname, '../config')
        },
        extensions: ['.tsx', '.ts', '.js', '.json']
    },
    devtool: 'source-map',
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../config'),
                    to: 'config/'
                },
                {
                    from: path.resolve(__dirname, '../reports'),
                    to: 'reports/'
                }
            ]
        })
    ]
};
