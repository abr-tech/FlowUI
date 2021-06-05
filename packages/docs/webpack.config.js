const path = require('path')
const webpack = require('webpack')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin')
const CopyWebPack = require('copy-webpack-plugin')
const { ESBuildMinifyPlugin } = require('esbuild-loader')

const ProjectDIR = `${path.resolve(__dirname)}/`
const SourceDIR = ProjectDIR
const BuildDIR = `${ProjectDIR}../../build/docs/`
const MODE = process.env.ENV === 'production' ? 'production' : 'development'

const config = {
  mode: MODE,

  entry: {
    app: `${SourceDIR}index.tsx`,
  },

  externals: {},

  output: {
    filename: 'docs.js',
    path: path.resolve(BuildDIR),
    publicPath: '/',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.raw?$/,
        use: {
          loader: 'esbuild-loader',
          options: {
            loader: 'text',
          },
        },
      },
      {
        test: /\.tsx?$/,
        oneOf: [
          {
            test: /\.raw\.tsx?$/,
            use: {
              loader: 'esbuild-loader',
              options: {
                loader: 'text',
              },
            },
          },
          {
            test: /\.(ts|tsx)$/,
            use: {
              loader: 'esbuild-loader',
              options: {
                loader: 'tsx',
                jsxFactory: 'jsx',
                target: 'es2015',
              },
            },
            exclude: (modulePath) =>
              /node_modules/.test(modulePath) && !/node_modules[\\/](ismart-(templates|api))[\\/].+/.test(modulePath),
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(ttf|eot|svg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'dataurl',
            },
          },
        ],
      },
    ],
  },

  target: 'web',
  context: __dirname,
  stats: 'errors-only',
}

const plugins = [
  // moment optimizations
  new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/),
  new MonacoWebpackPlugin(),
  new webpack.DefinePlugin({
    ENV_MODE: JSON.stringify(MODE),
  }),
]

/**
 * Копируем файлы
 */
plugins.push(
  new CopyWebPack({
    patterns: [
      { from: `${ProjectDIR}public/index.html` },
      { from: `${ProjectDIR}server.js` },
      /**
       * definitions for monaco TSLint
       */
      { from: `${ProjectDIR}/public/definitions`, to: `${BuildDIR}/definitions` },
    ],
  }),
)

/**
 * Настройки для дебага
 */
if (process.env.ENV === 'development') {
  config.devtool = 'source-map'
  config.devServer = {
    port: 9050,
    host: '0.0.0.0',
    disableHostCheck: true,
    clientLogLevel: 'error',
    hot: true,
    historyApiFallback: true,
    contentBase: [`${BuildDIR}/public`, `${__dirname}/../`],
    stats: 'errors-warnings',
  }
  plugins.push(new webpack.HotModuleReplacementPlugin())
  plugins.push(
    new FilterWarningsPlugin({
      exclude: /source-map-loader|Critical dependency: the request of a dependency is an expression/,
    }),
  )
} else {
  config.devtool = false
}

if (!config.optimization) {
  config.optimization = {}
}

if (MODE === 'production') {
  config.optimization = {
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2015',
      }),
    ],
  }
}

/**
 * Настройки для аналитики
 */
if (process.env.ANALYZE === 'true') {
  config.optimization.concatenateModules = false
  plugins.push(new BundleAnalyzerPlugin())
}

config.plugins = plugins

module.exports = config
