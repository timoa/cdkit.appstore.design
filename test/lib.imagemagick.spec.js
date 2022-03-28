/* eslint-disable func-names */
const { expect } = require('chai');
const path = require('path');

const lib = require('../src/lib/imageMagick');

const screenshotsPath = `${__dirname}/data/img`;

// ImageMagick
describe('ImageMagick library', () => {

  describe('resizeScreenshot()', function () {
    this.timeout(6000);

    it('expect the "resizeScreenshot()" to be a function', (done) => {
      expect(lib.resizeScreenshot).to.be.a('function');
      done();
    });
    it('expect the "resizeScreenshot()" to not throw', () => {
      const destFilename = '1-iphone-5.8-test.png';
      return lib
        .resizeScreenshot({
          path: screenshotsPath,
          filename: '1-iphone-5.8.png',
          destFilename,
          width: 591,
          height: 1280,
        })
        .then((result) => {
          const destPath = path.join(`${__dirname}/../tmp/${destFilename}`);
          expect(result).to.be.equals(destPath);
        });
    });
  });

  describe('addMask()', () => {
    it('expect the "addMask()" to be a function', (done) => {
      expect(lib.addMask).to.be.a('function');
      done();
    });
  });

  describe('composeDesign()', () => {
    it('expect the "composeDesign()" to be a function', (done) => {
      expect(lib.composeDesign).to.be.a('function');
      done();
    });
  });
});
