/* eslint-disable max-len */
const { expect } = require('chai');
const lib = require('../src/lib/utils');

// Utils
describe('Utils library', () => {
  describe('getDevicePath()', () => {
    it('expect the "getDevicePath()" to be a function', (done) => {
      expect(lib.getDevicePath).to.be.a('function');
      done();
    });
    it('expect the "getDevicePath()" to return a valid path for the `Google Pixel 2`', (done) => {
      expect(lib.getDevicePath('google-pixel-2')).to.be.a('string');
      expect(lib.getDevicePath('google-pixel-2')).to.be.contains(
        '/src/layouts/devices/google-pixel-2',
      );
      done();
    });
    it('expect the "getDevicePath()" to return a valid path for the `iPad Pro 12.9`', (done) => {
      expect(lib.getDevicePath('apple-ipad-pro-12.9-white')).to.be.a('string');
      expect(lib.getDevicePath('apple-ipad-pro-12.9-white')).to.contains(
        '/src/layouts/devices/apple-ipad-pro-12.9-white',
      );
      done();
    });
  });

  describe('getThemePath()', () => {
    it('expect the "getThemePath()" to be a function', (done) => {
      expect(lib.getThemePath).to.be.a('function');
      done();
    });
    it('expect the "getThemePath()" to return a valid path for the `Google Pixel 2`', (done) => {
      expect(lib.getThemePath('google-pixel-2')).to.be.a('string');
      expect(lib.getThemePath('google-pixel-2')).to.be.contains(
        '/src/layouts/themes/google-pixel-2',
      );
      done();
    });
    it('expect the "getThemePath()" to return a valid path for the `iPad Pro 12.9`', (done) => {
      expect(lib.getThemePath('apple-ipad-pro-12.9-white')).to.be.a('string');
      expect(lib.getThemePath('apple-ipad-pro-12.9-white')).to.contains(
        '/src/layouts/themes/apple-ipad-pro-12.9-white',
      );
      done();
    });
  });

  describe('getDistPath()', () => {
    it('expect the "getDistPath()" to be a function', (done) => {
      expect(lib.getDistPath).to.be.a('function');
      done();
    });
    it('expect the "getDistPath()" to return a valid path with the platform Android', (done) => {
      expect(lib.getDistPath('android')).to.be.a('string');
      expect(lib.getDistPath('android')).to.be.contains('/dist/android');
      done();
    });
    it('expect the "getDistPath()" to return a valid path with the platform iOS', (done) => {
      expect(lib.getDistPath('ios')).to.be.a('string');
      expect(lib.getDistPath('ios')).to.be.contains('/dist/ios');
      done();
    });
  });

  describe('getScreenshotFilePath()', () => {
    it('expect the "getScreenshotFilePath()" to be a function', (done) => {
      expect(lib.getScreenshotFilePath).to.be.a('function');
      done();
    });
    it('expect the "getScreenshotFilePath()" to return a valid path with the platform Android', (done) => {
      expect(
        lib.getScreenshotFilePath('/tmp', 'android', 'screenshot.png'),
      ).to.be.a('string');
      expect(
        lib.getScreenshotFilePath('/tmp', 'android', 'screenshot.png'),
      ).to.be.equals('/tmp/android/screenshot.png');
      done();
    });
    it('expect the "getScreenshotFilePath()" to return a valid path with the platform iOS', (done) => {
      expect(
        lib.getScreenshotFilePath('/tmp', 'ios', 'screenshot.png'),
      ).to.be.a('string');
      expect(
        lib.getScreenshotFilePath('/tmp', 'ios', 'screenshot.png'),
      ).to.be.equals('/tmp/ios/screenshot.png');
      done();
    });
  });

  describe('getDestFilename()', () => {
    it('expect the "getDestFilename()" to be a function', (done) => {
      expect(lib.getDestFilename).to.be.a('function');
      done();
    });
    it('expect the "getDestFilename()" to return a valid path with the platform Android', (done) => {
      expect(lib.getDestFilename(0, 'phone', 'screenshot.png')).to.be.a(
        'string',
      );
      expect(lib.getDestFilename(0, 'phone', 'screenshot.png')).to.be.equals(
        '1-phone.png',
      );
      done();
    });
    it('expect the "getDestFilename()" to return a valid path with the platform iOS', (done) => {
      expect(lib.getDestFilename(0, 'ipad-12.9', 'screenshot.png')).to.be.a(
        'string',
      );
      expect(
        lib.getDestFilename(0, 'ipad-12.9', 'screenshot.png'),
      ).to.be.equals('1-ipad-12.9.png');
      done();
    });
  });
});
