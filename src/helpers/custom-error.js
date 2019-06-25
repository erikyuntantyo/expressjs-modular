'use strict'

export default class CustomError extends Error {
  constructor(code, message) {
    super(message)

    this.name = this.constructor.name
    this.code = code
  }

  toJson() {
    return {
      message: this.message,
      code: this.code,
      name: this.name,
      stack: this.stack
    }
  }
}
