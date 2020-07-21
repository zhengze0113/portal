const webpack = require('webpack');
const config = require('./config')();
const rm = require('rimraf');

function build() {

  rm(config.output.path, err => {
    if (err) throw err;
    webpack(config, (err, stats) => {
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
  });
}

build();