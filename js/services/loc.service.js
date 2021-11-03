import { storageService } from "./local-storage.service.js"

export const locService = { getLocs, panLoc, deleteLoc, saveNewLoc }


const STORAGE_KEY = 'locs'

const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 }, 
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]


function panLoc(name) {
    let loc = locs.find(loc => loc.name === name)
    return Promise.resolve({ lat: loc.lat, lng: loc.lng })
}

function deleteLoc(name) {
    let locIdx = locs.findIndex(loc => loc.name === name)
    locs.splice(locIdx, 1)
    storageService.saveToStorage(STORAGE_KEY, locs)
    return Promise.resolve(locs)
}

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}

function saveNewLoc() {
    return new Promise((res, rej) => {
        const name = prompt('Name the spot')
        return name ? res(name) : rej('no input')
    })
}