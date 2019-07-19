import {API_URL} from '@/env'
import axios from 'axios'

const apiCall = (endpoint,method,data,relative=true) => new Promise((resolve, reject) => {
  
  let url = relative ? API_URL + endpoint : endpoint;
  //console.log(url)

  axios({
    method: method,
    url: url,
    data: data,
  })
  .then(({data: resp}) => {resolve(resp)})
  .catch(err => {reject(err)})

})

export default apiCall
