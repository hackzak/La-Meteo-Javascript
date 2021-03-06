import tabJoursEnOrdre from './Utilitaire/gestionTemps.js';


const CLEFAPI = '20f3f8ae0fb808b6ba718b44262aea88'
let resultaAPI

const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
// les heure de la journé
const heure = document.querySelectorAll('.heure-nom-prevition');
const tempPourH = document.querySelectorAll('.heure-prevition-valeur');
// jour div 
const joursDiv = document.querySelectorAll('.jour-prevition-nom');
// jour par jour
const tempJoursDiv = document.querySelectorAll('.jour-prevition-temps');
// icon de temp 
const imgIcon = document.querySelector('.logo-temp');
// chargement 
const chargementContainer = document.querySelector('.overlay-icon-chargement');

if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {

        // console.log(position);
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        AppelAPI(long, lat);

    }, () => {
        alert(`vous avez refuser la geolocalisation , l'aplication ne peur pas 
        fonctionner, veuillez l'activer.`)

    })

}

function AppelAPI(long, lat) {

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&
    exclude=minutely&units=metric&lang=fr&appid=${CLEFAPI}`)
    .then((reponse) => {
        return reponse.json();
    })
    .then((data) => {
        // console.log(data); 

        resultaAPI = data;

        temps.innerText = resultaAPI.current.weather[0].description;
        temperature.innerText = `${Math.trunc(resultaAPI.current.temp)}°`
        localisation.innerText = resultaAPI.timezone;


        // les heures, par tranche de trois, avec leur temperature.
        
        let heureActuelle = new Date().getHours();

        for(let i = 0; i < heure.length; i++) {

            let heureIncr = heureActuelle + i * 3;

            if(heureIncr > 24) {
                heure[i].innerText = `${heureIncr - 24} h`;
            }else if(heureIncr === 24) {
                heure[i].innerText = "00 h"
            }else {
                heure[i].innerText = `${heureIncr} h`;
            }
        }    

        // temps pour 3H
        
        for(let j = 0; j < tempPourH.length; j++) {
            tempPourH[j].innerText = `${Math.trunc(resultaAPI.hourly[j * 3].temp)}°`
        }


        // trois premieres lettres des jours 

        for(let k = 0; k < tabJoursEnOrdre.length; k++){
            joursDiv[k].innerText = tabJoursEnOrdre[k].slice(0, 3);
        }


        // Temp par jours 

        for(let m = 0; m < 7; m++) {
            tempJoursDiv[m].innerText = `${Math.trunc(resultaAPI.daily[m + 1].temp.day)}°`
        }

        // Icone dynamique

        if(heureActuelle >= 6 && heureActuelle < 20) {
            imgIcon.src = `ressources/jour/${resultaAPI.current.weather[0].icon}.svg`
        } else {
            imgIcon.src = `ressources/nuit/${resultaAPI.current.weather[0].icon}.svg`
        }



        chargementContainer.classList.add('disparition');


    })


}