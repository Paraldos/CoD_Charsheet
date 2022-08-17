"use strict";
const skillBox = document.querySelector(".skillBox");

/* ======================================================
Create skillBox
====================================================== */
function _skillBox() {
  skillBox.innerHTML = `
  <h1>Skills</h1>
    <ul>
        <p class="section">Mental</p>
        <p class="unskilled">(Unskilled -3)</p>
        ${_build_skill(DB.skills.mental.academics, 1)}
        ${_build_skill(DB.skills.mental.computer, 2)}
        ${_build_skill(DB.skills.mental.crafts, 3)}
        ${_build_skill(DB.skills.mental.investigation, 4)}
        ${_build_skill(DB.skills.mental.medicine, 5)}
        ${_build_skill(DB.skills.mental.occult, 6)}
        ${_build_skill(DB.skills.mental.politics, 7)}
        ${_build_skill(DB.skills.mental.science, 8)}
    </ul>
    <ul>
        <p class="section">Physical</p>
        <p class="unskilled">(Unskilled -1)</p>
        ${_build_skill(DB.skills.physical.athletics, 1)}
        ${_build_skill(DB.skills.physical.brawl, 2)}
        ${_build_skill(DB.skills.physical.drive, 3)}
        ${_build_skill(DB.skills.physical.firearms, 4)}
        ${_build_skill(DB.skills.physical.larceny, 5)}
        ${_build_skill(DB.skills.physical.stealth, 6)}
        ${_build_skill(DB.skills.physical.survival, 7)}
        ${_build_skill(DB.skills.physical.weaponry, 8)}
    </ul>
    <ul>
        <p class="section">Social</p>
        <p class="unskilled">(Unskilled -1)</p>
        ${_build_skill(DB.skills.social.animalKen, 1)}
        ${_build_skill(DB.skills.social.empathy, 2)}
        ${_build_skill(DB.skills.social.expression, 3)}
        ${_build_skill(DB.skills.social.intimidation, 4)}
        ${_build_skill(DB.skills.social.persuasion, 5)}
        ${_build_skill(DB.skills.social.socialize, 6)}
        ${_build_skill(DB.skills.social.streetwise, 7)}
        ${_build_skill(DB.skills.social.subterfuge, 8)}
    </ul>`;
}
_skillBox();

function _build_skill(skill, nr) {
  let name = skill.label;
  let dots = _dots_for_points(skill.value);
  return `
    <li>
        <p class="nr">${nr}</p>
        <p class="name">${name}</p>
        <p class="points">${dots}</p>
    </li>
    `;
}

/*
<h1>Skills</h1>
<ul>
    <p class="section">Mental</p>
    <p class="unskilled">(Unskilled -3)</p>
    <li>
        <p class="nr notVisible">1</p>
        <p class="name">Academics</p>
        <p class="points">${dots.academics}</p>
    </li>
    <li>
        <p class="nr notVisible">2</p>
        <p class="name">Computer</p>
        <p class="points">${dots.computer}</p>
    </li>
    <li>
        <p class="nr notVisible">3</p>
        <p class="name">Crafts</p>
        <p class="points">${dots.crafts}</p>
    </li>
    <li>
        <p class="nr notVisible">4</p>
        <p class="name">Investigation</p>
        <p class="points">${dots.investigation}</p>
    </li>
    <li>
        <p class="nr notVisible">5</p>
        <p class="name">Medicine</p>
        <p class="points">${dots.medicine}</p>
    </li>
    <li>
        <p class="nr notVisible">6</p>
        <p class="name">Occult</p>
        <p class="points">${dots.occult}</p>
    </li>
    <li>
        <p class="nr notVisible">7</p>
        <p class="name">Politics</p>
        <p class="points">${dots.politics}</p>
    </li>
    <li>
        <p class="nr notVisible">8</p>
        <p class="name">Science</p>
        <p class="points">${dots.science}</p>
    </li>
</ul>
*/
