'use strict'

import config from 'config'
import jwt from 'jsonwebtoken'

import CustomError from '../helpers/custom-error'
import Models from '../models'

export default async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send(new CustomError('401', 'Missing credential').toJSON())
  }

  try {
    const { userId, exp } = jwt.verify(req.headers.authorization, config.auth.secret)
    const { dataValues: user } = Models.getModels().users.get(userId)

    if (!user || (exp > Date.now())) {
      throw new Error()
    }
  } catch (err) {
    return res.status(401).send(new CustomError('401', 'Invalid credential').toJSON())
  }

  next()
}
