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
  // Returns true/false if the user has completed the ONID CAS login process.
  isLoggedIn () {
    return axios.get('/download', { withCredentials: true })
      .then(res => {
        if (res.status === 200) {
          return true
        } else {
          return false
        }
      }).catch(function () {
        return false
      })
  },

  // Downloads the user's onid, firstName, primaryAffiliation
  downloadUserData () {
    return axios.get('/download', { withCredentials: true })
      .then(res => {
        return res.data
      })
  },

  // Downloads the user's previous data
  downloadHistData (onid) {
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
  logout () {
    axios.get('auth/logout', { withCredentials: true })
  },

  // Uploads the user's onid, firstName, primaryAffiliation, and data.
  uploadUserData (usr) {
    axios.post('/upload', usr, {
      withCredentials: true
    })
  },

  // Calls an Extreme IP Lookup free API route and returns the JSON object
  getLocation () {
    return axios.get('http://extreme-ip-lookup.com/json/', { withCredentials: true })
      .then(res => {
        return res.data
      })
  }
}
