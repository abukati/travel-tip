export const weatherService = { getWeather }


function getWeather(lat, lng) {
    const API_KEY = 'e3e9363a0d66f4413f25492e66a65a56'
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
            .then(res => res.data.main)
}