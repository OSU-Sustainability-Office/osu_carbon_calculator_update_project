CREATE DATABASE carbonCalculator; /* DB RDS cluster identifier is Carbon-Calculator */

USE carbonCalculator;

/* These tables are designed according to the *rough* specifications outlined here: https://www.lucidchart.com/documents/edit/ced0e9f2-9ad2-41f6-a23f-637ca598e609/0_0 */
CREATE TABLE Categories(
  ID int NOT NULL AUTO_INCREMENT,
  Color varchar(6),
  Title varchar(32),
  IgnoreResults BIT,
  PRIMARY KEY (ID)
);

CREATE TABLE Questions(
  ID int NOT NULL AUTO_INCREMENT,
  Category int NOT NULL,
  OrderIndex int NOT NULL, /* The questions are all ordered 1, 2, etc. This is the order they appear in on the frontend. Multiple questions can exist with the same order, as long as they're in different categories. within each category, each question has a unique order index*/
  Type int NOT NULL, /* 0 - Paragraph, 1 - Value, 2 - List, 3 - Table */
  Title varchar(128),
  QuestionText varchar(256) NOT NULL,
  MetaData varchar(512),
  TriggerValue varchar(256),
  ParentQuestion int NOT NULL,
  Visible BIT NOT NULL,
  ResultFormula varchar(256),
  UnitChars varchar(16),
  UnitIsPrefix BIT NOT NULL,
  PRIMARY KEY (ID),
  FOREIGN KEY (Category) REFERENCES Categories(ID),
  FOREIGN KEY (ParentQuestion) REFERENCES Questions(ID)
);

/* Array of values for value, list, and table questions */
CREATE TABLE ValuesTable( /* 'Values' is reserved in mysql */
  ID int NOT NULL AUTO_INCREMENT,
  Question int NOT NULL,
  R int,
  C int,
  Val int,
  Str varchar(256),
  Coef float NOT NULL,
  Unit int,
  Input int,
  PRIMARY KEY (ID),
  FOREIGN KEY (Question) REFERENCES Questions(ID)
);

/* User data is split into two tables*/
/* This stores the metadata describing the results from completing the carbon calculator */
CREATE TABLE UserData(
  ID int NOT NULL AUTO_INCREMENT,
  ONID varchar(32),
  Created DATETIME DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (ID)
);

/* This table stores totals for each category per UserData entry. */
CREATE TABLE Totals(
  ID int NOT NULL AUTO_INCREMENT,
  HistDataRef int NOT NULL,
  Category int NOT NULL,
  Total float NOT NULL,
  PRIMARY KEY (ID),
  FOREIGN KEY (HistDataRef) REFERENCES UserData(ID),
  FOREIGN KEY (Category) REFERENCES Categories(ID)
);
