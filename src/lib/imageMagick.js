const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const gm = require('gm').subClass({ imageMagick: true });
const Utils = require('./utils');

const IM = {};

/**
 * Resize a raw screenshot image
 * @param {Object}    args                  Arguments object
 * @param {String}    args.path             Screenshot fodler path
 * @param {String}    args.filename         Screenshot filename
 * @param {String}    args.outputFilename   Output filename
 * @param {Integer}   args.width            New screenshot width
 * @param {Integer}   args.height           New screenshot height
 * @return {String}                         Temporary path
 */
IM.resizeScreenshot = (args) => {
  return new Promise((resolve, reject) => {
    const sourcePath = path.join(args.path, args.filename);
    const tmpPath = path.join(__dirname, '../../tmp/', args.destFilename);

    if (fs.existsSync(sourcePath)) {
      gm(sourcePath)
        .resize(args.width, args.height)
        .write(tmpPath, () => {
          Utils.logger('Resize source:', `${args.filename} => ${args.destFilename}`);
          resolve(tmpPath);
        })
    } else {
      const error = new Error(`The source path ${args.sourcePath} doesn't exist`);
      reject(error);
    }
  });
}

/**
 *
 * @param {Object}    args                  Arguments object
 * @param {Object}    args.format           Format object
 * @param {Object}    args.designConfig     Design Config object
 */
IM.addMask = (args) => {
  return new Promise((resolve, reject) => {
    try {
      if (args.format.frame.mask) {
        const maskPath = path.join(Utils.getDevicePath(args.format.device), '/mask.png');

        const gmComposite = `convert "${args.designConfig.screenshot}" "${maskPath}" -compose copy_opacity -composite -compose over -background transparent -flatten "${args.designConfig.screenshot}"`

        if (fs.existsSync(maskPath)) {
          exec(gmComposite, () => {
            Utils.logger('Add mask:', `${args.designConfig.screenshot} (${args.format.device})`);
            resolve(args.designConfig);
          })
        } else {
          const error = new Error(`The mask path ${maskPath} doesn't exist`);
          reject(error);
        }
      } else {
        resolve(args.designConfig);
      }
    } catch (err) {
      const error = new Error(`Error when applying the mask to the ${args.designConfig.screenshot} image`);
      reject(error);
    }
  });
}

/**
 * Compose the design with the screenshot + frame + texts
 * @param {Object}    args               Arguments
 * @param {Object}    args.theme         Theme object
 * @param {Object}    args.format        Screenshot format object
 * @param {String}    args.screenshot    Screenshot file
 * @param {Integer}   args.width         Screenshot format width
 * @param {Integer}   args.height        Screenshot format height
 * @param {String}    args.title         Title
 * @param {String}    args.subtitle      Subtitle
 * @param {String}    args.fontPath      Theme font path
 * @param {String}    args.platform      Screenshot platform
 * @param {String}    args.destFilename  Destination filename
 * @param {Function}  args.done          Callback
 */
IM.composeDesign = (args) => {
  return new Promise((resolve, reject) => {
    try {
      gm(args.width, args.height, args.theme.backgroundColor)
        // Set title font color
        .fill(args.theme.title.color)
        // Set the title font and font size
        .font(args.fontPath, args.theme.title.fontSize)
        // Draw the title text
        .drawText(args.theme.title.position.x, args.theme.title.position.y, args.title, args.theme.title.position.orientation)
        // Set subtitle font color
        .fill(args.theme.subtitle.color)
        // Set the subtitle font and font size
        .font(args.fontPath, args.theme.subtitle.fontSize)
        // Draw the subtitle text
        .drawText(args.theme.subtitle.position.x, args.theme.subtitle.position.y, args.subtitle, args.theme.subtitle.position.orientation)
        // Set the position for the device frame layer
        .in('-page', args.format.frame.position)
        // Create the the device frame layer
        .in(path.join(Utils.getDevicePath(args.format.device), '/frame.png'))
        // Set the position for the screenshot layer
        .in('-page', args.format.screenshot.position)
        // Create the the screenshot layer
        .in(args.screenshot)
        // Merge the layers
        .flatten()
        .write(path.join(Utils.getDistPath(args.platform), args.destFilename), () => {
          Utils.logger('Create design:', `${args.destFilename}`);
          resolve();
        });
    } catch (err) {
      const error = new Error(`Error while creating the screenshot ${args.destFilename}`);
      reject(error);
    }
  });

}

module.exports = IM;
