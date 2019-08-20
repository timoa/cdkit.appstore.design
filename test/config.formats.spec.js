const { expect } = require('chai');
const formats = require('../src/config/formats.json');

// Config Formats
describe('Config formats', () => {
  it('expect "formats" to be an array', (done) => {
    expect(formats).to.be.an('array');
    done();
  });
});
