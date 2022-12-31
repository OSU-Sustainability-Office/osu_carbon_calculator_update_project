/**
 * @Author: Jack Woods <jackrwoods>
 * @Date:   2018-11-27T13:45:59-08:00
 * @Filename: user.js
 * @Last modified by:   Jack Woods
 * @Last modified time: 2019-01-15T13:35:30-08:00
 * @Copyright: 2018 Oregon State University
 */

import axios from 'axios'

export default{

  // Downloads the user's onid, firstName, primaryAffiliation, and historical data
  downloadUserData () {
    return axios.get('/download', { withCredentials: true })
      .then(res => {
        return res.data
      })
  },

  // Deletes the user's previous data
  deleteHistData (row) {
    axios.get('/delete?id=' + row, { withCredentials: true })
  },

  // Sends a request to the api route responsible for destroying user sessions. DOES NOT LOG OUT OF ONID!!!
  // 11/7/2019 - Need to create logout route & verify that it works.
  logout () {
    axios.get('auth/logout', { withCredentials: true })
  },

  // Uploads the user's data.
  // This data contains the totals for each category of the calculator
  uploadUserData (data) {
    axios.post('/upload', data, {
      withCredentials: true
    })
  },

  // Calls an Extreme IP Lookup free API route and returns the JSON object
  getLocation () {
    return axios.get('https://extreme-ip-lookup.com/json/', { withCredentials: true })
      .then(res => {
        return res.data
      })
  }
}
