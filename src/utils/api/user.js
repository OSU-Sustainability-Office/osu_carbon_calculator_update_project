/**
 * @Author: Jack Woods <jackrwoods>
 * @Date:   2018-11-27T13:45:59-08:00
 * @Filename: user.js
 * @Last modified by:   Jack Woods
 * @Last modified time: 2018-12-18T09:37:35-08:00
 * @Copyright: 2018 Oregon State University
 */

import axios from 'axios'

export default{
  // Returns true/false if the user has completed the ONID CAS login process.
  isLoggedIn () {
    return axios.get('auth/userData/onid', { withCredentials: true })
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
    return axios.get('auth/userData/allData', { withCredentials: true })
      .then(res => {
        return res.data
      })
  },

  // Download's the user's previous data
  downloadHistData () {
    return axios.get('carbon/download', { withCredentials: true })
      .then(res => {
        return res.data
      })
  },

  // Sends a request to the api route responsible for destroying user sessions. DOES NOT LOG OUT OF ONID!!!
  logout () {
    axios.get('auth/logout', { withCredentials: true })
  },

  // Uploads the user's onid, firstName, primaryAffiliation, and data.
  uploadUserData (usr) {
    axios.post('carbon/upload', usr, {
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
