type Login = {
  email: string,
}

const loginRequest = (data: Login) => data.email === 'vagner-teste'
  ? Promise.resolve(data)
  : Promise.reject(data)

export default loginRequest
