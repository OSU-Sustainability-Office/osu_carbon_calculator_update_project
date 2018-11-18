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

  // Downloads the user's onid, firstName, primaryAffiliation, and historical data from the API route.
  downloadUserData () {
    return axios.get('auth/userData/allData', { withCredentials: true })
      .then(res => {
        return res.data
      })
  },

  // Sends a request to the api route responsible for destroying user sessions. DOES NOT LOG OUT OF ONID!!!
  logout () {
    axios.get('auth/logout', { withCredentials: true })
  }
}
