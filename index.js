const html = document.querySelector('html');
const budjetId = document.querySelector('#budjet');

const balanceValue = document.querySelector('#balance-value');
const valueExpense = document.querySelector('#expenses-value');



const expenseId = document.querySelector('#expense');

const expenseAmount = document.querySelector('#expense-amount');
const btnCalcul = document.querySelector('#btn-calcul');

const btnExpense = document.querySelector('#btn-expense');

let valueExpenseAmount = document.querySelector('#expense-value');


const hidden = document.querySelector('.hidden')
const div = document.querySelector('.transaction');

const messageAlerteBudjet = document.querySelector('#budjet-alerte');
const messageAlerteDepence = document.querySelector("#depence");
const messageAlertePositive = document.querySelector("#positive");
const btnRest = document.querySelector('#reset');
const elementHistorique = document.querySelector('#history');
const btnHistory = document.querySelector('#btnHistory');
let budjetValue = document.querySelector('#budjet-value');
console.log(btnHistory)


let dataLocal;

let myValue = {
  
}

const ctx = document.getElementById('myChart');

const data = {
  labels: [

  ],
  datasets: [{
    label: '1',
    data: [],
    backgroundColor: [],
    hoverOffset: 4
  }]
};


let depense = [];
let myTableau = [];






function list(arr) {
  if (arr !== null) {
    arr;
    const maList = [];
    let y = 'F'
    for (let i = 0; i < arr.length; i++) {
      maList.push(`<li class="position-relative">${arr[0]}</li><li>${arr[1]}<span> ${y}</span></li><li><button class="icon btn"><img src="image/edit.svg"></button><button  class="icon btn"><img src="image/delet.svg"></button></li>`)
      return maList;
    }
  }
}

function count() {
  let compteur = 1;

  compteur = compteur < 10 ? `0${compteur}` : compteur;
  return compteur;

}
function listHistory(arr) {
  if (arr !== null) {
    arr;
    const maList = [];
    let y = 'F'
    for (let i = 0; i < arr.length; i++) {
      maList.push(`<li>${count()}</li><li class="position-relative">${arr[(i)]}</li><li>${arr[(i + 1)]}<span> ${y}</span></li>`)
      return maList;

    }

  }
}

function addition(a, b) {
  return a + b;
}

let value = []
if (JSON.parse(localStorage.getItem('myTableau'))) {
  value=  JSON.parse(localStorage.getItem('myTableau'));
  let ul = document.createElement('ul');
  ul.setAttribute('class', 'list-unstyled w-100 d-flex justify-content-around flex-wrap ')
  ul.innerHTML = list(value);

  const hr = document.createElement('hr');
  hr.setAttribute("style", "color:#3cd4f7; ");

  div.append(ul);
  div.append(hr);

  console.log("page is fully loaded");


  let ulPrime = document.createElement('ul');
  ulPrime.setAttribute("class", "list-unstyled w-100 d-flex justify-content-between list flex-wrap");
  ulPrime.innerHTML = listHistory(value);


  elementHistorique.append(ulPrime);
  elementHistorique.append(hr);

for(let i = 0; i < value.length; i++){
  data.datasets[0].data.push(value[(i+1)]);
  if(i%2 == 0)  data.labels.push(value[(i)])
  data.datasets[0].backgroundColor.push(addColor());
  data.datasets[0].label = 'prix';
  const graphique = Chart.getChart("myChart");
  if (graphique) graphique.destroy();
  new Chart(ctx, {
    type: 'doughnut',
    data: data,
  });
}
  



  
}



addToBudjet();
if (localStorage.getItem('budjet')) {
  budjetValue.textContent = localStorage.getItem('budjet');
}







function addToBudjet() {

  let valeur = budjetValue.value;
  if (budjetId.value > 0 && budjetId.value !== null) {

    messageAlerteBudjet.classList.remove('hidden');
    setInterval(() => {
      messageAlerteBudjet.classList.add('hidden');
    }, 1000);
    valeur = addition(parseInt(valeur), parseInt(budjetId.value));
    localStorage.setItem('budjet', valeur)

    budjetValue.textContent = valeur;
    balanceValue.textContent = valeur;

  }
}


if (JSON.parse(localStorage.getItem('depense'))) {
  let value = JSON.parse(localStorage.getItem('depense'));
  valueExpense.textContent = value[1];
  balanceValue.textContent = localStorage.getItem('budjet') - value[1];
  console.log(value);

}
else if (localStorage.getItem('budjet')) {
  balanceValue.textContent = localStorage.getItem('budjet')
}






