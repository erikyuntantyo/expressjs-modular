'use strict'

import config from 'config'
import jwt from 'jsonwebtoken'

import CustomError from '../helpers/custom-error'

export default async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send(new CustomError('401', 'Missing credential').toJson())
  }

  try {
    await jwt.verify(req.headers.authorization, config.auth.secret)
  } catch (err) {
    return res.status(401).send(new CustomError('401', 'Invalid credential').toJson())
  }

  next()
}
