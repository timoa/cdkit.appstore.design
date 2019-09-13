/* eslint-disable max-len */
const { expect } = require('chai');
const lib = require('../src/lib/theme');

// Theme
describe('Theme library', () => {
  describe('getFontPath()', () => {
    it('expect the "getFontPath()" to be a function', (done) => {
      expect(lib.getFontPath).to.be.a('function');
      done();
    });
    it('expect the "getFontPath()" to return a valid path for the font `HelveticaNeueLight.ttf`', (done) => {
      expect(lib.getFontPath('default', 'HelveticaNeueLight.ttf')).to.be.a(
        'string',
      );
      expect(lib.getFontPath('default', 'HelveticaNeueLight.ttf')).to.contains(
        '/src/layouts/themes/default/fonts/HelveticaNeueLight.ttf',
      );
      done();
    });
  });

  describe('loadTheme()', () => {
    it('expect the "loadTheme()" to be a function', (done) => {
      expect(lib.loadTheme).to.be.a('function');
      done();
    });
    it('expect the "loadTheme()" to return the theme config for the `com.company.app` app', (done) => {
      const themeConfig = lib.loadTheme('com.company.app');
      expect(themeConfig).to.be.an('object');
      expect(themeConfig.name).to.be.equals('default');
      expect(themeConfig.title).to.be.an('object');
      expect(themeConfig.subtitle).to.be.an('object');
      expect(themeConfig.formats).to.be.an('object');
      expect(themeConfig.theme).to.be.equals('default');
      done();
    });
  });
});
