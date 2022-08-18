"use strict";
const clanBox = document.querySelector(".clanBox");

/* ======================================================
Main function for the clanBox
====================================================== */
function _clanBox() {
  clanBox.innerHTML = `
    <h1>Clan</h1>
    <li class="clanBox_status">
        <p><b>Current Clan:</b> ${_get_current_clan().label}</p>
        <p><b>Favored Attribute:</b> None</p>
    </li>`;
  DB.clans.forEach((el, index) => _clanBox_options(el, index));
  _clanBox_collapse();
  _clanBox_buttons();
}

/* ============ get current clan ============ */
let _get_current_clan = () => DB.clans[DB.clan.value];

/* ======================================================
add functionallity to buttons
====================================================== */
function _clanBox_buttons() {
  let clanBtns = document.querySelectorAll(".clanBtn");
  for (let i = 0; i < clanBtns.length; i++) {
    clanBtns[i].addEventListener("click", () => {
      DB.clan.value = i;
      _clanBox_update();
    });
  }
}

/* ============ update current mask and dirge ============ */
function _clanBox_update() {
  let clanBox_status = document.querySelector(".clanBox_status");
  clanBox_status.innerHTML = `
    <p><b>Current Clan:</b> ${_get_current_clan().label}</p>
    <p><b>Favored Attribute:</b> None</p>`;
}

/* ======================================================
add collaps function
====================================================== */
function _clanBox_collapse() {
  let buttons = document.querySelectorAll(".clan_option");
  let infos = document.querySelectorAll(".clan_info");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", () => _collapseElement(infos[i]));
  }
}

/* ======================================================
add options
====================================================== */
function _clanBox_options(el, index) {
  let newEl = document.createElement("li");
  newEl.innerHTML = `
    <button class="clan_option">${el.label}</button>
    <div class="clan_info collapsed"> <!-- add collapsed here -->
        <p>${el.description}</p>
        <p><b>Nickname:</b> ${el.nickname}</p>
        <p><b>Clan Bane (${el.bane.label}):</b> ${el.bane.description}</p>
        <p><b>Favored Attributes:</b> ${el.favoredAttributes}</p>
        <p><b>Disciplines:</b> ${el.disciplines}</p>
        <div class="buttons">
            <button class="clanBtn">Choose ${el.label} as Clan</button>
        </div>
    </div>`;
  clanBox.appendChild(newEl);
}

/*
<ul class="clanBox box">
<h1>Clan</h1>
<li class="status">
    <p><b>Current Clan:</b> None</p>
    <p><b>Favored Attribute:</b> None</p>
</li>
<li>
    <button class="clan_option">Daeva</button>
    <div class="clan_info"> <!-- add collapsed here -->
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, commodi error labore ullam consequuntur officia, ipsum in earum nihil veniam saepe assumenda numquam! Nobis error, nulla numquam temporibus velit eaque!</p>
        <p><b>Nickname:</b> Serpents</p>
        <p><b>Clan Bane (The Wanton Curse):</b> Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
        <p><b>Favored Attributes:</b> Dexterity or Manipulation</p>
        <p><b>Desciplines:</b> Celerity, Majesty, Vigor</p>
    </div>
    <div class="buttons">
        <button class="clanBtn">Choose Daeva as Clan</button>
        <button disabled="true" class="">Choose Dexterity</button>
        <button disabled="true" class="">Choose Manipulation</button>
    </div>
</li>
</ul>
*/
