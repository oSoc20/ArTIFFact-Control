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
            Interfaces: path.resolve(__dirname, '../src/interfaces'),
            Assets: path.resolve(__dirname, '../src/renderer/assets'),
            Styles: path.resolve(__dirname, '../src/renderer/styles'),
            Theme: path.resolve(__dirname, '../src/renderer/theme'),
            Actions: path.resolve(__dirname, '../src/renderer/actions'),
            Reducers: path.resolve(__dirname, '../src/renderer/reducers'),
            Components: path.resolve(__dirname, '../src/renderer/components')
        },
        extensions: ['.tsx', '.ts', '.js', '.json']
    },
    devtool: 'source-map',
    plugins: [
    ]
};
