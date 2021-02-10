const path = require('path');  // load the node module, path
module.exports = {
    entry: './src/playground/redux-101.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }, {
            test: /\.s?css$/,
            use: [
                // creates 'style' nodes from js strings
                'style-loader',
                // translates css into commonjs
                'css-loader',
                // compiles sass to css
                'sass-loader']
        }]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true       // tells the server we are only going to return the default page (index.html) for all requests.
    }
};
