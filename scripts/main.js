
const CLEFAPI = '82490455be39441291d54c2212f6a331'
let resultaAPI

const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');

if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {

        // console.log(position)
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        AppelAPI(long, lat);

    }, () => {
        alert(`vous avez refuser la geolocalisation , l'aplication ne peur pas 
        fonctionner, dveuillez l'activer.`)
    })
}

function AppelAPI(long, lat) {

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&
    exclude=minutely&units=metric&lang=fr&appid=${CLEFAPI}`)
    .then((reponse) => {
        return reponse.json();
    })
    .then((data) => {
        console.log(data);

        resultaAPI = data;

        temps.innerText = resultaAPI.current.weather[0].description;
        temperature.innerText = `${Math.trunc(resultaAPI.current.temp)}°`
        localisation.innerText = resultaAPI.timezone;


    })

}