import axios from 'axios'

export default{
  // Returns a JSON object containing the Carbon Calculator questions
  downloadCategories () {
    return axios.get('carbon/questions/download', {withCredentials: true})
      .then(res => {
        return JSON.parse(res.data)
      })
  }
}
