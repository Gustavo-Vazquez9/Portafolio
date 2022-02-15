/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');

const configBase = require('./webpack.config.base');
const env = require('./environment');

const configDev = {
    mode: 'development',
    /**
     * Administra el proceso de generación de source-map
     * https://webpack.js.org/configuration/devtool/
     */
    devtool: 'eval-source-map',
    /**
     * Configuración para el servidor de desarrollo.
     * https://webpack.js.org/configuration/dev-server/
     */
    devServer: {
        /**
         * Ubicación de los estáticos de la aplicación.
         */
        static: {
            directory: env.paths.dist,
            publicPath: '/',
            watch: true,
        },
        /**
         * Indica que debe mostrar una superposición de pantalla completa en el
         * navegador cuando hay errores o advertencias del compilador.
         */
        client: {
            overlay: true,
        },
        /**
         * Debe abrir el navegador por defecto al iniar el servidor con nuestra aplicacion.
         */
        open: true,
        /**
         * Habilita la compresión gzip para todo lo que se sirve
         * Compresión gzip: es una forma simple y efectiva de ahorrar ancho de banda
         * y acelerar nuestro sitio.
         */
        compress: true,
        /**
         * Habilita el módulo: Hot Module Replacement.
         * Hot Module Replacement (HMR): intercambia, agrega o elimina módulos mientras se
         * ejecuta una aplicación, sin una recarga completa.
         */
        hot: false,
        /**
         * Indica el host a utilizar. Si deseas que el servidor se accesible externamente se le
         * puede inicar como host: 0.0.0.0
         */
        host: env.server.host,
        /**
         * Indica el puerto donde estará disponible nuestra apliación.
         */
        port: env.server.port,
    },
    /**
     * Configuración para reconstrucción del sitio después de cambios
     * https://webpack.js.org/configuration/watch/
     */
    watchOptions: {
        /**
         * Indica el tipo de retrado antes de reconstruir la aplicación ante un
         * cambio. El tiempo es en milisegundos.
         */
        aggregateTimeout: 300,
        /**
         * Indica el tiempo que debe transcurrir entre cada sondeo de cambios. El tiempo
         * se especifica en milisegundos.
         */
        poll: 300,
        /**
         * Indica que archivos son excluidos en el monitoreo de cambios. Se puede indicar
         * a traves de string o de una expresión regular.
         */
        ignored: /node_modules/,
    },
    /**
     * Plugins adicionales para la configuración
     */
    plugins: [],
};

module.exports = merge(configBase, configDev);