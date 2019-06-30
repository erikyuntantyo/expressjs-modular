'use strict'

import CommonHelper from '../helpers/common'
import CustomError from '../helpers/custom-error'

export default async (req, res, next) => {
  try {
    await CommonHelper.verifyAuthToken(req.headers.authorization)
  } catch (error) {
    return res.status(error.statusCode || 401).send(new CustomError(error.statusCode || 401, error.message).toJSON())
  }

  next()
}
