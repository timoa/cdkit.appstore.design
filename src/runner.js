const _ = require('lodash');

const IM = require('./lib/imageMagick');
const Utils = require('./lib/utils');
const Theme = require('./lib/theme');

// Load the config files
const formats = require('./config/formats.json');

/**
 * Create the Design Config
 * @param {Object} args               Arguments object
 * @param {Object} args.theme         Theme object
 * @param {Object} args.format        Format object
 * @param {Object} args.screen        Screen object
 * @param {String} args.platform      Platform name
 * @param {String} args.tmpPath       Temporary path
 * @param {String} args.destFilename  Destination filename
 * 
 */
function createDesignConfig(args) {
  return new Promise((resolve, reject) => {
    try {
      const designConfig = {
        theme: args.theme,
        format: args.theme.formats[args.format.name],
        device: args.theme.formats[args.format.name].device,
        screenshot: args.tmpPath,
        width: args.format.width,
        height: args.format.height,
        title: args.screen.title,
        subtitle: args.screen.subtitle,
        fontPath: Theme.getFontPath(args.theme.name, args.theme.font),
        platform: args.platform,
        destFilename: args.destFilename
      };
      resolve(designConfig);
    } catch (err) {
      reject(new Error('Error when creating the Design Config'));
    }
  });
}

/**
 * Generate the App Stores Design
 * @param {String} args
 */
function createDesign(args) {
  const appTheme = require(`../apps/${args.app}/theme.json`); // eslint-disable-line
  const screens = require(`../apps/${args.app}/screens.json`); // eslint-disable-line
  const theme = Theme.loadTheme(appTheme.theme);

  const screenshotsPath = args.screenshots || '../screenshots'; // Screenshots folder outside the project

  // Environment information
  Utils.logger('Create screenshots', '', 'bold');

  // Loop on the theme screens
  _.each(screens, (screen, index) => {
    // Loop on the different screenshot formats
    _.each(formats, (format) => {
      // If no platform or specific platform
      if (!args.platform || (args.platform && format.platform === args.platform)) {
        const destFilename = Utils.getDestFilename(index, format.name, screen.screenshot);

        // Resize the screenshot
        IM.resizeScreenshot({
          path: Utils.getScreenshotFilePath(screenshotsPath, format.platform, theme.formats[format.name].screenshot.source),
          filename: screen.screenshot,
          destFilename,
          width: theme.formats[format.name].screenshot.width,
          height: theme.formats[format.name].screenshot.height
        })
          .then(tmpPath => createDesignConfig({
            theme,
            format,
            screen,
            platform: args.platform,
            tmpPath,
            destFilename
          }))
          .then(designConfig => IM.addMask({
            format: theme.formats[format.name],
            designConfig
          }))
          .then(IM.composeDesign);
  }
    }); // Formats
  }); // Screens
}

module.exports = createDesign
