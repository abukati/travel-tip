export const weatherService = { getWeather }


function getWeather(lat, lng) {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
            .then(res => res.data.main)
}
