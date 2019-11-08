if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(regObj => console.log("Service worker registered"))
    .catch(err => console.log("An error occured", err))
}