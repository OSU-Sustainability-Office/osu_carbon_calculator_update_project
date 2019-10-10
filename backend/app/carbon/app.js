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
  response.body = JSON.stringify(data.items[0])
  return response
}



//
// // Carbon Calculator User Routes
// // Download User Data
// exports.download = (event, context) => {
//   // Get user's id from session
//
//   // Query database for user's data using ddb file
//   //return data.data
//
// 	// db.getUser(req.session.UserID).then(data => {
// 	// 	res.status(200).send(data.data)
// 	// }).catch((rej) => {
// 	// 	res.status(404).send(rej)
// 	// 	console.log(rej)
// 	// })
// })
//
// // Upload User Data
// router.post('/upload', function (req, res) {
// 	let usr = req.body
// 	if (usr.UserID) {
// 		usr.onid = usr.UserID // For compatibility with the old CC
// 		delete usr['UserID']
// 	}
// 	db.updateUser(usr)
// 	res.status(200).send('SCV good to go, sir.')
// })
//
// // Deletes one historical data point, specified by id
// router.get('/delete/:id', function (req, res) {
// 	// The id specified in this route is the index of the data point in the user's data array.
// 	db.removeData(req.session.UserID, req.params.id).then(result => {
// 		res.status(200).send(result)
// 	}).catch(err => {
// 		res.status(500).send(err)
// 	})
// })
//
// // Carbon Calculator Question Retrieval
// // This variable caches the questions in between requests
// var questionsCache = {
// 	categories: null,
// 	timestamp: null
// }
// router.get('/questions/download', function (req, res) {
// 	// This route caches the questions on the nodeJS server, and makes a DB call
// 	// once every 15 minutes at most. If multiple requests are made within a 15
// 	// minute interval, the cached questions are served to the client.
//
// 	if (questionsCache.categories === null || questionsCache.timestamp - 900000 > 0) {
// 		// The question cache is not populated, or more than 15 minutes has elapsed
// 		// Update the questions cache.
// 		db.getQuestions().then(categories => {
// 			questionsCache.categories = JSON.stringify(categories)
// 			questionsCache.timestamp = new Date()
// 			res.status(200).send(questionsCache.categories) // We store a stringified version
// 		}).catch(e => {
// 			console.log(e)
// 			res.status(404).send(e)
// 		})
// 	} else {
// 		// Less than 15 minutes has elapsed since the last request. Serve the cached version.
// 		res.status(200).send(questionsCache.categories) // We store a stringified version
// 	}
// })
//
// // Carbon Calculator Administration Routes
//
// module.exports = router;
