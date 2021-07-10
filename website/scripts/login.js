const submitBtn = document.getElementById('submitBtn')

submitBtn.onclick = () => {
  userInfo = {
    ci: document.getElementById('usernameInput').value,
    password: document.getElementById('passwordInput').value
  }
  
  axios.post('http://localhost:3000/api/auth/login', userInfo)
    .then(result => {
      const { id, username, name, lastname, email, token } = result.data.body

      sessionStorage.setItem('userID', id)
      sessionStorage.setItem('username', username)
      sessionStorage.setItem('name', name)
      sessionStorage.setItem('lastname', lastname)
      sessionStorage.setItem('email', email)
      sessionStorage.setItem('token', token)

    })
    .then(() => {
      window.location.href = './profile.html'
    })
    .catch(error => {
      console.log(error)
    })
}