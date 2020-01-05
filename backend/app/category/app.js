const User = require('/opt/nodejs/user.js')
const Response = require('/opt/nodejs/response.js')
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

// Retrieves one or more categories from the database
exports.getCategory = async (event, context) => {
  // Create empty response object from model
  let response = new Response()

  // Retrieve question data from ddb
  DB.connect('carbonCalculator')
  let ID = parseInt(event.queryStringParameters.ID)
  let data = await DB.query(ID == null ? 'SELECT * FROM Categories' : mysql.format('SELECT * FROM Categories WHERE ID = ?', [ID]))

  // Return question data
  response.body = JSON.stringify(data)
  response.headers = {
    'Access-Control-Allow-Origin': event.headers.origin ? event.headers.origin : 'https://myco2.sustainability.oregonstate.edu',
    'Access-Control-Allow-Credentials': 'true'
  }
  return response
}

// Creates a new category
exports.postCategory = async (event, context) => {
  // Create empty response object from model
  let response = new Response()

  // Initiate database connection
  DB.connect('carbonCalculator')

  // Parse JSON post data
  let category = JSON.parse(event.body)

  // Verify all required fields are present.
  // If they are not, send an error response.
  if (category.color == null | category.title == null | category.ignoreResults == null) {
    response.body = JSON.stringify({
      status: 400,
      message: 'color, title, and ignoreResults are required fields. One or more was not supplied with your request.'
    })
    response.headers = {
      'Access-Control-Allow-Origin': event.headers.origin ? event.headers.origin : 'https://myco2.sustainability.oregonstate.edu',
      'Access-Control-Allow-Credentials': 'true'
    }
    return response
  }

  // Add category to database
  let ID = parseInt(event.queryStringParameters.ID)
  let data = await DB.query(mysql.format("INSERT INTO Categories (Color, Title, IgnoreResults) VALUES (?, ?, ?);", [category.color, category.title, category.ignoreResults ? 1 : 0]))

  // Build response data
  category.id = data.insertId


  // Return question data
  response.body = JSON.stringify([category])
  response.headers = {
    'Access-Control-Allow-Origin': event.headers.origin ? event.headers.origin : 'https://myco2.sustainability.oregonstate.edu',
    'Access-Control-Allow-Credentials': 'true'
  }
  return response
}
