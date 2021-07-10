const submitBtn = document.getElementById('submitBtn')

submitBtn.onclick = () => {
  const newUser = {
    username: document.getElementById('usernameInput').value,
    name: document.getElementById('nameInput').value,
    lastname: document.getElementById('lastnameInput').value,
    password: document.getElementById('passwordInput').value,
    email: document.getElementById('emailInput').value
  }

  axios.post('http://localhost:3000/api/users', newUser)
    .then(data => {
      console.log(data)
      alert('Registro exitoso!')
    })
    .catch(error => {
      console.log(error)
    })
}

