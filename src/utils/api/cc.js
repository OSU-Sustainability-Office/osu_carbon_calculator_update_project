import axios from 'axios'

export default {
  // Returns a JSON object containing the Carbon Calculator questions
  downloadCategories () {
    return axios
      .get('/questions', { withCredentials: true })
      .then((res) => {
        return res.data
      })
      .catch((e) => {
        return []
      })
  }
}
