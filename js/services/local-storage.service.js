export const storageService = { loadFromStorage, saveToStorage }

function loadFromStorage(key) {
  let str = localStorage.getItem(key)
  let val = JSON.parse(str)
  return val
}

function saveToStorage(key, val) {
  let str = JSON.stringify(val)
  localStorage.setItem(key, str)
}
