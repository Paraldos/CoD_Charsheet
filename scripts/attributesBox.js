"use strict";
const attributeBox = document.querySelector(".attributeBox");

/* ======================================================
Create attributeBox
====================================================== */
function _attributeBox() {
  let dots = {
    intelligence: _dots_for_points(DB.attributes.mental.intelligence.value),
    wits: _dots_for_points(DB.attributes.mental.wits.value),
    resolve: _dots_for_points(DB.attributes.mental.resolve.value),
    //
    strength: _dots_for_points(DB.attributes.physical.strength.value),
    dexterity: _dots_for_points(DB.attributes.physical.dexterity.value),
    stamina: _dots_for_points(DB.attributes.physical.stamina.value),
    //
    presence: _dots_for_points(DB.attributes.social.presence.value),
    manipulation: _dots_for_points(DB.attributes.social.manipulation.value),
    composure: _dots_for_points(DB.attributes.social.composure.value),
  };
  attributeBox.innerHTML = `
  <h1>Attributes</h1>
  <ul class="info">
    <li>Power</li>
    <li>Finess</li>
    <li>Resistance</li>
  </ul>
  <ul class="attributes">
    <li>
      <p>Intelligence</p><p class="value">${dots.intelligence}</p>
    </li>
    <li>
      <p>Wits</p><p class="value">${dots.wits}</p>
    </li>
    <li>
      <p>Resolve</p><p class="value">${dots.resolve}</p>
    </li>
  </ul>
  <ul class="attributes">
    <li>
      <p>Strength</p><p class="value">${dots.strength}</p>
    </li>
    <li>
      <p>Dexterity</p><p class="value">${dots.dexterity}</p>
    </li>
    <li>
      <p>Stamina</p><p class="value">${dots.stamina}</p>
    </li>
  </ul>
  <ul class="attributes">
    <li>
      <p>Presence</p><p class="value">${dots.presence}</p>
    </li>
    <li>
      <p>Manipulation</p><p class="value">${dots.manipulation}</p>
    </li>
    <li>
      <p>Composure</p><p class="value">${dots.composure}</p>
    </li>
  </ul>`;
}
