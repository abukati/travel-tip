import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { weatherService } from './services/weather.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onLocClick = onLocClick
window.onRemoveLoc = onRemoveLoc

function onInit() {
  mapService
    .initMap()
    .then(() => {
      console.log('Map is ready')
      renderCurrLoc()
    })
    .catch((err) => console.log(err))
  renderLocs()
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
  // console.log('Getting Pos')
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

function onAddMarker() {
  // console.log('Adding a marker')
  mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetLocs() {
  locService.getLocs().then((locs) => {
    // console.log('Locations:', locs)
    // document.querySelector('.locs').innerText = JSON.stringify(locs)
  })
}

function onGetUserPos() {
  getPosition()
    .then((pos) => {
      mapService.panTo(pos.coords.latitude, pos.coords.longitude)
      // document.querySelector(
      //   '.user-pos'
      // ).innerText = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
    })
    .catch((err) => {
      console.log('err!!!', err)
    })
}

function onPanTo() {
  let location = document.querySelector('.search-bar').value
  mapService
    .getGeocode(location)
    .then(mapService.panTo)
    .then(locService.saveLoc)
    .then(renderLocs)
    .then(renderCurrLoc)
}

function renderCurrLoc() {
  console.log('renderCurrLoc')
  const elCurrLocation = document.querySelector('.locations-container span')
  mapService.getLocName().then((locname) => {
    elCurrLocation.innerHTML = locname
  })
}

function onGetLocUrl() {}

function renderWeather(weather) {
  const elWeather = document.querySelector('.weather-container .weather')
  var strHtmls = ``
  // elWeather.innerHTML = strHtmls
}

function renderLocs() {
  const elSavedLocs = document.querySelector('.my-locations .saved-locations')
  var strHtmls = ``
  locService.getLocs().then((res) => {
    res.forEach((location) => {
      const locId = `${location.id}`
      strHtmls += `<button class="capitalize location" data-locid="${locId}" onclick="onLocClick(this.dataset.locid)">
      ${location.name}
      <i class="fas fa-trash-alt icon" data-locid="${locId}" onclick="onRemoveLoc(this.dataset.locid)"></i>
      </button>`
    })
    elSavedLocs.innerHTML = strHtmls
  })
}

function onRemoveLoc(locid) {
  locService.removeLoc(locid)
  renderLocs()
}

function onLocClick(locid) {}
