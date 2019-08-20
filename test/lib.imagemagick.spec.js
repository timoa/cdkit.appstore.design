const { expect } = require('chai');
const lib = require('../src/lib/imageMagick');

// ImageMagick
describe('ImageMagick library', () => {
  describe('resizeScreenshot()', () => {
    it('expect the "resizeScreenshot()" to be a function', (done) => {
      expect(lib.resizeScreenshot).to.be.a('function');
      done();
    });
    // it('expect the "resizeScreenshot()" to not throw', (done) => {
    //   const path = `${__dirname}/data/img`;
    //   expect(lib.resizeScreenshot({
    //     path,
    //     filename: '1-iphone-5.8.png',
    //     outputFilename: '1-iphone-5.8-test.png',
    //     width: 591,
    //     height: 1280,
    //     done
    //   })).to.not.throw();
    // });

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
