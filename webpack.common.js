var path = require('path');


module.exports = {
  entry: ['babel-polyfill', './src/app.js'],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js' // this is the compiled final javascript file which we will include in the index.html
  },
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        
      ]
    },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }]
  },
  
};