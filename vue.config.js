const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  //子网站使用
  // publicPath: process.env.NODE_ENV === 'production' ? '/xxx' : '/xx',
  // outputDir: 'xx',
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://api',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/api': ''
  //       }
  //     },
  //   }
  // },
  pages: {
    index: {
      // page 的入口
      entry: 'src/index.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Index Page',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.js',
        config: resolve('src/config'),
        store: resolve('src/store'),
      }
    }
  }
}