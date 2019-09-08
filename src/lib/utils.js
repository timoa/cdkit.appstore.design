const path = require('path');
const colors = require('colors'); // eslint-disable-line
const figures = require('figures');
const _ = require('lodash');

const Utils = {};

/**
 * Prettify console logs
 * @param  {String} text  Text to send to the console logs
 */
Utils.logger = (title, text, status) => {
  switch (status) {
    case 'error':
      console.log(`  ${figures('✖').red} ${title.bold} ${text}`);
      break;
    case 'warning':
      console.log(`  ${figures('⚠').yellow} ${title.bold} ${text}`);
      break;
    case 'info':
      console.log(`  ${figures('❯').cyan} ${title.bold} ${text}`);
      break;
    case 'happy':
      console.log(`  ${figures('㋡').green} ${title.bold} ${text}`);
      break;
    case 'bold':
      console.log(title.bold);
      break;
    default:
      console.log(`  ${figures('✔').green} ${title.bold} ${text}`);
      break;
  }
};

/**
 * Get the device folder path
 * @param {String} device   Device name
 * @returns {String}        Device folder path
 */
Utils.getDevicePath = (device) => {
  return path.join(__dirname, '../layouts/devices/', device);
};

/**
 * Get the theme folder path
 * @param {String} theme    Theme name
 * @returns {String}        Theme folder path
 */
Utils.getThemePath = (theme) => {
  return path.join(__dirname, '../layouts/themes/', theme);
};

/**
 * Get the dist folder path based on the platform
 * @param {String} platform Platform name
 * @returns {String}        Dist folder path
 */
Utils.getDistPath = (platform) => {
  return path.join(__dirname, '../../dist/', platform);
};

/**
 * Get the Screenshot file path
 * @param {String} screenshotsPath  Screenshots folder path
 * @param {String} platform         Screenshot platform
 * @param {String} sourceFile       Source file path
 * @returns {String}                Screenshot file path
 */
Utils.getScreenshotFilePath = (screenshotsPath, platform, sourceFile) => {
  return path.join(screenshotsPath, platform, sourceFile);
};

/**
 * Get destination filename
 * @param {Integer} index     Theme name
 * @param {String} format     Format name
 * @param {String} filename   Source filename
 * @returns {String}          Destination filename
 */
Utils.getDestFilename = (index, format, filename) => {
  const extention = filename.substr(-4, filename.length);
  return _.join([index + 1, format], '-') + extention;
};

module.exports = Utils;