function addToExpense() {

  if (expenseId.value !== null && expenseAmount.value > 0) {
    let valeur;
    valeur = valueExpense.value;

    valeur = addition(parseInt(valeur), parseInt(expenseAmount.value));
    valueExpense.textContent = valeur;
    balanceValue.textContent = localStorage.getItem('budjet') - valeur;
    JSON.parse(localStorage.getItem('depense'));
    JSON.parse(localStorage.getItem('myTableau'));
    myTableau.push(expenseId.value, expenseAmount.value);
    depense.push(expenseId.value, valeur);

    localStorage.setItem('depense', JSON.stringify(depense));
    localStorage.setItem('myTableau', JSON.stringify(myTableau))

  }
}


function graphique() {
  for(let i = 0; i < value.length; i++){
    if(i%2 == 0)  data.labels.push(value[(i)]);
  
    data.datasets[0].data.push(value[(i+1)]);
    data.datasets[0].backgroundColor.push(addColor());
    data.datasets[0].label = 'prix';
    const graphique = Chart.getChart("myChart");
    if (graphique) graphique.destroy();

    new Chart(ctx, {
      type: 'doughnut',
      data: data,
    });
  }

  // if (expenseId.value !== null && expenseAmount.value > 0) {
  //   let element = JSON.parse(localStorage.getItem('myTableau'));
  //   for(let i = 0; i < element.length; i++){
      
  //     data.labels.push(element[i]);
      
  //     data.datasets[0].data.push(element[(i)]);
  
  //     data.datasets[0].backgroundColor.push(addColor());
  //     data.datasets[0].label = 'prix';
  //     const graphique = Chart.getChart("myChart");
  //     if (graphique) graphique.destroy();
  //     new Chart(ctx, {
  //       type: 'doughnut',
  //       data: data,
  //     });
  
  //   }
   

  // }

}


let y = JSON.parse(localStorage.getItem('myTableau'));
function addDepense() {
  if (expenseAmount.value <= 0) {
    messageAlertePositive.classList.remove('hidden');
    setInterval(() => {
      messageAlertePositive.classList.add('hidden');
    }, 2000)
  }
  else {
    if (expenseId.value !== null && expenseAmount.value > 0) {
      messageAlerteDepence.classList.remove('hidden');
      setInterval(() => {
        messageAlerteDepence.classList.add('hidden');
      }, 2000);

      console.log(value)

      let ul = document.createElement('ul');
      ul.setAttribute('class', 'list-unstyled w-100 d-flex justify-content-around flex-wrap ')
      ul.innerHTML = list(y);

      const hr = document.createElement('hr');
      hr.setAttribute("style", "color:#3cd4f7; ");

      div.append(ul);
      div.append(hr);
    }


  }


}
let valeur = JSON.parse(localStorage.getItem('myTableau'));
if(JSON.parse(localStorage.getItem('myTableau'))){
 

  function addHistory() {
   
      let ulPrime = document.createElement('ul');
      ulPrime.setAttribute("class", "list-unstyled w-100 d-flex justify-content-between list flex-wrap");
      for(let i = 0; i < valeur.length; i++){
        ulPrime.innerHTML = listHistory(valeur);
    
        const hr = document.createElement('hr');
        hr.setAttribute("style", "color:#3cd4f7; ");
      
        elementHistorique.append(ulPrime);
        elementHistorique.append(hr);
      }
    
   
    
  }
  
}




btnCalcul.addEventListener('click', (e) => {
  e.preventDefault()
  addToBudjet();
  addDepense();
  addToExpense();
});

btnExpense.addEventListener('click', (e) => {
  e.preventDefault()
  addToExpense();
  addDepense();
  addHistory();
  graphique();

  const btnEdit = document.querySelectorAll('.icon');
  for (let i = 0; i < btnEdit.length; i++) {
    btnEdit[0].addEventListener('click', () => {

    });

    btnEdit[1].addEventListener('click', () => {

    })
  }

});
btnHistory.addEventListener("click", () => {
  elementHistorique.classList.remove('hidden')
})
function reset() {
  localStorage.clear();
  document.location.reload()

}
function addColor() {

  var color = `#${crypto.getRandomValues(new Uint32Array(1))[0].toString(16).padStart(8, 0).slice(-6)}`
  return color;

}


function recupererLocal() {

}


// au chargement de la page
window.addEventListener("load", (event) => {


});