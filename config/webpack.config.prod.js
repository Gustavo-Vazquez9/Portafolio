/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HTMLMinimizerPlugin = require('html-minimizer-webpack-plugin');

const configBase = require('./webpack.config.base');

const configProd = {
    mode: 'production',
    /**
     * Administra el proceso de generación de source-map
     * https://webpack.js.org/configuration/devtool/
     */
    devtool: false,
    /**
     * Configiración para optimizar el paquete para distribución
     * https://webpack.js.org/configuration/optimization/
     */
    optimization: {
        /**
         * Le indica a webpack que debe minimizar nuestro bundle. Hará uso
         * del plugin Terser.
         */
        minimize: true,
        /**
         * Permite sobreescribir la configuración por defecto para minimizar el bundle.
         */
        minimizer: [
            new TerserPlugin({
                parallel: true
            }),
            new CssMinimizerPlugin(),
            new HTMLMinimizerPlugin(),
        ],
    },
    /**
     * Valores de configuración del umbral de rendimiento
     * https://webpack.js.org/configuration/performance/
     */
    performance: {
        /**
         * Indica en que momento webpack debe emitir una advertencia cuando el paquete web excede
         * el tamaño (bytes) especificado.
         */
        maxEntrypointSize: 512000,
        /**
         * Indica en que momento webpack debe emitir una advertencia de rendimiento cuando un asset
         * excede el tamaño (bytes) especificado.
         */
        maxAssetSize: 512000,
    },
    /**
     * Plugins adicionales para la configuración
     */
    plugins: [],
};

module.exports = merge(configBase, configProd);