import { storageService } from './local-storage.service.js'
import { makeId } from './utils.service.js'

export const locService = {
  getLocs,
  panLoc,
  removeLoc,
  askNewLocName,
  saveLoc,
}

const STORAGE_KEY = 'locationsDB'
const locs = storageService.loadFromStorage(STORAGE_KEY) || []

function saveLoc(loc) {
  askNewLocName()
    .then((res) => {
      let newLoc = {
        id: makeId(),
        name: res,
        lat: loc.lat,
        lng: loc.lng,
        createdAt: Date().slice(0, 24),
        updatedAt: Date().slice(0, 24),
      }
      locs.push(newLoc)
      storageService.saveToStorage(STORAGE_KEY, locs)
    })
    .catch((err) => console.log(err))
}

function panLoc(name) {
  let loc = locs.find((loc) => loc.name === name)
  return Promise.resolve({ lat: loc.lat, lng: loc.lng })
}

function removeLoc(name) {
  let locIdx = locs.findIndex((loc) => loc.name === name)
  locs.splice(locIdx, 1)
  storageService.saveToStorage(STORAGE_KEY, locs)
  return Promise.resolve(locs)
}

function getLocs() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(locs)
    }, 2000)
  })
}

function saveLoc(loc) {
  askNewLocName()
    .then((res) => {
      let newLoc = {
        id: makeId(),
        name: res,
        lat: loc.lat(),
        lng: loc.lng(),
        createdAt: Date().slice(0, 24),
        updatedAt: Date().slice(0, 24),
      }
      console.log(newLoc)
      locs.push(newLoc)
      storageService.saveToStorage(STORAGE_KEY, locs)
    })
    .catch((err) => console.log(err))
}

function askNewLocName() {
  return new Promise((resolve, reject) => {
    const name = prompt('Name the spot')
    return name ? resolve(name) : reject('no input')
  })
}
