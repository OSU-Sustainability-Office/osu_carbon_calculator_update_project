const User = require('/opt/nodejs/user.js')
const Response = require('/opt/nodejs/response.js')
const DDB = require('/opt/nodejs/dynamo-access.js')

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
  response.body = JSON.stringify(data.Items[0].data)
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
    'TableName': 'users',
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
  return response
}

// router.get('/delete/:id', function (req, res) {
// 	// The id specified in this route is the index of the data point in the user's data array.
// 	db.removeData(req.session.UserID, req.params.id).then(result => {
// 		res.status(200).send(result)
// 	}).catch(err => {
// 		res.status(500).send(err)
// 	})
// })



// exports.upload = async (event, context) => {
//   // Create empty response object from model
//   let response = new Response()
//
//   // Create user object with current user's context (this gets user data from a JSON Web Token)
//   let u = new User(event, response)
//
//   // Update user data in dynamodb
//
//
// }

//
// // Carbon Calculator Administration Routes
//
// module.exports = router;
