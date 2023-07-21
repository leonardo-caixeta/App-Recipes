const clipboardy = jest.createMockFromModule('clipboardy');

let clipboardContents = '';

clipboardy.writeSync = (text) => {
  clipboardContents = text;
};

clipboardy.readSync = () => clipboardContents;

module.exports = clipboardy;
