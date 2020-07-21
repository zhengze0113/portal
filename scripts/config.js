const webpackConfig = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');
require('babel-polyfill');

const path = require('path');
const fs = require('fs');

function getTemplatePage() {
  const pageDirPath = path.resolve(__dirname, '../web/html');
  const pages = fs.readdirSync(pageDirPath);
  let pagesMap = {};
  pages.map(page => {
    const file = page.split('.').shift();
    pagesMap[file] = path.resolve(pageDirPath, page);
  });
  return pagesMap;
}

function getPageEntry() {
  const entryPath = path.resolve(__dirname, '../web/src/views');
  const entryFiles = fs.readdirSync(entryPath);
  const entrysMap = {};
  for(const i in entryFiles) {
    const file = entryFiles[i].split('.').shift();
    const filePath = path.resolve(entryPath, entryFiles[i]);
    if (fs.statSync(filePath).isDirectory()) {
      entrysMap[file] = ['babel-polyfill', path.resolve(filePath, 'index.js')];
    } else {
      entrysMap[file] = ['babel-polyfill', filePath];
    }
  }
  return entrysMap;
}

function getConfig() {
  const templates = getTemplatePage();
  const pageEntry = getPageEntry();
  const plguins = Object.entries(templates).map(([file, template]) => {
    return new HtmlWebpackPlugin({
      filename: `html/${file}.html`,
      chunks: pageEntry[file] ? ['chunk-elementUI', 'chunk-libs', 'runtime', 'common', file] : [''],
      template: template,
    });
  });

  const config = webpackMerge(webpackConfig, {
    entry: pageEntry,
    plugins: plguins
  });

  return config;
}

module.exports = getConfig;
