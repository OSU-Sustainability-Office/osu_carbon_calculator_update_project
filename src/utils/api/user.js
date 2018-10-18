import axios from 'axios'

export default{
  // Returns true/false if the user has completed the ONID CAS login process.
  isLoggedIn () {},

  // Downloads the user's onid, firstName, primaryAffiliation, and historical data from the API route.
  downloadUserData () {},

  // Sends a request to the api route responsible for destroying user sessions. DOES NOT LOG OUT OF ONID!!!
  logout () {}
}
