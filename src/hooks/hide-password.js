'use strict'

export default async (req, res, next) => {
  if (res.results.password) {
    delete res.results.password
  }

  if (res.results.total && (res.results.total > 0)) {
    res.results.data = res.results.data.map(d => {
      delete d.password
      return d
    })
  }

  next()
}
