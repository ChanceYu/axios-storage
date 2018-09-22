'use strict';

const isProduction = process.env.NODE_ENV === 'production';

const webpack = require('webpack');
const path = require('path');
const webpackUMDExternal = require('webpack-umd-external');

const packageJSON = require('./package.json');

const libPath = path.join(__dirname, 'lib');
const staticPath = path.join(__dirname, 'example/static/js');
const distPath = path.join(__dirname, 'dist');

const webpackConfig = (outputPath) => {
    let config = {
        entry: path.join(__dirname, 'src/index.js'),
        output: {
            path: outputPath,
            filename: 'axios-storage.js',
            library: 'AxiosStorage',
            libraryTarget: 'umd',
            umdNamedDefine: true
        },
        module: {
            rules: [{
                test: /\.(js)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    plugins: [
                        ["transform-runtime", {
                            polyfill: false
                        }],
                    ],
                    presets: ['es2015', 'stage-0']
                }
            }]
        },
        plugins: [
            new webpack.BannerPlugin(
`${packageJSON.name}
@version: ${packageJSON.version}
@homepage: (${packageJSON.homepage})
@author: ${packageJSON.author}
@license: ${packageJSON.license}`)
            
        ],
        resolve: {
            extensions: ['.js']
        }
    };

    if(isProduction){
        config.plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                warnings: false,
                sourceMap: false,
                mangle: false
            })
        )
    }

    if(outputPath == libPath){
        config.externals = webpackUMDExternal({
            'cachefactory': 'cachefactory'
        });
    }

    return config;
}

module.exports = [
    webpackConfig(libPath),
    webpackConfig(staticPath),
    webpackConfig(distPath)
]