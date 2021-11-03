import { storageService } from './local-storage.service.js'
import { makeId } from './utils.service.js'

export const locService = {
  getLocs,
  panLoc,
  removeLoc,
  saveLoc,
}

const STORAGE_KEY = 'locationsDB'
const locs = storageService.loadFromStorage(STORAGE_KEY) || []

function saveLoc(loc) {
  _askNewLocName()
    .then((res) => {
      let newLoc = {
        id: makeId(),
        name: res,
        lat: loc.lat(),
        lng: loc.lng(),
        createdAt: Date().slice(0, 24),
        updatedAt: Date().slice(0, 24),
      }
      locs.push(newLoc)
      storageService.saveToStorage(STORAGE_KEY, locs)
    })
    .catch((err) => console.log(err))
}

function panLoc(locId) {
  let loc = locs.find((loc) => loc.id === locId)
  return Promise.resolve({ lat: loc.lat, lng: loc.lng })
}

function removeLoc(locId) {
  let locIdx = locs.findIndex((loc) => loc.id === locId)
  locs.splice(locIdx, 1)
  storageService.saveToStorage(STORAGE_KEY, locs)
  return Promise.resolve(locs)
}

function getLocs() {
  return new Promise((resolve) => resolve(locs))
}

function _askNewLocName() {
  return new Promise((resolve, reject) => {
    const name = prompt('Name the spot')
    return name ? resolve(name) : reject('no input')
  })
}
