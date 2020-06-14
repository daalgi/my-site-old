const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//const ASSET_PATH = process.env.ASSET_PATH || '/dist/'

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'docs'),
        //publicPath: ASSET_PATH,
        filename: 'main.js',
    },
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            /*{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },*/
            { test: /\js(x)?$/, loader: "babel-loader", query: { presets: ["@babel/react"] } },
            { test: /\.css$/, use: ["style-loader", "css-loader"] },

        ],
        /*resolve: {
            extensions: ['', '.js', '.jsx', '.css'],
            modulesDirectories: [
                'node_modules'
            ]
        }*/
        /*loaders: [
            { test: /\.jsx$/, loader: 'jsx-loader?harmony' }
        ]*/
    },
    /*resolve: {
        /*modulesDirectories: ['node_modules'],
        alias: {},
        extensions: ['', '.jsx', '.js']*/
    //modules: [path.resolve(__dirname, 'src'), 'node_modules']
    /*extensions: [ '.js'],
    alias: {
        '@material-ui/core': '@material-ui/core/es'
    }*//*
},*/
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ]
}
