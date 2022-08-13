"use strict";
console.log("started");

/* ====================
Dice
==================== */
let numberOfDice = 0;
let diceBox_value = document.querySelector(".diceBox_value");
let diceBox_minus = document.querySelector(".diceBox_minus");
let diceBox_plus = document.querySelector(".diceBox_plus");

diceBox_minus.addEventListener("click", function () {
  if (numberOfDice <= 0) return;
  numberOfDice -= 1;
  _change_dice_value(numberOfDice);
});

diceBox_plus.addEventListener("click", function () {
  numberOfDice += 1;
  _change_dice_value(numberOfDice);
});

let _change_dice_value = (value) => (diceBox_value.innerHTML = value);
