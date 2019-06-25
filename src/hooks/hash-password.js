'use strict'

import crypto from 'crypto'

export default async (req, res, next) => {
  if (req.body.password) {
    req.body.password = crypto.createHash('sha256').update(req.body.password).digest('base64')
  }

  next()
}
