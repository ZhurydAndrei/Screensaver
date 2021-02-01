const app = document.querySelector('#app')

function createrElement() {
  let unit = `
    <div class="element">
        <div class="time"></div>
        <div class="greeting">
          <h2 class="display-3">Hello stranger</h2>
        </div>
      <div class="input-group input-group-lg input-user">
        <div class="col-sm-6">
            <input type="text" class="form-control" aria-label="Sizing example input" 
            aria-describedby="inputGroup-sizing-lg"
            placeholder="What's your name"
            maxlength="42">
        </div>
      </div>
    </div>
    <div class="drop-menu">
      <select class="select">
        <option value="">Choose your sity</option>
        <option value="Minsk">Minsk</option>
        <option value="Moscow">Moscow</option>
        <option value="Milan">Milan</option>
        <option value="Vilnius">Vilnius</option>
      </select>
    </div>
  `
  app.insertAdjacentHTML('beforeend', unit)
}

function getName() {
  let input = document.querySelector('input')
  let userName = document.querySelector('h2')
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      userName.textContent = `Hello ${input.value}`
      input.style.display = 'none'
      localStorage.setItem('userName', input.value)
    }
  })
  if (localStorage.getItem('userName') !== null) {
    userName.innerHTML = `Hello ${localStorage.getItem('userName')}`
    input.style.display = 'none'
  }
}

function timer() {
  const time = document.querySelector('.time')
  const date = new Date().toTimeString().replace(/ .*/, '')
  time.innerHTML = date
  setTimeout(timer, 1000)
}

function createWeather() {
  let select = document.querySelector('.drop-menu')
  select.addEventListener('change', (e) => {
    let city = e.target.value
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=fd33bec95dea9984a8f3d28854e4d200`

    function sendRequest(method, url) {
      return fetch(url).then((response) => response.json())
    }
    sendRequest('GET', url).then((response) => {
      select.style.display = 'none'
      let unit = `
        <div class="cards text-center">
          <img src="./img/${
            response.weather[0].icon
          }.png" class="img" alt="weather">
          <h1 class="card-title">${response.name}</h1>
          <h2 class="card-text">${Math.round(response.main.temp)}‎℃</h2>
        </div>
      `
      app.insertAdjacentHTML('beforeend', unit)
    })
  })
}

createrElement()
getName()
timer()
createWeather()
