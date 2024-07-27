const path = require('path')
const glob = require('glob')

module.exports = {
    mode: 'production',
    entry: glob.sync('./src/*.js').reduce((entries, file) => {
        const entry = path.basename(file, path.extname(file))
        entries[entry] = path.resolve(__dirname, file)
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
        {
            test: /\.(jpg|jpeg)$/i,
            include: [
                path.resolve(__dirname, 'src/srcImg'),
              ],
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name].[hash].[ext]',
                  outputPath: '../bundleImg', 
                  publicPath: '/bundleImg',
                },
              },
              {
                loader: 'image-webpack-loader',
                options: {
                  mozjpeg: {
                    progressive: true,
                    quality: 100,
                  }
                }
              }
            ],
        }
        ],
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      compress: true,
      port: 9104,
    },
    externals: {
        'pixi.js': 'PIXI',
        'pixi-filters': 'PIXI.filters',
        'p5': 'p5',
        'matter-js': 'Matter'
    },
}