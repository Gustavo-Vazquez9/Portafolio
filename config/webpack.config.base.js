const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');
const MiniCSSPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const env = require('./environment');

const config = {
    /**
     * Indica cuál será el arhivo de inicio de la aplicación.
     */
    entry: {
        app: path.resolve(env.paths.src, 'app.js'),
    },
    /**
     * Indica la configuración para los archivos de salida.
     */
    output: {
        filename: 'js/[name].js',
        path: env.paths.dist,
    },
    /**
     * Se especifica todas las configuraciones de los módulos que se ocuparán para
     * procesar nuestro paquete de distribución.
     * https://webpack.js.org/configuration/module/
     */
    module: {
        /**
         * Reglas de los módulos
         */
        rules: [
            /**
             * Regla para procesado de estilos: css, sass, scss
             */
            {
                test: /\.((c|sa|sc)ss)$/i,
                use: [
                    MiniCSSPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader',
                ],
            },
            /**
             * Regla para procesado de archivos js
             */
            {
                test: /\.js$/,
                use: [
                    'babel-loader',
                ],
            },
            /**
             * Regla para procesado de imágenes: png, gif, jpeg, jpg, svg
             */
            {
                test: /\.(png|gif|jpe?g|svg)$/i,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: env.limits.images,
                    },
                },
                generator: {
                    filename: 'img/[name].[hash:6][ext]',
                },
            },
            /**
             * Reglas para procesado de fuentes: eot, ttf, woff, woff2
             */
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: env.limits.fonts,
                    },
                },
                generator: {
                    filename: 'font/[name].[hash:6][ext]',
                },
            },
        ],
    },
    plugins: [
        new MiniCSSPlugin({
            filename: 'css/[name].css',
        }),
        new CleanWebpackPlugin({
            verbose: true,
            cleanOnceBeforeBuildPatterns: ['**/*', '!stats.json'],
        }),
        new CopyPlugin({
            patterns: [{
                from: path.resolve(env.paths.src, 'img'),
                to: path.resolve(env.paths.dist, 'img'),
                toType: 'dir',
                globOptions: {
                    ignore: ['*.DS_Store', 'Thumbs.db'],
                },
            }, ],
        }),
        new HTMLPlugin({
            title: 'Menu lateral',
            favicon: env.paths.src + '/img/favicon.ico',
            template: env.paths.src + '/index.html', // template file
            filename: 'index.html', // output file
            inject: true,
            hash: false,
        }),
    ],
    target: 'web',
};

module.exports = config;