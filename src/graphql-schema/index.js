import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLSchema,
  GraphQLString
} from 'graphql'
import { Kind } from 'graphql/language'
import crypto from 'crypto'
import uuidv4 from 'uuidv4'

import Models from '../models'

const GraphQLDate = new GraphQLScalarType({
  name: 'Date',
  serialize: value => value.getTime(),
  parseValue: value => new Date(value),
  parseLiteral: ast => {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10)
    }

    return null
  }
})

const BanksType = new GraphQLObjectType({
  name: 'banks',
  fields: {
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    code: {
      type: GraphQLString
    }
  }
})

const AccountsType = new GraphQLObjectType({
  name: 'accounts',
  fields: {
    id: {
      type: GraphQLID
    },
    accountNumber: {
      type: GraphQLString
    },
    bank: {
      type: BanksType,
      resolve: async (parent) => {
        const { dataValues } = await Models.getModels().banks.get(parent.bankId)
        return dataValues
      }
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
  }
})

const UsersType = new GraphQLObjectType({
  name: 'users',
  fields: {
    id: {
      type: GraphQLID
    },
    username: {
      type: GraphQLString
    },
    type: {
      type: GraphQLString
    },
    account: {
      type: AccountsType,
      resolve: async (parent) => {
        const { dataValues } = await Models.getModels().accounts.get(parent.accountId)
        return dataValues
      }
    }
  }
})

const Query = new GraphQLObjectType({
  name: 'query',
  fields: {
    Users: {
      type: GraphQLList(UsersType),
      resolve: async () => {
        const { rows } = await Models.getModels().users.find()
        return rows.map(r => r.dataValues)
      }
    },
    User: {
      type: UsersType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve: async (parent, args) => {
        const { dataValues } = await Models.getModels().users.get(args.id)
        return dataValues
      }
    },
    Accounts: {
      type: GraphQLList(AccountsType),
      resolve: async () => {
        const { rows } = await Models.getModels().accounts.find()
        return rows.map(r => r.dataValues)
      }
    },
    Account: {
      type: AccountsType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve: async (parent, args) => {
        const { dataValues } = await Models.getModels().accounts.get(args.id)
        return dataValues
      }
    },
    Banks: {
      type: GraphQLList(BanksType),
      resolve: async () => {
        const { rows } = await Models.getModels().banks.find()
        return rows.map(r => r.dataValues)
      }
    },
    Bank: {
      type: BanksType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve: async (parent, args) => {
        const { dataValues } = await Models.getModels().banks.get(args.id)
        return dataValues
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    newBank: {
      type: BanksType,
      args: {
        name: {
          type: GraphQLString
        },
        code: {
          type: GraphQLString
        }
      },
      resolve: async (value, data) => {
        data.id = uuidv4()

        const { dataValues } = await Models.getModels().banks.create(data)

        return dataValues
      }
    },
    newUser: {
      type: UsersType,
      args: {
        username: {
          type: GraphQLString
        },
        password: {
          type: GraphQLString
        },
        type: {
          type: GraphQLString
        }
      },
      resolve: async (value, data) => {
        data.id = uuidv4()

        const { dataValues } = await Models.getModels().users.create(data)

        return dataValues
      }
    },
    opsUser: {
      type: UsersType,
      args: {
        id: {
          type: GraphQLID
        },
        username: {
          type: GraphQLString
        },
        password: {
          type: GraphQLString
        },
        type: {
          type: GraphQLString
        }
      },
      resolve: async (value, body) => {
        let { id, username, password, type, ops } = body

        if (ops === 'new') {
          const { dataValues } = await Models.getModels().users.create({
            id: uuidv4(),
            username,
            password: crypto.createHash('sha256').update(password).digest('base64'),
            type
          })

          return dataValues
        }

        if (ops === 'edit') {
          const { dataValues } = await Models.getModels().users.update(id, {
            username,
            password: crypto.createHash('sha256').update(password).digest('base64'),
            type
          })

          return dataValues
        }

        if (ops === 'delete') {
          const { dataValues } = await Models.getModels().users.delete(id)
          return dataValues
        }
      }
    }
  }
})

export default new GraphQLSchema({
  query: Query,
  mutation: Mutation
})
