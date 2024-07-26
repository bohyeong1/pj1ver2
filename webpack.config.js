const path = require('path')

module.exports = {
    mode: 'production',
    entry: glob.sync('./src/*.js').reduce((entries, file) => {
        const entry = path.basename(file, path.extname(file))
        entries[entry] = file
        return entries
    }, {}),
    output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/bundleJs'),
    },
    module: {
        rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
            loader: 'babel-loader',
            },
        },
        ],
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      compress: true,
      port: 9000,
    },
    externals: {
        'pixi.js': 'PIXI',
        'pixi-filters': 'PIXI.filters',
        'p5': 'p5',
        'matter-js': 'Matter'
    },
}