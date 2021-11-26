const joursSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 
'Dimenche']


let ajd = new Date();
let options = {waakday: 'long'}
let jourActuel = ajd.toLocaleDateString('fr-FR', options);


jourActuel = jourActuel.charAt(0).toUpperCase() + jourActuel.slice(1);

let tabJoursEnOrdre = joursSemaine.slice(joursSemaine.indexOf(jourActuel)).concat
(joursSemaine.slice(0, joursSemaine.indexOf(jourActuel)));


export default tabJoursEnOrdre;
