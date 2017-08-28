
/*
 * Quiz script.
 * Copyright 2013 Google Inc.
 * Author: Michal Nazarewicz <mina86@mina86.com>
 *
 * This is not a Google product.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Shuffle Code from StackOverflow
function shuffle(array) {
var currentIndex = array.length, temporaryValue, randomIndex;

// While there remain elements to shuffle...
while (0 !== currentIndex) {

  // Pick a remaining element...
  randomIndex = Math.floor(Math.random() * currentIndex);
  currentIndex -= 1;

  // And swap it with the current element.
  temporaryValue = array[currentIndex];
  array[currentIndex] = array[randomIndex];
  array[randomIndex] = temporaryValue;
}

return array;
}

document.addEventListener('DOMContentLoaded', function() {
  /* Must be two. */
  var teams = ['Current Score: '];

  var strTie = 'Tie';
  var strClose = 'Close';

  /***********************************************/
  /* No need to configure anything further down. */
  /***********************************************/

  var NS = 'http://www.w3.org/1999/xhtml';
  var D = document;

  /* Get categories and questions from DOM. */
  var categories = (function() {
    var ret = [], questions = null, question = null;
    var el = D.getElementById('questions').firstChild;
    for (; el !== null; el = el.nextSibling) {
      if (el.nodeType !== 1) {
        continue;
      }

      if (el.nodeName.toLowerCase() === 'h2') {
        questions = [];
        question = null;
        ret.push({
          title: el.textContent,
          questions: questions,
        });
        continue;
      }

      if (questions === null) {
        continue;
      }

      if (el.nodeName.toLowerCase() === 'p') {
        var e = D.createElementNS(NS, 'div');
        el.parentNode.replaceChild(e, el);
        e.appendChild(el);
        el = e;
      } else if (el.nodeName.toLowerCase() !== 'div') {
        continue;
      }

      if (question === null) {
        el.className = 'q';
        question = el;
      } else {
        el.className = 'a';
        questions.push([question, el]);
        question = null;
      }
    }
    return ret;
  })();

  /* Scores will be saved here. */
  var scores = [];


  /* Helper functions */

  var nukeChildren = function(el) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  };

  var addText = function(el, text) {
    el.appendChild(D.createTextNode(text));
  };

  var addNewElement = function(parent, el, opt_text) {
    var el = D.createElementNS(NS, el);
    parent.appendChild(el);
    if (opt_text) {
      addText(el, opt_text);
    }
    return el;
  };

  var addNewClass = function(el, class_name){
    el.className += " " + class_name;
  }

  /* Create the question board. */

  var mDiv, div, makeTeamClickHandler, linksList, xLink, answer2Link, correctAnswerLink, answer3Link, answer4Link, closeLink;

  (function() {
    mDiv = addNewElement(D.getElementsByTagName('body')[0], 'div');
    mDiv.id = 'm';

    div = addNewElement(addNewElement(mDiv, 'div'), 'div');

    xLink = addNewElement(div, 'a', 'x');
    xLink.id = 'x';

    linksList = addNewElement(div, 'ul');
    linksList.id = 'links';

    correctAnswerLink = addNewElement(addNewElement(linksList, 'li'), 'button', 'One');
    answer2Link   = addNewElement(addNewElement(linksList, 'li'), 'button', 'Two');
    answer3Link = addNewElement(addNewElement(linksList, 'li'), 'button', 'Three');
    answer4Link = addNewElement(addNewElement(linksList, 'li'), 'button', 'Four');
    addNewClass(correctAnswerLink, 'btn_select');
    addNewClass(answer2Link, 'btn_select');
    addNewClass(answer3Link, 'btn_select');
    addNewClass(answer4Link, 'btn_select');

    var el = addNewElement(div, 'ul');
    closeLink = addNewElement(addNewElement(el, 'li'), 'button', strClose);
    addNewClass(closeLink, 'btn_select btn_blue_light');
  })();


  /* Build table with quesitons. */

  var makeClickHandler = (function() {
    var questionShown = false;
    var question, points, td;

    var close = function() {
      mDiv.className = '';
      questionShown = false;
      question[0].parentNode.removeChild(question[0]);
      question[1].parentNode.removeChild(question[1]);
      return false;
    };

    xLink.onclick = close;
    answer2Link.onclick = function() {
      m.className += ' showAnswer';
      return false;
    };
    answer3Link.onclick = function() {
      m.className += ' showAnswer';
      return false;
    };
    answer4Link.onclick = function() {
      m.className += ' showAnswer';
      return false;
    };

    (function() {
      makeTeamClickHandler = function(team) {
        return function() {
          if (team !== -1) {
            scores[team][0] += points;
            nukeChildren(scores[team][1]);
            addText(scores[team][1], '' + scores[team][0]);
            td.className = 'correct';
          }
          m.className += ' showAnswer';
          td.onclick = null;
          if (team !== 0) close();
          return false;
        };
      };

      correctAnswerLink.onclick = makeTeamClickHandler(0);
      closeLink.onclick = makeTeamClickHandler(-1);
    })();

    return function(_question, _points) {
      return function() {
        if (!questionShown) {
          question = _question;
          points = _points;
          td = this;

          question[0] = question[0].cloneNode(true);
          question[1] = question[1].cloneNode(true);

          // Populate Questions with the Correct Answers
          nukeChildren(mDiv);

          div = addNewElement(addNewElement(mDiv, 'div'), 'div');

          xLink = addNewElement(div, 'a', 'x');
          xLink.id = 'x';

          linksList = addNewElement(div, 'ul');
          linksList.id = 'links';

          var col = this.cellIndex;
          var row = this.parentNode.rowIndex;

          var randomOrder = [0,1,2,3];
          randomOrder = shuffle(randomOrder);
          var buttons = [];
          var j = 0;
          for (var i = 0; i < 4; i++) {
            if (randomOrder[i] == 0) {
              correctAnswerLink = addNewElement(addNewElement(linksList, 'li'), 'button', answers[row-2][col][randomOrder[i]]);
            } else {
              buttons[j] = addNewElement(addNewElement(linksList, 'li'), 'button', answers[row-2][col][randomOrder[i]]);
              j++;
            }
          }
          answer2Link = buttons[0];
          answer3Link = buttons[1];
          answer4Link = buttons[2];
          addNewClass(correctAnswerLink, 'btn_select');
          addNewClass(answer2Link, 'btn_select');
          addNewClass(answer3Link, 'btn_select');
          addNewClass(answer4Link, 'btn_select');

          var el = addNewElement(div, 'ul');
          closeLink = addNewElement(addNewElement(el, 'li'), 'button', strClose);
          addNewClass(closeLink, 'btn_select btn_blue_light');

          xLink.onclick = close;
          answer2Link.onclick = function() {
            m.className += ' showAnswer';
            td.className = 'incorrect';
            return false;
          };
          answer3Link.onclick = function() {
            m.className += ' showAnswer';
            td.className = 'incorrect';
            return false;
          };
          answer4Link.onclick = function() {
            m.className += ' showAnswer';
            td.className = 'incorrect';
            return false;
          };

          correctAnswerLink.onclick = makeTeamClickHandler(0);
          closeLink.onclick = makeTeamClickHandler(-1);

          linksList.parentNode.insertBefore(question[0], linksList);
          linksList.parentNode.insertBefore(question[1], linksList);
          m.className = 'show';
        }
        return false;
      };
    };
  })();

  var makeScoreHandler = function(team) {
    return function() {
      var score = window.prompt('Enter new score:', scores[team][0]);
      if (score) {
        score = parseInt(score);
        scores[team][0] = score
        nukeChildren(scores[team][1]);
        addText(scores[team][1], '' + score);
        return false;
      }
    }
  };

  (function() {
    var table, rowset, row, cell;

    table = D.createElementNS(NS, 'table');
    mDiv.parentNode.insertBefore(table, mDiv);

    // Titles for categories
    rowset = addNewElement(table, 'thead');
    row = addNewElement(rowset, 'tr');
    row.className = 'title';

    cell = addNewElement(row, 'th');
    cell.setAttribute('colspan', '' + categories.length);

    var title = D.getElementsByTagNameNS(NS, 'title')[0];
    addNewElement(cell, 'h1', title.textContent);

    // Score
    row = addNewElement(rowset, 'tr');
    var addScoreCell = function(team) {
      cell = addNewElement(row, 'td');
      cell.colspan= "1";
      cell = addNewElement(row, 'td');

      var divP = D.createElementNS(NS, 'div');
      divP.className= 'centerElements';
      cell.appendChild(divP);

      var div = D.createElementNS(NS, 'div');
      div.className= 'scoreTitle';
      divP.appendChild(div);
      div.appendChild(D.createTextNode(teams[team]));

      div = D.createElementNS(NS, 'div');
      div.className= 'score';
      divP.appendChild(div);
      div.appendChild(D.createTextNode('0'));
      div.onclick = makeScoreHandler(team);
      return div;
    };

    scores.push([0, addScoreCell(0)]);
    if (categories.length > 2) {
      cell = D.createElementNS(NS, 'td');
      cell.setAttribute('colspan', '' + categories.length - 2);
      row.appendChild(cell);
    }

    row = addNewElement(rowset, 'tr');
    row.className = 'categories';

    categories.forEach(function(cat) {
      cell = addNewElement(row, 'th', cat.title);
    });

    // Questions
    rowset = addNewElement(table, 'tbody');

    var max = 0;
    categories.forEach(function(cat) {
      if (cat.questions.length > max) {
        max = cat.questions.length;
      }
    });

    for (var i = 1; i <= max; ++i) {
      row = addNewElement(rowset, 'tr');

      categories.forEach(function(cat) {
        cell = addNewElement(row, 'td');
        if (i <= cat.questions.length) {
          addText(cell, '' + (i * 100));
          cell.className = 'active';
          cell.onclick = makeClickHandler(cat.questions[i - 1], i * 100);
        } else {
          addText(cell, '\u00A0');
        }
      });
    }
  })();
});
