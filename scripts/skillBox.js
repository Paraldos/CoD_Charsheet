"use strict";

const skillBox = document.querySelector(".skillBox");

/* ======================================================
Create skillBox
====================================================== */
function _skillBox() {
  console.log(DB.skills.mental.academics.value);
  let dots = {
    academics: _dots_for_points(DB.skills.mental.academics.value),
    computer: _dots_for_points(DB.skills.mental.computer.value),
    crafts: _dots_for_points(DB.skills.mental.crafts.value),
    investigation: _dots_for_points(DB.skills.mental.investigation.value),
    medicine: _dots_for_points(DB.skills.mental.medicine.value),
    occult: _dots_for_points(DB.skills.mental.occult.value),
    politics: _dots_for_points(DB.skills.mental.politics.value),
    science: _dots_for_points(DB.skills.mental.science.value),
    //
    athletics: _dots_for_points(DB.skills.physical.athletics.value),
    brawl: _dots_for_points(DB.skills.physical.brawl.value),
    drive: _dots_for_points(DB.skills.physical.drive.value),
    firearms: _dots_for_points(DB.skills.physical.firearms.value),
    larceny: _dots_for_points(DB.skills.physical.larceny.value),
    stealth: _dots_for_points(DB.skills.physical.stealth.value),
    survival: _dots_for_points(DB.skills.physical.survival.value),
    weaponry: _dots_for_points(DB.skills.physical.weaponry.value),
    //
    animalKen: _dots_for_points(DB.skills.social.animalKen.value),
    empathy: _dots_for_points(DB.skills.social.empathy.value),
    expression: _dots_for_points(DB.skills.social.expression.value),
    intimidation: _dots_for_points(DB.skills.social.intimidation.value),
    persuasion: _dots_for_points(DB.skills.social.persuasion.value),
    socialize: _dots_for_points(DB.skills.social.socialize.value),
    streetwise: _dots_for_points(DB.skills.social.streetwise.value),
    subterfuge: _dots_for_points(DB.skills.social.subterfuge.value),
  };
  skillBox.innerHTML = `
  <p class="header">Skills</p>
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

    <ul>
        <p class="section">Physical</p>
        <p class="unskilled">(Unskilled -1)</p>

        <li>
            <p class="nr notVisible">1</p>
            <p class="name">Athletics</p>
            <p class="points">${dots.athletics}</p>
        </li>
        <li>
            <p class="nr notVisible">2</p>
            <p class="name">Brawl</p>
            <p class="points">${dots.brawl}</p>
        </li>
        <li>
            <p class="nr notVisible">3</p>
            <p class="name">Drive</p>
            <p class="points">${dots.drive}</p>
        </li>
        <li>
            <p class="nr notVisible">4</p>
            <p class="name">Firearms</p>
            <p class="points">${dots.firearms}</p>
        </li>
        <li>
            <p class="nr notVisible">5</p>
            <p class="name">Larceny</p>
            <p class="points">${dots.larceny}</p>
        </li>
        <li>
            <p class="nr notVisible">6</p>
            <p class="name">Stealth</p>
            <p class="points">${dots.stealth}</p>
        </li>
        <li>
            <p class="nr notVisible">7</p>
            <p class="name">Survival</p>
            <p class="points">${dots.survival}</p>
        </li>
        <li>
            <p class="nr notVisible">8</p>
            <p class="name">Weaponry</p>
            <p class="points">${dots.weaponry}</p>
        </li>
    </ul>

    <ul>
        <p class="section notVisible">Social</p>
        <p class="unskilled">(Unskilled -1)</p>

        <li>
            <p class="nr notVisible">1</p>
            <p class="name">Animal Ken</p>
            <p class="points">${dots.animalKen}</p>
        </li>
        <li>
            <p class="nr notVisible">2</p>
            <p class="name">Empathy</p>
            <p class="points">${dots.empathy}</p>
        </li>
        <li>
            <p class="nr notVisible">3</p>
            <p class="name">Expression</p>
            <p class="points">${dots.expression}</p>
        </li>
        <li>
            <p class="nr notVisible">4</p>
            <p class="name">Intimidation</p>
            <p class="points">${dots.intimidation}</p>
        </li>
        <li>
            <p class="nr notVisible">5</p>
            <p class="name">Persuasion</p>
            <p class="points">${dots.persuasion}</p>
        </li>
        <li>
            <p class="nr notVisible">6</p>
            <p class="name">Socialize</p>
            <p class="points">${dots.socialize}</p>
        </li>
        <li>
            <p class="nr notVisible">7</p>
            <p class="name">Streetwise</p>
            <p class="points">${dots.streetwise}</p>
        </li>
        <li>
            <p class="nr notVisible">8</p>
            <p class="name">Subterfuge</p>
            <p class="points">${dots.subterfuge}</p>
        </li>
    </ul>`;
}
_skillBox();
