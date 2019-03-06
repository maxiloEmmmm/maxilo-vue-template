const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  //子网站使用
  // baseUrl: '/xx/',
  // outputDir: 'xx',
  devServer: {
    hotOnly:true,
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'text-color': '#000',
          'heading-color': '#000',
          'border-color-base': '#000',
          'primary-color': '#000',
          'border-radius-base': '0'
        },
        javascriptEnabled: true
      }
    }
  },
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
  chainWebpack: config => {
    if (process.env.NODE_ENV !== 'production' && process.env.USE_MOCK) {
      config
        .entry('index')
        .prepend(resolve('src/mock.js'))
        .end()
    }
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.js',
        assets: resolve('src/assets'),
          components: resolve('src/component'),
          vendor: resolve('src/vendor'),
          config: resolve('src/config'),
          router: resolve('src/router'),
          pages: resolve('src/pages'),
          mixs: resolve('src/mixs'),
          store: resolve('src/store'),
          utils: resolve('src/utils'),
          api: resolve('src/api'),
          test: resolve('src/test'),
      }
    }
  }
}