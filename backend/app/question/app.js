const User = require('/opt/nodejs/user.js')
const Response = require('/opt/nodejs/response.js')
const DDB = require('/opt/nodejs/dynamo-access.js')
const DB = require('/opt/nodejs/sql-access.js')
const mysql = require('mysql') // for formatting mysql queries

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

// Create Question(s)
exports.question = async (event, context) => {
  // Create empty response object from model
  let response = new Response()
  
  DB.connect()

  if (event.queryStringParameters) {
    // As required by the API documentation, either an ID or categoryID parameter must be provided with this GET request.
    let query = mysql.format('SELECT * FROM QUESTIONS WHERE ? = ?', [
      event.queryStringParameters.ID ? 'ID' : 'Category',
      event.queryStringParameters.ID ? event.queryStringParameters.ID : event.queryStringParameters.categoryID
    ])

    const questions = await DB.query(query)

    // {
    //   "questions": [
    //     {
    //       "ID": 999,
    //       "questionText": "How many miles do you drive each day?",
    //       "orderIndex": 3,
    //       "metaData": "This question is not real.",
    //       "input": {
    //         "type": "numerical",
    //         "value": 0, // this is the initial value that appears before the user modifies the input box on the calculator.
    //         "coef": 0.533,
    //         "unit": "mi",
    //         "isPrefix": false
    //       },
    //       "trigger": {
    //         "triggerValue": "Gasoline",
    //         "parentQuestion": 2,
    //         "visible": false
    //       },
    //       "categoryID": 0
    //     },
    //     ...
    //   ]
    // }

    let responseBody = {
      "questions": []
    }

    questions.forEach(question => {
      responseBody.questions.push(question)
    })

    response.body = JSON.stringify(responseBody)

  } else {
    // No parameters were provided.
    response.body = JSON.stringify({
      status: 400,
      message: 'Invalid parameters. An "ID" or "categoryID" must be provided.'
    })
  }

  return response
}

// Get Question(s)

// Delete Question(s)




// Carbon Calculator Question Retrieval
exports.questions = async (event, context) => {
  // Create empty response object from model
  let response = new Response()

  // Retrieve question data from ddb
  DDB.initialize()
  let data = await DDB.query('carbon-calculator-questions').scan({
      'Select': 'ALL_ATTRIBUTES',
    'Limit': 10
  })

  // Return question data
  response.body = JSON.stringify(data.Items)
  response.headers = {
    'Access-Control-Allow-Origin': event.headers.origin ? event.headers.origin : 'https://myco2.sustainability.oregonstate.edu',
    'Access-Control-Allow-Credentials': 'true'
  }
  return response
}

 // Retrieves's the current user's data from the database and includes it in the response
exports.download = async (event, context) => {
  // Create empty response object from model
  let response = new Response()

  // Create user object with current user's context (this gets user data from a JSON Web Token)
  let u = new User(event, response)

  // Retrieve that user's data from the db
  DDB.initialize()
  let data = await DDB.query('users').select({
    'Select': 'ALL_ATTRIBUTES',
    'Limit': 1,
    'ConsistentRead': true,
    'KeyConditionExpression': 'onid = :onid',
    'ExpressionAttributeValues': {
      ':onid': u.onid
    }
  })

  // Return user data
  response.body = JSON.stringify({
    data: data.Items[0].data,
    onid: u.onid,
    firstName: u.firstName,
    primaryAffiliation: u.primaryAffiliation,
    administrator: u.privilege === 0 ? false : true
  })
  response.headers = {
    'Access-Control-Allow-Origin': event.headers.origin ? event.headers.origin : 'https://myco2.sustainability.oregonstate.edu',
    'Access-Control-Allow-Credentials': 'true'
  }
  return response
}

// Deletes one historical data point, specified by id
exports.delete = async (event, context) => {
  // Create empty response object from model
  let response = new Response()

  // Create user object with current user's context (this gets user data from a JSON Web Token)
  let u = new User(event, response)

  // Get the data ID to be deleted
  let id = event.queryStringParameters.id

  // Delete the data
  let data = await DDB.query('users').update({
    'Key': {
      'onid': u.onid
    },
    'ExpressionAttributeNames': {
      '#attribute': 'data'
    },
    'UpdateExpression': 'REMOVE #attribute['+ id +']',
    'ReturnValue': 'UPDATED_NEW'
  })

  // Return user data
  response.body = JSON.stringify(data)
  response.headers = {
    'Access-Control-Allow-Origin': event.headers.origin ? event.headers.origin : 'https://myco2.sustainability.oregonstate.edu',
    'Access-Control-Allow-Credentials': 'true'
  }
  return response
}

// This function compares the user object specified to the corresponding user item
// in the DynamoDB.
//      - if the user does not exist, a new user is created with the given data.
//      - if the user exists, then the function compares the user's data and
//        updates data objects as necessary. Data objects in the database with
//        the same date as new data objects will be updated.
exports.upload = async (event, context) => {
  // Create empty response object from model
  let response = new Response()

  // Create user object with current user's context (this gets user data from a JSON Web Token)
  let u = new User(event, response)

  // New user data
  let newData = JSON.parse(event.body)

  // Update user data in dynamodb
  let data = null
  let dbResponse = null
  try {
    // Attempt to get the current user's data
    data = await DDB.query('users').select({
      'Select': 'SPECIFIC_ATTRIBUTES',
      'ProjectionExpression': '#reservedDWord',
      'ExpressionAttributeNames': { '#reservedDWord':'data' },
      'Limit': 1,
      'ConsistentRead': true,
      'KeyConditionExpression': 'onid = :onid',
      'ExpressionAttributeValues': {
        ':onid': u.onid
      }
    })

    // Reduce the data variable to just the data needed
    data = data.Items[0].data

    // Search data for the current data's date
    let i = data.map(d => d.date).indexOf(newData.date)

    // If the date is found, replace the data object with the most recent
    if (i > -1) data.splice(i, 1, newData)

    // Otherwise, add the data to the list
    else data.push(newData)

    // Update the DDB User object with the new data attribute
    dbResponse = await DDB.query('users').update({
      'UpdateExpression': 'SET #reservedDWord = :newData',
      'ExpressionAttributeNames': { '#reservedDWord':'data' },
      'Key': {
        'onid': u.onid
      },
      'ExpressionAttributeValues': {
        ':newData': data
      }
    })

  } catch(e) {

    // Create user if the query throws an error
    dbResponse = await DDB.query('users').put({
      'Item': {
        'onid': u.onid,
        'firstName': u.firstName + 'Jack',
        'primaryAffiliation': u.primaryAffiliation + 'student',
        'data': [ newData ]
      }
    })
  }

  // Return user data
  response.body = JSON.stringify(newData.date)
  response.headers = {
    'Access-Control-Allow-Origin': event.headers.origin ? event.headers.origin : 'https://myco2.sustainability.oregonstate.edu',
    'Access-Control-Allow-Credentials': 'true'
  }
  return response
}
