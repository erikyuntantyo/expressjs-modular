'use strict'

import bcrypt from 'bcrypt'
import { GraphQLBoolean, GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql'

import CommonHelper from '../../helpers/common'
import { GraphQLAccount, GraphQLDate } from '../types'
import Models from '../../models'

export default {
  createAccount: {
    type: GraphQLAccount,
    args: {
      username: {
        type: new GraphQLNonNull(GraphQLString)
      },
      email: {
        type: new GraphQLNonNull(GraphQLString)
      },
      password: {
        type: new GraphQLNonNull(GraphQLString)
      },
      accountNumber: {
        type: new GraphQLNonNull(GraphQLString)
      },
      bankId: {
        type: new GraphQLNonNull(GraphQLString)
      },
      firstName: {
        type: new GraphQLNonNull(GraphQLString)
      },
      lastName: {
        type: new GraphQLNonNull(GraphQLString)
      },
      dob: {
        type: new GraphQLNonNull(GraphQLDate)
      },
      address: {
        type: new GraphQLNonNull(GraphQLString)
      },
      phone: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: async (rootValue, {
      username,
      email,
      password,
      accountNumber,
      bankId,
      firstName,
      lastName,
      dob,
      address,
      phone
    }, { headers: { authorization } }) => {
      await CommonHelper.verifyAuthToken(authorization)

      const createdAccount = await Models.getModels().accounts.create({
        accountNumber,
        bankId,
        firstName,
        lastName,
        dob,
        address,
        phone
      })

      await Models.getModels().users.create({
        username,
        email,
        password: await bcrypt.hash(password, 10),
        accountId: createdAccount.id
      })

      return createdAccount
    }
  },
  disableAccount: {
    type: GraphQLAccount,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      },
      disabled: {
        type: GraphQLBoolean
      }
    },
    resolve: async (rootValue, { id, disabled = true }, { headers: { authorization } }) => {
      await CommonHelper.verifyAuthToken(authorization)
      return await Models.getModels().accounts.update(id, { disabled })
    }
  },
  updateAccount: {
    type: GraphQLAccount,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      },
      email: {
        type: GraphQLString
      },
      firstName: {
        type: GraphQLString
      },
      lastName: {
        type: GraphQLString
      },
      dob: {
        type: GraphQLDate
      },
      address: {
        type: GraphQLString
      },
      phone: {
        type: GraphQLString
      }
    },
    resolve: async (rootValue, { id, email, ...data }, { headers: { authorization } }) => {
      await CommonHelper.verifyAuthToken(authorization)

      if (email) {
        const { data: [{ id: userId }] } = await Models.getModels().users.find({ where: { accountId: id } })
        await Models.getModels().users.update(userId, { email })
      }

      return await Models.getModels().accounts.update(id, data)
    }
  }
}
