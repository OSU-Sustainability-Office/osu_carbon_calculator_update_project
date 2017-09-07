<?php
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
  $answerl = array();
  $answers[] = $answerl; // Add an extra line such that answers match up with
                         // corresponding cells in table.
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

  // Load questions, facts, and answers. There are 6 rows, but the first row is
  // read by the for loop above.
  for($y = 0; $y < 5; $y++) {
    $line = fgets($file);
    $line = substr($line, 4); // Eliminate first column, which is used for excel formatting.

    // Create new arrays for the row
    $questionsLine = array();
    $factsLine = array();
    $answerLine = array();

    $quotes = 0;

    for($x = 0; $x < 3; $x++) {
      $answersInCell = array();
      $questionOrFact = 0; // This helps the loop (below) determine if the currently
                           // scrutinized element is a question, fact, or answer.
      // Add questions, facts, and answers into their respective arrays.

      do {
        $load = substr($line, 0, stringLoc($line, ';'));

        // Eliminate leftover syntax characters and check for quotes.
        while ($load[0] == ',' || $load[0] == '"') {
          if ($load[0] == '"') {
            $quotes = 1;
          }
          $load = substr($load, 1); // Delete the left over syntactical elements.
        }

        // Eliminate leftover syntax characters.
        while ($load[0] == ',' || $load[0] == '"') {
          $load = substr($load, 1); // Delete the left over syntactical elements.
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

      } while ((stringLoc($line, ';') < stringLoc($line, ',') && $quotes == 0) || ($quotes == 1 && (stringLoc($line, ';') < stringLoc($line, '"'))));
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
    <?php
      // Load answers array into Javascript (quiz.js) for HTML generation.
      echo '<script>var answers = '.json_encode($answers) .';</script>';
    ?>
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
      <h1>FOSS Quiz!</h1><br />


      <h2><?php print $titles[1]; ?></h2>

      <p><?php print $questions[0][0]; ?></p>
      <p><?php print $facts[0][0]; ?></p>


      <p><?php print $questions[1][0]; ?></p>
      <p><?php print $facts[1][0]; ?></p>

      <p><?php print $questions[2][0]; ?></p>
      <p><?php print $facts[2][0]; ?></p>

      <p><?php print $questions[3][0]; ?></p>
      <p><?php print $facts[3][0]; ?></p>


      <p><?php print $questions[4][0]; ?></p>
      <p><?php print $facts[4][0]; ?></p>


      <h2><?php print $titles[2]; ?></h2>

      <p><?php print $questions[0][1]; ?></p>
      <p><?php print $facts[0][1]; ?></p>

      <p><?php print $questions[1][1]; ?></p>
      <p><?php print $facts[1][1]; ?></p>

      <p><?php print $questions[2][1]; ?></p>
      <p><?php print $facts[2][1]; ?></p>

      <p><?php print $questions[3][1]; ?></p>
      <p><?php print $facts[3][1]; ?></p>

      <p><?php print $questions[4][1]; ?></p>
      <p><?php print $facts[4][1]; ?></p>


      <h2><?php print $titles[3]; ?></h2>

      <p><?php print $questions[0][2]; ?></p>
      <p><?php print $facts[0][2]; ?></p>

      <p><?php print $questions[1][2]; ?></p>
      <p><?php print $facts[1][2]; ?></p>

      <p><?php print $questions[2][2]; ?></p>
      <p><?php print $facts[2][2]; ?></p>


      <p><?php print $questions[3][2]; ?></p>
      <p><?php print $facts[3][2]; ?></p>

      <p><?php print $questions[4][2]; ?></p>
      <p><?php print $facts[4][2]; ?></p>
    </div>
  </body>
</html>
