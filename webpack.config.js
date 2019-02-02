const path = require('path');


module.exports = {
  mode: 'development',
  entry: './src/client/index.jsx',

  output: {
    filename: 'bundle.js',
  },
  devServer: {
    publicPath: '/',
    open: true,
  },
  module: {
    rules: [
      { 
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'cheap-module-source-map'
};
