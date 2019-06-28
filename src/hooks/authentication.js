'use strict'

import CommonHelper from '../helpers/common'
import CustomError from '../helpers/custom-error'

export default async (req, res, next) => {
  if (!req.headers.authorization || !CommonHelper.verifyToken(req.headers.authorization)) {
    return res.status(401).send(new CustomError('401', 'Invalid credential').toJSON())
  }

  next()
}
