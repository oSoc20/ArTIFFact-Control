const path = require('path');

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
            Assets: path.resolve(__dirname, '../src/renderer/assets'),
            Styles: path.resolve(__dirname, '../src/renderer/styles')
        },
        extensions: ['.tsx', '.ts', '.js', '.json']
    },
    devtool: 'source-map',
    plugins: [
    ]
};
