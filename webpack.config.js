var webpack = require('webpack');
var path = require('path');
var envFile = require('node-env-file');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

try {
  // Devo configurar variáveis de ambiente neste arquivo, que ficam invisíveis ao usuário final (e git),
  // como por exemplo chaves de uma API
  envFile(path.join(__dirname, 'config/' + process.env.NODE_ENV + '.env'));
} catch (e) {

}

module.exports = {
  entry: [
    './src/app.jsx'
  ],
  externals:{
  },
  plugins:[
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve:{
    root: __dirname,
    modulesDirectories: [
      'node_modules',
      './src/components',
      './src/api'
    ],
    alias:{
      app: 'src',
      actions: 'src/actions/actions.jsx',
      reducers: 'src/reducers/reducers.jsx',
      configureStore: 'src/store/configureStore.jsx'
    },
    extensions:['','.js','.jsx']
  },
  module:{
    loaders: [
      {
        loader: 'babel-loader',
        query:{
          presets: ['react', 'es2015', 'stage-0']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  //devtool: 'eval-source-map'
  devtool: process.env.NODE_ENV === 'production' ? undefined : 'eval-source-map'
};
