//add extra config setting according to this https://github.com/davezuko/react-redux-starter-kit/issues/328 for enzyme to work
import { argv } from 'yargs'
import config from '../config'
import webpackConfig from './webpack.config'

const debug = require('debug')('app:karma')
debug('Create configuration.')

const karmaConfig = {
  basePath: '../', // project root in relation to bin/karma.js
  files: [
    'node_modules/babel-polyfill/dist/polyfill.js',
    './node_modules/phantomjs-polyfill/bind-polyfill.js',
    {
      pattern: `./${config.dir_test}/**/*.js`,
      watched: false,
      served: true,
      included: true
    }
  ],
  singleRun: !argv.watch,
  frameworks: ['mocha', 'chai-sinon', 'chai-immutable', 'chai-as-promised', 'chai'],
  preprocessors: {
    [`${config.dir_test}/**/*.js`]: ['webpack', 'sourcemap']
  },
  reporters: ['spec'],
  browsers: ['PhantomJS'],
  webpack: {
    devtool: 'inline-source-map',
    resolve: {
      ...webpackConfig.resolve,
      alias: {
        'sinon': 'sinon/pkg/sinon'
      }
    },
    plugins: webpackConfig.plugins
      .filter(plugin => !plugin.__KARMA_IGNORE__),
    externals: {
      'jsdom': 'window',
      'cheerio': 'window',
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': 'window'
    },
    module: {
      noParse: [
        /node_modules\/sinon\//
      ],
      loaders: webpackConfig.module.loaders
    },
    sassLoader: webpackConfig.sassLoader
  },
  webpackMiddleware: {
    noInfo: true
  },
  coverageReporter: {
    reporters: config.coverage_reporters
  }
}

if (config.coverage_enabled) {
  karmaConfig.reporters.push('coverage')
  karmaConfig.webpack.module.preLoaders = [{
    test: /\.(js|jsx)$/,
    include: new RegExp(config.dir_client),
    loader: 'isparta',
    exclude: /node_modules/
  }]
}

export default (cfg) => cfg.set(karmaConfig)
