var path = require('path');

module.exports = {

  // set the context (optional)
  context: path.join( __dirname, '/src'),
  entry: 'index.js',

  // enable loading modules relatively (without the ../../ prefix)
  resolve: {
    root: path.join( __dirname, '/src')
  },

  module: {
    loaders: [

      // load and compile javascript
      { test: /\.js$/, exclude: /node_modules/, loader:"babel", query: { presets: ['es2015', 'stage-1'] } },

      // load css and process sass
      { test: /\.scss$/, loaders: ["style", "css", "sass"] },

      // load JSON files and HTML
      { test: /\.json$/, loader: "json" },
      { test: /\.html$/, exclude: /node_modules/, loader:"raw" },
    ]
  },

  // webpack dev server configuration
  devServer: {
    contentBase: "./src",
    noInfo: false,
    hot: true
  },

  // support source maps
  devtool: "#inline-source-map"
};
