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

// Retrieves one or more data points from the database
exports.getData = async (event, context) => {
  // Create empty response object from model
  let response = new Response()

  // Retrieve the User's onid via their JWT
  if (event.headers.Cookie == null || event.headers.Cookie.indexOf('token') === -1) {
    response.body = JSON.stringify({
      status: 400,
      message: 'Bad request. No authentication token cookie was included with the request.'
    })
    response.headers = {
      'Access-Control-Allow-Origin': event.headers.origin ? event.headers.origin : 'https://myco2.sustainability.oregonstate.edu',
      'Access-Control-Allow-Credentials': 'true'
    }
    return response
  }
  let user = new User(event, response)


  // Retrieve data for this user from the database
  DB.connect('carbonCalculator')
  const ID = event.queryStringParameters != null && event.queryStringParameters.ID != null ? mysql.format(' AND ID = ?', [parseInt(event.queryStringParameters.ID)]) : ''
  const sql = mysql.format('SELECT * FROM UserData WHERE ONID = ?' + ID, [user.onid])
  let data = await DB.query(sql)

  // Retrieve totals for each data point
  for (let index = 0; index < data.length; index++) {
    data[index].Totals = await DB.query(mysql.format('SELECT * FROM Totals WHERE HistDataRef = ?', [data[index].ID]))
  }

  // Return question data
  response.body = JSON.stringify(data)
  response.headers = {
    'Access-Control-Allow-Origin': event.headers.origin ? event.headers.origin : 'https://myco2.sustainability.oregonstate.edu',
    'Access-Control-Allow-Credentials': 'true'
  }
  return response
}

// Creates a new historical data point
exports.postData = async (event, context) => {
  // Create empty response object from model
  let response = new Response()

  // Retrieve the User's onid via their JWT
  if (event.headers.Cookie == null || event.headers.Cookie.indexOf('token') === -1) {
    response.body = JSON.stringify({
      status: 400,
      message: 'Bad request. No authentication token cookie was included with the request.'
    })
    response.headers = {
      'Access-Control-Allow-Origin': event.headers.origin ? event.headers.origin : 'https://myco2.sustainability.oregonstate.edu',
      'Access-Control-Allow-Credentials': 'true'
    }
    return response
  }
  let user = new User(event, response)

  // Retrieve array of totals
  let totals = JSON.parse(event.body).totals

  // Create the historical data point
  DB.connect('carbonCalculator')
  const ID = (await DB.query(mysql.format('INSERT INTO UserData (ONID) VALUES (?)', [user.onid]))).insertId

  // Create each total
  for (let index = 0; index < totals.length; index++) {
    await DB.query(mysql.format('INSERT INTO Totals (HistDataRef, Category, Total) VALUES (?, ?, ?)', [ID, totals[index].categoryID, totals[index].total]))
  }

  // Retrieve this historical data point
  let data = await DB.query(mysql.format('SELECT * FROM UserData WHERE ONID = ? AND ID = ?', [user.onid, ID]))

  // Retrieve totals for each data point
  for (let index = 0; index < data.length; index++) {
    data[index].Totals = await DB.query(mysql.format('SELECT * FROM Totals WHERE HistDataRef = ?', [data[index].ID]))
  }

  // Return question data
  response.body = JSON.stringify(data[0])
  response.headers = {
    'Access-Control-Allow-Origin': event.headers.origin ? event.headers.origin : 'https://myco2.sustainability.oregonstate.edu',
    'Access-Control-Allow-Credentials': 'true'
  }
  return response
}

// Deletes a historical data point
exports.deleteData = async (event, context) => {
  // Create empty response object from model
  let response = new Response()

  // Retrieve the data point id
  if (event.queryStringParameters == null || event.queryStringParameters.ID == null) {
    response.body = JSON.stringify({
      status: 400,
      message: 'Bad request. No ID provided.'
    })
    response.headers = {
      'Access-Control-Allow-Origin': event.headers.origin ? event.headers.origin : 'https://myco2.sustainability.oregonstate.edu',
      'Access-Control-Allow-Credentials': 'true'
    }
    return response
  }
  const ID = event.queryStringParameters.ID

  // Retrieve the User's onid via their JWT
  if (event.headers.Cookie == null || event.headers.Cookie.indexOf('token') === -1) {
    response.body = JSON.stringify({
      status: 400,
      message: 'Bad request. No authentication token cookie was included with the request.'
    })
    response.headers = {
      'Access-Control-Allow-Origin': event.headers.origin ? event.headers.origin : 'https://myco2.sustainability.oregonstate.edu',
      'Access-Control-Allow-Credentials': 'true'
    }
    return response
  }
  let user = new User(event, response)

  // Assert that the current user is the "owner" of this historical data point
  DB.connect('carbonCalculator')
  let dataPointsTest = await DB.query(mysql.format('SELECT ID FROM UserData WHERE ID = ? AND ONID = ?', [ID, user.onid]))
  if (dataPointsTest.length < 1) { // If the current user is not the owner, reject the request.
    response.body = JSON.stringify({
      status: 401,
      message: 'Unauthorized. The data point requested does not belong to your ONID account, or it does not exist.'
    })
    response.headers = {
      'Access-Control-Allow-Origin': event.headers.origin ? event.headers.origin : 'https://myco2.sustainability.oregonstate.edu',
      'Access-Control-Allow-Credentials': 'true'
    }
    return response
  }

  // Delete all of the totals associated with this data point
  await DB.query(mysql.format('DELETE FROM Totals WHERE HistDataRef = ?', [ID]))

  // Delete the data point
  await DB.query(mysql.format('DELETE FROM UserData WHERE ID = ?', [ID]))

  // Return question data
  response.body = JSON.stringify({
    status: 200,
    message: 'Data point deleted.'
  })
  response.headers = {
    'Access-Control-Allow-Origin': event.headers.origin ? event.headers.origin : 'https://myco2.sustainability.oregonstate.edu',
    'Access-Control-Allow-Credentials': 'true'
  }
  return response
}
