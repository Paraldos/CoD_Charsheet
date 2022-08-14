"use strict";

/* ====================
Dice
==================== */
let diceBox = {
  numberOfDice: 0,
  rerollNumber: 10,
  minus1: document.querySelector("#diceBox_minus1"),
  minus5: document.querySelector("#diceBox_minus5"),
  plus1: document.querySelector("#diceBox_plus1"),
  plus5: document.querySelector("#diceBox_plus5"),
  rollBtn: document.querySelector("#diceBox_rollBtn"),
  successes: document.querySelector("#diceBox_results_successes"),
  results: document.querySelector("#diceBox_results_dice"),
  setToZero: document.querySelector("#diceBox_setToZero"),
  reroll: document.querySelector("#diceBox_reroll"),
};

diceBox.setToZero.addEventListener("click", () => _change_diceBox_number(-50));
diceBox.minus1.addEventListener("click", () => _change_diceBox_number(-1));
diceBox.minus5.addEventListener("click", () => _change_diceBox_number(-5));
diceBox.plus1.addEventListener("click", () => _change_diceBox_number(+1));
diceBox.plus5.addEventListener("click", () => _change_diceBox_number(+5));

diceBox.rollBtn.addEventListener("click", function () {
  let diceArray = _roll_pool_of_dice();
  let successes = _get_number_of_successes(diceArray);
  let htmlArray = _get_HTML_array(diceArray);
  diceBox.successes.innerHTML = successes;
  diceBox.results.innerHTML = htmlArray.toString();
});

let _get_HTML_array = (arr) => {
  let newArr = arr.map((x) => {
    if (x >= diceBox.rerollNumber) x = `<span class="dice_crit">${x}</span>`;
    else if (x >= 8) x = `<span class="dice_success">${x}`;
    else x = `</span>``<span class="dice_normal">${x}</span>`;
  });

  /*
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= diceBox.rerollNumber) {
      arr[i] = `<span class="dice_crit">${arr[i]}</span>`;
    } else if (arr[i] >= 8) {
      arr[i] = `<span class="dice_success">${arr[i]}</span>`;
    } else {
      arr[i] = `<span class="dice_normal">${arr[i]}</span>`;
    }
  }
  */
  return newArr;
};

let _roll_pool_of_dice = () => {
  let myNumberOfDice = diceBox.numberOfDice;
  let resultArray = [];
  for (let i = 0; i < myNumberOfDice; i++) {
    let dice = _roll_d10();
    if (dice >= diceBox.rerollNumber) myNumberOfDice += 1;
    resultArray.push(dice);
  }
  return resultArray;
};

let _roll_d10 = () => Math.floor(Math.random() * 10) + 1;

let _get_number_of_successes = (arr) => arr.filter((el) => el >= 8).length;

let _change_diceBox_value = () =>
  (diceBox.rollBtn.innerHTML = `Roll ${diceBox.numberOfDice}`);
_change_diceBox_value();

let _change_diceBox_number = (x) => {
  diceBox.numberOfDice += x;
  if (diceBox.numberOfDice < 0) diceBox.numberOfDice = 0;
  if (diceBox.numberOfDice > 50) diceBox.numberOfDice = 50;
  _change_diceBox_value();
};
