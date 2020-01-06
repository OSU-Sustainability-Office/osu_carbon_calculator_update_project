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

  // Retrieve question data from db
  DB.connect('carbonCalculator')
  const ID = event.queryStringParameters != null && event.queryStringParameters.ID != null ? mysql.format(' WHERE ID = ?', [parseInt(event.queryStringParameters.ID)]) : ''
  let data = await DB.query('SELECT * FROM Categories' + ID)

  // Parse the ignoreResults column into a boolean value (instead of a mysql bit stream)
  res = []
  data.forEach(category => {
    res.push({
      "ID": category.ID,
      "Title": category.Title,
      "Color": category.Color,
      "IgnoreResults": category.IgnoreResults[0] === 1
    })
  })

  // Return question data
  response.body = JSON.stringify(res)
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
  let data = await DB.query(mysql.format("INSERT INTO Categories (Color, Title, IgnoreResults) VALUES (?, ?, ?);", [category.color, category.title, category.ignoreResults ? 1 : 0]))

  // Build response data
  // Return question data
  response.body = JSON.stringify([{
    "ID": data.insertId,
    "Title": category.title,
    "Color": category.color,
    "IgnoreResults": category.ignoreResults
  }])
  response.headers = {
    'Access-Control-Allow-Origin': event.headers.origin ? event.headers.origin : 'https://myco2.sustainability.oregonstate.edu',
    'Access-Control-Allow-Credentials': 'true'
  }
  return response
}
