class APIERROR extends Error {
  constructor(message = 'Something Went Wrong', statusCode = 500, body = {}) {
    super(message);
    this.statusCode = statusCode;
    this.body = body;
  }
}

module.exports = APIERROR;
