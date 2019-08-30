# expressjs-modular

> Implementation ExpressJS modular approach with ES6 and GraphQL example

## About

This is an example of ExpressJS modular approach that uses ES6 and include GraphQL example.

## Getting Started

1. Make sure you have [NodeJS](https://nodejs.org) and [npm](https://www.npmjs.com) or [yarn](https://yarnpkg.com) installed. And also [nodemon](https://nodemon.io/) to monitor the source and automatically restart the server when any changes in the source.

2. Install dependencies
    ```$ cd path/to/expressjs-modular```

    Using `yarn`
    ```bash
    $ yarn
    ```

    Using `npm`
    ```bash
    $ npm install
    ```

3. Configuration

    a. Set the listener port to run the server

    b. Set the database connection

    c. Set the authentication secret using random text

    d. Set administrator email to create super admin user

4. Run
    Using yarn
    ```bash
    $ yarn start
    ```

    Using npm
    ```bash
    $ npm start
    ```

5. Test
    Using yarn
    ```
    $ yarn test
    ```

    Using npm
    ```
    $ npm test
    ```

## Directory Structure

```tree
root  // root folder
  |- config // server configuration files
  |- src // main sources
  |    |- graphql-schema // graphql schema
  |    |- helpers        // helper classes
  |    |- hooks          // global hook middleware
  |    |- models         // database model classes
  |    |- services       // service and hook modules
  |
  |- test   // test unit module
```

## API Blueprint

### GraphQL API

```diff
# POST /graphql
+ headers: Authorization token with generated JWT
+ payload: Graphql query and mutation
```

### Restful API

#### Users Endpoint

```diff
# GET /users/:id

# GET /users

# POST /users
  + payload object

# UPDATE /users/:id
  + payload object

# DELETE /users/:id
```

#### Banks Endpoint

```diff
# GET /banks/:id

# GET /banks

# POST /banks
  + payload object

# UPDATE /banks/:id
  + payload object

# DELETE /banks/:id
```

#### Accounts Endpoint

```diff
# GET /accounts/:id

# GET /accounts

# POST /accounts
  + payload object

# UPDATE /accounts/:id
  + payload object

# DELETE /accounts/:id
```

#### Transactions Endpoint

```diff
# GET /transactions/:id

# GET /transactions

# POST /transactions
  + payload object

# UPDATE /transactions/:id
  + payload object

# DELETE /transactions/:id
```

#### Authentication Token Endpoint

```diff
# POST /auth/token
  + payload object
```

## Features

1. Restful API with authorization method in the hook of each service modules.

2. GraphQL API with authorization method and can be added in the first line of each resolve methods and wrapped by try-catch.

## Todo

1. Add another graphql schema to handle all CRUD processes

2. Completing transaction module

3. Add authentication in graphql method

4. Add reset authentication token method

## License

Copyright (c) 2019

Licensed under the [MIT license](LICENSE).
