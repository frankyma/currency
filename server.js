const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/script.js', (req, res) => res.sendFile(path.join(__dirname, 'script.js')));


app.post('/getBudget', getBudget, (req, res) => res.json(res.locals.cost));

app.listen(3000, () => console.log('listening on 3000 Currency...'));

// middleware to get budget
function getBudget(req, res, next) {
  const { startDate, numberOfDays } = req.body;
  const cost = budgetUtil(startDate, numberOfDays);
  res.locals.cost = cost;
  next();
}

// util to return cost with startDate and numberOfDays
function budgetUtil(startDate, numberOfDays) {
  let cost = 0;
  const dateObj = new Date(startDate);
  let daysLeft = numberOfDays;
  // loop until no days left
  while (daysLeft) {
    // check if weekday
    if (dateObj.getDay() > 0 && dateObj.getDay() < 6) {
    // check which block of date and price accordingly
      if (dateObj.getDate() < 8) cost += 0.05;
      else if (dateObj.getDate() < 15) cost += 0.1;
      else if (dateObj.getDate() < 22) cost += 0.15;
      else if (dateObj.getDate() < 29) cost += 0.2;
      else cost += 0.25;
    }
    // decrement daysLeft and set the date to the next day
    daysLeft -= 1;
    dateObj.setDate(dateObj.getDate() + 1);
  }
  return cost.toFixed(2);
}
