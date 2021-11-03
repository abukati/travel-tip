export const mapService = {
  initMap,
  addMarker,
  panTo,
  getMarkers,
  getGeocode,
}

const GOOGLE_API_KEY = 'AIzaSyBVA3c6L5XdP2nQhdQ2zLeXfoe7GJee8-I'

let gMap
let gMarkers = []
let currPos

function initMap(lat = 32.0749831, lng = 34.9120554) {
  const elMap = document.querySelector('#map')
  return _connectGoogleApi().then(() => {
    gMap = new google.maps.Map(elMap, { center: { lat, lng }, zoom: 10 })
    let infoWindow = new google.maps.InfoWindow({
      content: 'Find and click locations you love!',
      position: { lat, lng },
    })
    infoWindow.open(gMap)
    gMap.addListener('click', (ev) => {
      infoWindow.close()
      const coords = {
        lat: ev.latLng.lat(),
        lng: ev.latLng.lng(),
      }
      infoWindow = new google.maps.InfoWindow({
        content: `${JSON.stringify(coords)}`,
        position: coords,
      })
      infoWindow.open(gMap)
    })
  })
}

function panTo(lat, lng) {
  var laLatLng = new google.maps.LatLng(lat, lng)
  gMap.panTo(laLatLng)
  addMarker(laLatLng)
}

function addMarker(pos) {
  var marker = new google.maps.Marker({
    position: pos,
    map: gMap,
  })
  gMarkers.push(marker)
  return marker
}

function getMarkers() {
  return Promise.resolve(gMarkers)
}

function getGeocode(location) {
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${GOOGLE_API_KEY}`
    )
    .then((res) => res.data.results[0].geometry.location)
}

function _connectGoogleApi() {
  if (window.google) return Promise.resolve()
  var elGoogleApi = document.createElement('script')
  elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}`
  elGoogleApi.async = true
  document.body.append(elGoogleApi)

  return new Promise((resolve, reject) => {
    elGoogleApi.onload = resolve
    elGoogleApi.onerror = () => reject('Google script failed to load')
  })
}
