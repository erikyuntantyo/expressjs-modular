'use strict'

export default class CustomError extends Error {
  constructor(statusCode, message) {
    super(message)

    this.name = this.constructor.name
    this.statusCode = statusCode
  }

  toJSON() {
    return {
      message: this.message,
      statusCode: this.statusCode,
      name: this.name,
      stack: this.stack
    }
  }
}
