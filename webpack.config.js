let webpack = require('webpack'),
 ExtractTextPlugin = require('extract-text-webpack-plugin')
 HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // devtool: 'eval-source-map',//配置生成Source Maps，选择合适的选项
  entry:{
    app: './app/App',
    vendor: ['site'] // 默认额外打包
  },
  output: {
    path: __dirname + '/public/',//打包后的文件存放的地方
    filename: '[name].js',  //打包后输出文件的文件名
    /*
     * chunkFilename用来打包require.ensure方法中引入的模块,如果该方法中没有引入任何模块则不会生成任何chunk块文件
     * chunk的hash值只有在require.ensure中引入的模块发生变化,hash值才会改变
     * 注意:对于不是在ensure方法中引入的模块,此属性不会生效,只能用CommonsChunkPlugin插件来提取
     * */
    chunkFilename: '[name].js',
    publicPath: '/public/' // 指定资源文件引用的目录,注意最后加'/'
  },
  resolve: {
    extensions: ['.js', '.jsx'], //后缀名自动补全
    alias: {
        'nprogress' :  __dirname + '/app/Js/lib/nprogress.js',
        'site' :  __dirname + '/app/Js/site.js',
        'highlight': __dirname + '/app/Js/lib/highlight/highlight.pack.js',
        'pjax': __dirname + '/app/Js/lib/jquery.pjax.js',
    }
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react','es2015']
        }
      },
      {
        // 抽离入口文件中的less
        test: /\.(less|css)$/i, 
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?minimize', 'less-loader']
        }),
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
        // NODE_ENV: '"development"'
      }
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      hljs: 'highlight',
      NProgress: 'nprogress',
      Simditor: 'simditor'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    // new webpack.optimize.CommonsChunkPlugin({ name: 'vendors', filename: 'vendor.js' }),
    new HtmlWebpackPlugin({
      title: 'My App',
      filename: '../index.html',
      template: 'template.html',
      hash: true,
    })
  ]
}