export default class SignUpAdapter {
  static signUp(data) {
    return (
      fetch("http://localhost:3000/api/v1/signup", {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
      })
      .then((resps) => {return resps.json()})
    )
  }
}
