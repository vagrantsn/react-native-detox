import buildRequest from '../../utils/buildRequest'

const loginRequest = (data: object) => buildRequest({
  method: 'POST',
  body: data,
  path: '/sessions',
})

export default loginRequest
