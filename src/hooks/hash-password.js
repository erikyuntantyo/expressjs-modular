'use strict'

import bcrypt from 'bcrypt'

export default async (req, res, next) => {
  if (req.body.password) {
    req.body.password = bcrypt.hash(req.body.password, 10)
  }

  next()
}
