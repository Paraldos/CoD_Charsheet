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
  successes: document.querySelector("#diceBox_successes"),
  results: document.querySelector("#diceBox_results"),
  reset: document.querySelector("#diceBox_reset"),
  reroll: document.querySelector("#diceBox_reroll"),
};

diceBox.reset.addEventListener("click", () => _diceBox_reset());
diceBox.minus1.addEventListener("click", () => _change_diceBox_number(-1));
diceBox.minus5.addEventListener("click", () => _change_diceBox_number(-5));
diceBox.plus1.addEventListener("click", () => _change_diceBox_number(+1));
diceBox.plus5.addEventListener("click", () => _change_diceBox_number(+5));
diceBox.rollBtn.addEventListener("click", () => _push_rollBtn());
diceBox.reroll.addEventListener("click", () => _push_rerollBtn());

/* ================================================ */
function _diceBox_reset() {
  _change_diceBox_number(-50);
  diceBox.rerollNumber = 10;
  diceBox.reroll.innerHTML = `${diceBox.rerollNumber}-again`;
  diceBox.successes.innerHTML = `<span>${0}</span>`;
  diceBox.results.innerHTML = "(nothing)";
}

/* ================================================ */
function _push_rerollBtn() {
  diceBox.rerollNumber -= 1;
  if (diceBox.rerollNumber < 8) diceBox.rerollNumber = 10;
  diceBox.reroll.innerHTML = `${diceBox.rerollNumber}-again`;
}

/* ================================================ */
function _push_rollBtn() {
  let diceArray = _roll_pool_of_dice();
  let successes = _get_number_of_successes(diceArray);
  let htmlArray = _get_HTML_array(diceArray);
  diceBox.successes.innerHTML = `<span>${successes}</span>`;
  diceBox.results.innerHTML = `${diceArray.length} dice (${
    diceBox.numberOfDice
  } base) || ${successes} Successes, ${
    diceArray.length - successes
  } Failures || ${htmlArray.toString()}`;
}

function _roll_pool_of_dice() {
  let myNumberOfDice = diceBox.numberOfDice;
  let resultArray = [];
  for (let i = 0; i < myNumberOfDice; i++) {
    let dice = Math.floor(Math.random() * 10) + 1;
    if (dice >= diceBox.rerollNumber) myNumberOfDice += 1;
    resultArray.push(dice);
  }
  return resultArray;
}

let _get_number_of_successes = (arr) => arr.filter((el) => el >= 8).length;

function _get_HTML_array(arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= diceBox.rerollNumber) {
      newArr[i] = `<span class="dice_crit">${arr[i]}</span>`;
    } else if (arr[i] >= 8) {
      newArr[i] = `<span class="dice_success">${arr[i]}</span>`;
    } else {
      newArr[i] = `<span class="dice_fail">${arr[i]}</span>`;
    }
  }
  return newArr;
}

/* ================================================ */
let _change_diceBox_value = () =>
  (diceBox.rollBtn.innerHTML = `Roll ${diceBox.numberOfDice}`);
_change_diceBox_value();

/* ================================================ */
function _change_diceBox_number(x) {
  diceBox.numberOfDice += x;
  if (diceBox.numberOfDice < 0) diceBox.numberOfDice = 0;
  if (diceBox.numberOfDice > 50) diceBox.numberOfDice = 50;
  _change_diceBox_value();
}
