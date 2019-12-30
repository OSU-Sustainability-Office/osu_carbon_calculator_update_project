CREATE DATABASE carbonCalculator; /* DB RDS cluster identifier is Carbon-Calculator */

USE carbonCalculator;

/* These tables are designed according to the *rough* specifications outlined here: https://www.lucidchart.com/documents/edit/ced0e9f2-9ad2-41f6-a23f-637ca598e609/0_0 */
CREATE TABLE Categories(
  ID int NOT NULL,
  Color varchar(6),
  Title varchar(32),
  IgnoreResults BIT,
  PRIMARY KEY (ID)
);

CREATE TABLE Triggers(
  ID int NOT NULL,
  TriggerValue varchar(256),
  ParentQuestion int NOT NULL, /* Not a foreign key, but kind of. To prevent circular foreign keys, this just) REFERENCES the parent questions "OrderIndex" number. This) REFERENCES the question in this question's category with the specified OrderIndex. */
  Visible BIT NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE Questions(
  ID int NOT NULL,
  OrderIndex int NOT NULL, /* The questions are all ordered 1, 2, etc. This is the order they appear in on the frontend. Multiple questions can exist with the same order, as long as they're in different categories. within each category, each question has a unique order index*/
  QuestionText varchar(256) NOT NULL,
  MetaData varchar(512),
  TriggerRef int,
  Category int NOT NULL,
  PRIMARY KEY (ID),
  FOREIGN KEY (Category) REFERENCES Categories(ID),
  FOREIGN KEY (TriggerRef) REFERENCES Triggers(ID)
);

/* Each type of input subclass is implemented in this table. */
CREATE TABLE Inputs(
  ID int NOT NULL,
  Question int NOT NULL,
  IsTable bit NOT NULL, /* 0 - Numerical or List (Determined by number of values referencing this), 1 - Table */
  /* One or more values can reference this input. */
  /* The remaining columns in this table are for "Table" input types */
  PrimaryColumn int,
  QuantityColumn int,
  resultFormula varchar(512), /* An excel formula describing how to calculate a single result from this table */
  PRIMARY KEY (ID),
  FOREIGN KEY (Question) REFERENCES Questions(ID)
);

CREATE TABLE Units(
  ID int NOT NULL,
  Prefix BIT NOT NULL,
  Chars varchar(32) NOT NULL,
  PRIMARY KEY (ID)
);

/* Array of values for list questions */
CREATE TABLE ValuesTable( /* 'Values' is reserved in mysql */
  ID int NOT NULL,
  Type int NOT NULL, /* 1 - SingleValue (there is only one type right now, but this is here for later expansion if necessary) */
  SingleValue int,
  Coef float NOT NULL,
  Unit int,
  Input int,
  PRIMARY KEY (ID),
  FOREIGN KEY (Unit) REFERENCES Units(ID),
  FOREIGN KEY (Input) REFERENCES Inputs(ID)
);

/* User data is split into two tables*/
/* This stores the metadata describing the results from completing the carbon calculator */
CREATE TABLE UserData(
  ID int NOT NULL,
  ONID varchar(32),
  Created DATETIME,
  PRIMARY KEY (ID)
);

/* This table stores totals for each category per UserData entry. */
CREATE TABLE Totals(
  ID int NOT NULL,
  HistDataRef int NOT NULL,
  Category int NOT NULL,
  Total float NOT NULL,
  PRIMARY KEY (ID),
  FOREIGN KEY (HistDataRef) REFERENCES UserData(ID),
  FOREIGN KEY (Category) REFERENCES Categories(ID)
);
