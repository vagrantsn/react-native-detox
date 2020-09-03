const loginRequest = (data: object) => (
  fetch('https://api.pagar.me/1/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then(async (res) => {
      const parsed = await res.json()
      if (!res.ok) {
        throw parsed
      }

      return parsed
    })
)

export default loginRequest
