// import baseURL from '../web/src/api/app';
const webpack = require('webpack');
const config = require('./config')();
const devServer = require('webpack-dev-server');

const baseURL = require('../web/src/api/app');



function start() {
  const compiler = webpack(config);
  const server = new devServer(compiler, {
    open: true,
    openPage: 'html',
    proxy: {
      '/api/cloud/iams/*': {
        // target: 'http://10.72.78.125:8081',
        target: baseURL.DataInterfaceIams,
        changeOrigin: true
      },
      '/api/cloud/iams/v1/*': {
        target: baseURL.DataInterfaceIams,
        changeOrigin: true
      },
      '/api/cloud/osms/v1/*': {
        target: baseURL.DataInterfaceOams,
        changeOrigin: true
      },
      '/api/cloud/cmss/v1/*': {
        target: baseURL.DataInterfaceCmss,
        changeOrigin: true
      },
      '/api/cloud/amcs/v1/*': {
        target: baseURL.DataInterfaceAmcs,
        changeOrigin: true
      },
      '/api/cloud/pdts/v1/*': {
        target: baseURL.DataInterfacePdts,
        changeOrigin: true
      },
      '/loginSso/*': {
        target: baseURL.DataInterfacePdts,
        changeOrigin: true
      },
      '/acs/*': {
        target: 'http://localhost:8088',
        changeOrigin: true,
        pathRewrite: {
          '/acs': '/'
        }
      }
    }
  });


  server.listen(config.devServer.port, (err, stats) => {

    if (err) console.log(err);
    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n'
    );
  });
}

start();
