'use strict'

import express from 'express'
import uuidv4 from 'uuidv4'

import CustomError from './custom-error'

export default class ServiceBase {
  constructor(path, models, hook, options) {
    this.hook = hook
    this.models = models
    this.options = options
    this.path = path
  }

  createRouter() {
    const router = express.Router()

    // GET
    if (this.get !== void 0) {
      const hookBeforeGet = []
      const hookAfterGet = []

      if (this.hook.before.all && (this.hook.before.all.length > 0)) {
        hookBeforeGet.push(...this.hook.before.all)
      }

      if (this.hook.after.all && (this.hook.after.all.length > 0)) {
        hookAfterGet.push(...this.hook.after.all)
      }

      if (this.hook.before.get && (this.hook.before.get.length > 0)) {
        hookBeforeGet.push(...this.hook.before.get)
      }

      if (this.hook.after.get && (this.hook.after.get.length > 0)) {
        hookAfterGet.push(...this.hook.after.get)
      }

      router.get(`${this.path}/:id`, hookBeforeGet, async (req, res, next) => {
        try {
          const { dataValues } = await this.get(req.params.id)

          res.results = dataValues

          next()
        } catch (err) {
          if (err instanceof CustomError) {
            return res.status(err.statusCode).send(err.toJSON())
          } else {
            return res.status(500).send(err.message)
          }
        }
      }, hookAfterGet, async (req, res) => res.json(res.results).end())
    }

    // FIND
    if (this.find !== void 0) {
      const hookBeforeFind = []
      const hookAfterFind = []

      if (this.hook.before.all && (this.hook.before.all.length > 0)) {
        hookBeforeFind.push(...this.hook.before.all)
      }

      if (this.hook.after.all && (this.hook.after.all.length > 0)) {
        hookAfterFind.push(...this.hook.after.all)
      }

      if (this.hook.before.find && (this.hook.before.find.length > 0)) {
        hookBeforeFind.push(...this.hook.before.find)
      }

      if (this.hook.after.find && (this.hook.after.find.length > 0)) {
        hookAfterFind.push(...this.hook.after.find)
      }

      router.get(this.path, hookBeforeFind, async (req, res, next) => {
        try {
          const { count, rows } = await this.find(req.query)

          res.results = { total: count, data: rows.map(row => row.dataValues) }

          next()
        } catch (err) {
          if (err instanceof CustomError) {
            return res.status(err.statusCode).send(err.toJSON())
          } else {
            return res.status(500).send(err.message)
          }
        }
      }, hookAfterFind, async (req, res) => res.json(res.results).end())
    }

    // CREATE
    if (this.create !== void 0) {
      const hookBeforeCreate = []
      const hookAfterCreate = []

      if (this.hook.before.all && (this.hook.before.all.length > 0)) {
        hookBeforeCreate.push(...this.hook.before.all)
      }

      if (this.hook.after.all && (this.hook.after.all.length > 0)) {
        hookAfterCreate.push(...this.hook.after.all)
      }

      if (this.hook.before.create && (this.hook.before.create.length > 0)) {
        hookBeforeCreate.push(...this.hook.before.create)
      }

      if (this.hook.after.create && (this.hook.after.create.length > 0)) {
        hookAfterCreate.push(...this.hook.after.create)
      }

      router.post(this.path, hookBeforeCreate, async (req, res, next) => {
        try {
          req.body.id = uuidv4()

          const created = await this.create(req.body)

          res.results = created.dataValues || created

          next()
        } catch (err) {
          if (err instanceof CustomError) {
            return res.status(err.statusCode).send(err.toJSON())
          } else {
            return res.status(500).send(err.message)
          }
        }
      }, hookAfterCreate, async (req, res) => res.json(res.results).end())
    }

    // UPDATE
    if (this.update !== void 0) {
      const hookBeforeUpdate = []
      const hookAfterUpdate = []

      if (this.hook.before.all && (this.hook.before.all.length > 0)) {
        hookBeforeUpdate.push(...this.hook.before.all)
      }

      if (this.hook.after.all && (this.hook.after.all.length > 0)) {
        hookAfterUpdate.push(...this.hook.after.all)
      }

      if (this.hook.before.update && (this.hook.before.update.length > 0)) {
        hookBeforeUpdate.push(...this.hook.before.update)
      }

      if (this.hook.after.update && (this.hook.after.update.length > 0)) {
        hookAfterUpdate.push(...this.hook.after.update)
      }

      router.put(`${this.path}/:id`, hookBeforeUpdate, async (req, res, next) => {
        try {
          const { dataValues } = await this.update(req.params.id, req.body, req.query)

          res.results = dataValues

          next()
        } catch (err) {
          if (err instanceof CustomError) {
            return res.status(err.statusCode).send(err.toJSON())
          } else {
            return res.status(500).send(err.message)
          }
        }
      }, hookAfterUpdate, async (req, res) => res.json(res.results).end())
    }

    // DELETE
    if (this.delete !== void 0) {
      const hookBeforeDelete = []
      const hookAfterDelete = []

      if (this.hook.before.all && (this.hook.before.all.length > 0)) {
        hookBeforeDelete.push(...this.hook.before.all)
      }

      if (this.hook.after.all && (this.hook.after.all.length > 0)) {
        hookAfterDelete.push(...this.hook.after.all)
      }

      if (this.hook.before.delete && (this.hook.before.delete.length > 0)) {
        hookBeforeDelete.push(...this.hook.before.delete)
      }

      if (this.hook.after.delete && (this.hook.after.delete.length > 0)) {
        hookAfterDelete.push(...this.hook.after.delete)
      }

      router.delete(`${this.path}/:id`, hookBeforeDelete, async (req, res, next) => {
        try {
          const { dataValues } = await this.delete(req.params.id, req.query)

          res.results = dataValues

          next()
        } catch (err) {
          if (err instanceof CustomError) {
            return res.status(err.statusCode).send(err.toJSON())
          } else {
            return res.status(500).send(err.message)
          }
        }
      }, hookAfterDelete, async (req, res) => res.json(res.results).end())
    }

    return router
  }
}
