const path = require('path');

module.exports = 
{
    '@app': path.resolve(__dirname, './src/'),
    '@res': path.resolve(__dirname, './res'),
    '@core': path.resolve(__dirname, './src/core'),
    '@test': path.resolve(__dirname, './src/test'),
    '@lib': path.resolve(__dirname, './lib/')
}
