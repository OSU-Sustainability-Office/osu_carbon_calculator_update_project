<?php

  // Since strpos returns false if the char is not found, I created a Function
  // that returns the location of the end of the string. This allows me to
  // iterate through the strings easier. -JW
  function stringLoc($string, $c) {
    if (strpos($string, $c) !== false) {
      return strpos($string, $c);
    } else {
      return strlen($string);
    }
  }

  // Open file.
  $file = fopen("questions.csv", "r") or die("Unable to open file!");
  // Create initial arrays.
  $titles = array();
  $questions = array();
  $facts = array();
  $answers = array(); // 3D array containing answers. The X/Y plane looks as follows:
  /************************************************************************************************
   * Array of Answers | Array of Answers | Array of Answers | Array of Answers | Array of Answers
   * ---------------------------------------------------------------------------------------------
   * Array of Answers | Array of Answers | Array of Answers | Array of Answers | Array of Answers
   * ---------------------------------------------------------------------------------------------
   * Array of Answers | Array of Answers | Array of Answers | Array of Answers | Array of Answers
   * ---------------------------------------------------------------------------------------------
   * Array of Answers | Array of Answers | Array of Answers | Array of Answers | Array of Answers
   * ---------------------------------------------------------------------------------------------
   * Array of Answers | Array of Answers | Array of Answers | Array of Answers | Array of Answers
   ************************************************************************************************/
  /* In each cell, an array contains each answer as a string. The string in the 0-index
   * location in each array contains the correct answer. */

  // Iterate over the entire file.
  // The file must have 6 lines.
  // The first line only contains the titles for each category.
  $line = fgets($file);
  for($i = 0; $i < 4; $i++) {
    // Add each title to the array
    $titles[] = substr($line, 0, stringLoc($line, ','));
    $line = substr($line, stringLoc($line, ',') + 1); // Delete current element from line
  }

  // Load questions, facts, and answers.
  for($y = 0; $y < 5; $y++) {
    $line = fgets($file);
    // Create new arrays for the row
    $questionsLine = array();
    $factsLine = array();
    $answerLine = array();
    for($x = 0; $x < 5; $x++) {
      $answersInCell = array();
      $questionOrFact = 0; // This helps the loop (below) determine if the currently
                           // scrutinized element is a question, fact, or answer.
      // Add questions, facts, and answers into their respective arrays.
      do {
        $load = substr($line, 0, stringLoc($line, ';')); // Whichever comes first.
        while ($load[0] == ',') {
          $load = substr($load, 1); // Delete the left over comma.
        }
        switch ($questionOrFact){
          case 0: // Current element is a question.
            $questionsLine[] =  $load; // Add question to current line.
            $questionOrFact = 1;
            break;
          case 1: // Current element is a fact.
            $factsLine[] =  $load; // Add fact to current line.
            $questionOrFact = 2;
            break;
          case 2: // Curent element is an answer.
            $answersInCell[] = $load; // Add answer to current cell.
        }
        $line = substr($line, stringLoc($line, ';') + 1);
        // If the length to the next ';' is greater than or equal to the length
        //  to the next comma, then end this cell and start a new one.
      } while (stringLoc($line, ';') < stringLoc($line, ','));
      $answerLine[] =  $answersInCell; // Add cell to current row.
    }
    $questions[] = $questionsLine;
    $facts[] = $factsLine;
    $answers[] = $answerLine; // Add row to current array.
  }

  // Close file.
  fclose($myfile);
?>


<html>
<!--
     Quiz script was modified from a script provided by Google:

     Copyright 2013 Google Inc.
     Written by Michal Nazarewicz <mina86@mina86.com>

     This is not a Google product.

     Licensed under the terms of of Creative Commons Attribution 3.0
     Unported License which can be found at

         http://creativecommons.org/licenses/by/3.0/deed.en

     or in LICENSE.CC-BY-3 file.
  -->
  <head>
    <title>Sustainability Jeopardy</title>
    <meta http-equiv="content-type" content="application/xhtml+xml; charset=utf-8" />
    <link rel="stylesheet" type="text/css" href="quiz.css" />
    <script type="text/javascript" src="quiz.js"></script>
    <style type="text/css">
      #questions {
        /* Visible only in print, make sure it's hidden even if CSS
         * file is not loaded. */
        display: none;
      }
    </style>
  </head>
  <body>
    <div id="questions">
      <h1>FOSS Quiz!</h1>

      <h2><?php print $titles[0]; ?></h2>

      <p><?php print $questions[0][0]; ?></p>
      <p>Even thought Linus Torvalds is Finnish, his native language is
      Swedish.</p>

      <p><?php print $questions[1][0]; ?></p>
      <p>It's Alan Cox.</p>

      <p><?php print $questions[2][0]; ?></p>
      <p>RMS refers to Richard Stallman, and M stands for his middle
      name which is Matthew.</p>

      <p><?php print $questions[3][0]; ?></p>
      <p>Marshall Kirk McKusick was born that day.</p>

      <p><?php print $questions[4][0]; ?></p>
      <p>Bradley M. Kuhn is the first FSF Associate Member.</p>


      <h2><?php print $titles[1]; ?></h2>

      <p><?php print $questions[0][1]; ?></p>
      <p>Freax, but mirror maintainer where it has been first
      distributed decided that Linux is better.</p>

      <div>
        <p><?php print $questions[1][1]; ?></p>
        <div><img src="img/puffy.png" alt="Puffy" /></div>
      </div>
      <p>Puffy is OpenBSD's mascot.</p>

      <div>
        <p><?php print $questions[2][1]; ?></p>
        <div><img src="img/tux-with-pipe.jpg" alt="Tux smoking a pipe" /></div>
      </div>
      <p>The oldest still distribution still being maintained is
      Slackware.</p>

      <p><?php print $questions[3][1]; ?></p>
      <p>Two followup BSD 4.3 releases are Tahoe and Reno.</p>

      <div>
        <p><?php print $questions[4][1]; ?></p>
        <div><img src="img/beastie.png" alt="Beastie" /></div>
      </div>
      <p>Even though McKussick holds the copyright it's John Alan
      Lasseter who drew it.</p>


      <h2><?php print $titles[2]; ?></h2>

      <p><?php print $questions[0][2]; ?></p>
      <p>GNU General Public License.</p>

      <p><?php print $questions[1][2]; ?></p>
      <p>Even though a lot of Android uses more permissive license,
      the kernel is based on Linux and thus distributed under the
      terms of the GNU General Public License version 2.</p>

      <p><?php print $questions[2][2]; ?></p>
      <p>Do What The Fuck you want to Public License.</p>

      <p><?php print $questions[3][2]; ?></p>
      <p>CERN.</p>

      <p><?php print $questions[4][2]; ?></p>
      <p>AGPL includes a clause requiring source code distribution of
      software run as a service (eg. web applications).</p>


      <h2><?php print $titles[3]; ?></h2>

      <p><?php print $questions[0][3]; ?></p>
      <p>The initial Linux release happened on September 1991.</p>

      <p><?php print $questions[1][3]; ?></p>
      <p>Linus Torvalds was born on the year of Moon landing,
      1969.</p>

      <p><?php print $questions[2][3]; ?></p>
      <p>PDP-11.</p>

      <div>
        <p><?php print $questions[3][3]; ?></p>
        <div><img src="img/watson.jpg" alt="Watson's avatar" /></div>
      </div>
      <p>It's IBM's Watson.</p>

      <p><?php print $questions[4][3]; ?></p>
      <p>Xerox 9700.</p>
    </div>
  </body>
</html>
