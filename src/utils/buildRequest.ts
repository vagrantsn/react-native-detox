import axios from 'axios'

const buildRequest = ({
  method,
  body,
  path,
  params,
}) => axios({
  baseURL: 'https://api.pagar.me/1/',
  url: path,
  method,
  params,
  data: body,
})
  .then(response => response.data)
  .catch(error => {
    console.log(error.response)
  })

export default buildRequest
