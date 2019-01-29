$(document).ready(onDocReady);

function onDocReady() {
  $('#get-budget').click(() => getBudget($('#date').val(), $('#days').val()));
}


function getBudget(startDate, numberOfDays) {
  axios.post('http://localhost:3000/getBudget', { startDate, numberOfDays })
    .then((res) => {
      $('#budget').text(`budget: $${res.data}`);
    })
    .catch(err => console.log('err: ', err));
}
