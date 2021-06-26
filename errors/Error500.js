class Error500 extends Error {
  constructor(message) {
    super(message);
    this.code = 500;
  }
}

module.exports = Error500;