const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const Utils = require('./utils')

const Theme = {}

/**
 * Merge theme configs
 * @param {Object} themeConfig  Theme config
 * @param {Object} appConfig    App theme config
 * @return {Object}             Config object
 */
function mergeConfigs (themeConfig, appConfig) {
  return _.merge(themeConfig, appConfig)
}

/**
 * Get the theme configuration path
 * @param {String} theme  Theme name
 * @return {String}       Theme configuration path
 */
function getThemeConfigPath (theme) {
  return path.join(Utils.getThemePath(theme), '/theme.json')
}

/**
 * Get the app theme configuration path
 * @param {String} name   App name
 * @return {String}       App theme configuration path
 */
function getAppThemeConfigPath (app) {
  return path.join(__dirname, '../../apps/', app, 'theme.json')
}

/**
 * Check if the app theme configuration exist
 * @param {String} app    App name
 * @return {Boolean}      Return true or false
 */
function isAppThemeConfigExists (app) {
  const appThemePath = getAppThemeConfigPath(app)
  return fs.existsSync(appThemePath)
}

/**
 * Get the font filename path
 * @param {String} theme  Theme name
 * @param {String} font   Font filename
 * @returns {String}      Font filename path
 */
Theme.getFontPath = (theme, font) => {
  return path.join(__dirname, '../layouts/themes/', theme, '/fonts/', font)
}

/**
 * Load theme by name
 * @param {String} appName  App name
 * @returns {Object}        Theme object
 */
Theme.loadTheme = (appName) => {
  let theme = 'default'
  let appConfig

  if (isAppThemeConfigExists(appName)) {
    appConfig = require(getAppThemeConfigPath(appName)); // eslint-disable-line
    ({ theme } = appConfig);
  }
  // Load the default theme config of the theme
  let themeConfig = require(getThemeConfigPath(theme)); // eslint-disable-line

  // If app theme config, merge it with the default settings
  if (_.isObject(appConfig)) {
    themeConfig = mergeConfigs(themeConfig, appConfig)
  }
  return themeConfig
}

module.exports = Theme
