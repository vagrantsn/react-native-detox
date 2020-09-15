import axios from 'axios'

type params = {
  method: any,
  path: string,
  body?: object,
  params?: object,
}

const buildRequest = ({
  method,
  body,
  path,
  params,
}: params) => axios({
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
