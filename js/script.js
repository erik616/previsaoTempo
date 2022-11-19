const apiKey = "ea62a22ed816148b06ec1d1cd9ba33c4";
const apiCountryURL = "https://countryflagsapi.com/png/"

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");
const outherBtn = document.querySelector("#other-search")

const cityElement = document.querySelector("#city");
const countryName = document.querySelector("#countryName");
const tempElement = document.querySelector(".temperature span");
const descElement = document.querySelector(".description");
const weatherIcon = document.querySelector("#weather-icon");
const umidityElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");
// const countryElement = document.querySelector("#country");

const weatherContainer = document.querySelector("#weather-data");
const othersContainer = document.querySelector("#others");

//FUNCTIONS
const getWeatherData = async(city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

        const res = await fetch(apiWeatherURL);
        const data = await res.json();

        console.log(data);
        return data;

}

const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    cityElement.innerText = `${data.name},`;
    countryName.innerText = data.sys.country;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerHTML = data.weather[0].description;
    weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    umidityElement.innerHTML = `${data.main.humidity}%`;
    windElement.innerHTML = `${parseInt(data.wind.speed)}km/h`;
    //countryElement.setAttribute("src", apiCountryURL + data.sys.country);
    weatherContainer.classList.remove("hide");

    othersContainer.classList.add("hide");

};


//PROCURANDO PELA LOCALIZAÇÃO 
function coordResults(lat, long) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&lang=pt_br&units=metric&APPID=${apiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`http error: status ${response.status}`)
            }
            return response.json();
        })
        .catch(error => {
            alert(error.message)
        })
        .then(response => {
            console.log('Response:',response)
            showData(response)
        });
}


const showData = async (city) => {

    cityElement.innerText = `${city.name},`;
    countryName.innerText = city.sys.country;
    tempElement.innerText = parseInt(city.main.temp);
    descElement.innerHTML = city.weather[0].description;
    weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${city.weather[0].icon}.png`);
    umidityElement.innerHTML = `${city.main.humidity}%`;
    windElement.innerHTML = `${parseInt(city.wind.speed)}km/h`;
    //countryElement.setAttribute("src", apiCountryURL + city.sys.country);
    weatherContainer.classList.remove("hide");

    othersContainer.classList.add("hide");

};


//EVENT
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city)
})


cityInput.addEventListener("keypress", (e) => {
    const city = cityInput.value;

    if(e.code === "Enter") showWeatherData(city)
})


outherBtn.addEventListener('click', () => {
    //if ("geolocation" in navigator)
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition, showError);
    }
    else {
        alert('navegador não suporta geolozalicação');
    }
    function setPosition(position) {
        console.log(position)
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        console.log(lat,long);
        coordResults(lat, long);
    }
    function showError(error) {
        alert(`erro: ${error.message}`);
    }
})

