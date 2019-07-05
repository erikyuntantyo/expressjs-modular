'use strict'

import { GraphQLFloat, GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql'

import CommonHelper from '../../helpers/common'
import { GraphQLMethodNotAllowedError } from '../../helpers/graphql-custom-errors'
import { GraphQLTransaction } from '../types'
import Models from '../../models'

export default {
  deposit: {
    type: GraphQLTransaction,
    args: {
      userId: {
        type: new GraphQLNonNull(GraphQLID)
      },
      amount: {
        type: new GraphQLNonNull(GraphQLFloat)
      }
    },
    resolve: async (rootValue, data, { headers: { authorization } }) => {
      try {
        await CommonHelper.verifyAuthToken(authorization)

        const { data: [{ balance }] } = await Models.getModels().transactions.find({
          where: {
            userId: data.userId
          },
          order: [['createdAt', 'DESC']]
        }) || {}

        data.balance = (balance || 0) + data.amount
        data.remarks = `DEP ${data.amount}`

        return await Models.getModels().transactions.create({
          ...data,
          type: 'CR'
        })
      } catch (err) {
        throw err
      }
    }
  },
  transfer: {
    type: GraphQLTransaction,
    args: {
      userId: {
        type: new GraphQLNonNull(GraphQLID)
      },
      destUserId: {
        type: new GraphQLNonNull(GraphQLID)
      },
      amount: {
        type: new GraphQLNonNull(GraphQLFloat)
      },
      description: {
        type: GraphQLString
      }
    },
    resolve: async (rootValue, { userId, destUserId, amount, description }, { headers: { authorization } }) => {
      try {
        await CommonHelper.verifyAuthToken(authorization)

        const { firstName, lastName } = await Models.getModels().users.get(userId) || {}

        if (!firstName || !lastName) {
          throw new GraphQLMethodNotAllowedError('Unknown owner account.')
        }

        const { data: [{ balance }] } = await Models.getModels().transactions.find({
          where: { userId },
          order: [['createdAt', 'DESC']]
        }) || {}

        if (amount > balance) {
          throw new GraphQLMethodNotAllowedError('Transfers may not be made because the balance is lower than expected.')
        }

        const { firstName: destFirstName, lastName: destLastName } = await Models.getModels().users.get(destUserId) || {}

        if (!destFirstName || !destLastName) {
          throw new GraphQLMethodNotAllowedError('Unknown destination account.')
        }

        const { data: [{ balance: destBalance }] } = await Models.getModels().transactions.find({
          where: {
            userId: destUserId
          },
          order: [['createdAt', 'DESC']]
        }) || {}

        await Models.getModels().transactions.create({
          userId: destUserId,
          amount: amount,
          description,
          balance: (destBalance + amount),
          remarks: `TRF DB ${amount}\n${firstName} ${lastName}`,
          type: 'TRF'
        })

        return await Models.getModels().transactions.create({
          userId,
          amount,
          description,
          balance: balance - amount,
          remarks: `TRF CR ${amount}\n${destFirstName} ${destLastName}`,
          type: 'TRF'
        })
      } catch (err) {
        throw err
      }
    }
  },
  withdraw: {
    type: GraphQLTransaction,
    args: {
      userId: {
        type: new GraphQLNonNull(GraphQLID)
      },
      amount: {
        type: new GraphQLNonNull(GraphQLFloat)
      },
      description: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: async (rootValue, data, { headers: { authorization } }) => {
      try {
        await CommonHelper.verifyAuthToken(authorization)

        const { data: [{ balance }] } = await Models.getModels().transactions.find({
          where: {
            userId: data.userId
          },
          order: [['createdAt', 'DESC']]
        }) || {}

        if (balance < data.amount) {
          throw new GraphQLMethodNotAllowedError('Withdrawals may not be made because the balance is lower than expected.')
        }

        data.balance = (balance || 0) + data.amount
        data.remarks = `WTDR ${data.amount}`

        return await Models.getModels().transactions.create({
          ...data,
          type: 'DB'
        })
      } catch (err) {
        throw err
      }
    }
  }
}
