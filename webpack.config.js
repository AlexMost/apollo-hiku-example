const path = require('path');

module.exports = {
    entry: './browser/index.js',
    output: {
        path: path.resolve(__dirname, 'static'),
        filename: 'app.js',
    },
    module: {
        rules: [
            {test: /\.(js|jsx)$/, use: 'babel-loader'}
        ]

    }
};