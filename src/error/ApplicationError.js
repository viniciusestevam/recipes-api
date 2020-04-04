export default class ApplicationError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    if (process.env.NODE_ENV === 'production') {
      console.log(this.stack);
      this.stack = null;
    }
  }

  static handleError(err, res) {
    const { statusCode, message } = err;
    return res
      .status(statusCode)
      .json({
        status: 'error',
        statusCode,
        message
      })
      .send();
  }
}
