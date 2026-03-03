function populateFete() {
  const time = new Date();
  let Mois = time.getMonth() + 1;
  let Jour = time.getDate();

  Mois += '';
  Jour += '';
  if (Mois.length !== 2) Mois = `0${Mois}`;
  if (Jour.length !== 2) Jour = `0${Jour}`;

  fetch(`/js/fetesjour/${Mois}${Jour}.txt`,
    {
      method: 'GET',
      mode: 'no-cors',

    })
    .then((response) => response.text())
    .then((response) => {
      console.log(response);
      const element = document.getElementById('fetejour');
      element.innerHTML = response;
    });
}

document.addEventListener('DOMContentLoaded', populateFete);
