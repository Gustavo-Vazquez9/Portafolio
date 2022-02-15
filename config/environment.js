const path = require('path');

const environment = {
    paths: {
        // Ruta al directorio donde se encuentra nuestro código
        src: path.resolve(process.cwd(), 'src'),
        // Ruta al directorio donde estará generada la versión para distribución
        dist: path.resolve(process.cwd(), 'dist'),
    },
    server: {
        host: 'localhost',
        port: 8000,
    },
    limits: {
        /**
         * Tamaño en bytes de los archivos de imagen. Por debajo de este valor, el archivo
         * será servido como DataURL (base64).
         */
        images: 8192,
        /**
         * Tamaño en bytes de los archivos de fuente. Por debajo de este valor, el archivos
         * será servido como DataURL (base64).
         */
        fonts: 8192,
    },
};

module.exports = environment;