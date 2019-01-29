# Carbon Calculator - [![Build Status](https://api.travis-ci.com/OSU-Sustainability-Office/osu_carbon_calculator_update_project.svg?branch=VueJS-Migration)](https://travis-ci.com/OSU-Sustainability-Office/osu_carbon_calculator_update_project)

## [Production Build](https://myco2.sustainability.oregonstate.edu)

## [Test Build](http://carbon-calculator.s3-website-us-west-2.amazonaws.com)

## [Documentation](https://osusustainability.gitbook.io/energy-dashboard/frontend-documentation#carbon-calculator)

## Features timeline (box is checked if implemented):
- [X] UI Updates: (1/15/19)
    - [X] Remove waste category
    - [X] Waste image
    - [X] Remove refillable water bottle question
    - [X] Change 'dorms' to 'residence halls' in energy/heating category
    - [X] Add 'Total KgCO2e'
- [X] US vs User vs Other Country graph comparison (make this primary instead of trend data)
- [X] UI Updates (1/17/19)
    - [X] Move prev/back buttons to top right corner
    - [X] Resize chart category title text
    - [X] Make chart category text respond to hover interactions
- [X] UI Updates (1/20/19)
    - [X] Historical data deletion confirmation prompt
    - [X] Catch up on previous work
    - [X] Energy and Heating baseline data (Full time / Part Time / Commuter)
- [X] Final UI Tweaks (1/22/19) **Pushed back to 1/27/19 due to illness**
    - [X] Ragen's Small UI Tweaks (direct quotes)
      - About the calculator – center the options
      - Energy and heating – specify whether I should enter how much my total bills cost for my house, or enter how much my portion of the bill is after my roommates split it up amongst us
      - All pages – page margins/padding or whatever. The left and right of the screen is cramped, give it about a centimeter more on each side? Will also help deal with some of the white space between the questions and the graphs
      - All pages – those suggestions that Brogan made at the staff meeting about the graph title on the right matching the titles on the left side, centered and bolded, etc. And matching up the lines. Make both of the titles Stratum2 Bold
      - Your results – in grey box -> Your Results > Live Results
      - Progress bar – on first page, show just a circle so people become familiar with it on the first page
      - Make the orange color a tad brighter, I don’t care what the brand says (shh) their orange is like two shades too dark and that specific shade is trash (SIC)
      - Colors: Orange: #FF4E00, Grey: #E0E0E0
    - [X] Make the charts the same height
    - [X] Change mouseover pointer on bar charts
    - [X] Add padding to chart titles
    - [X] Disable focusing on input with the tab key on non-active carousel cards
    - [X] Tap & Hold
    - [X] Add units to question inputs
    - [X] Add units to chart tooltips
- [X] Accurate Calculations + Sources (1/29/19)
    - [X] Update calculations and sources using the [Spreadsheet](https://docs.google.com/spreadsheets/d/1FbkcWkPXmCwyWeBAtjH0eaR_kPtbDcLa3SFdK2iswAY/edit#gid=135288076)
    - [X] Lety will provide updated PP&El grid mix kgco2e data
    - [X] Add 10-20 MPG option to first question in Trans category
    - [X] Update US and OR Averages
- [ ] Cache question responses while user completes log in process (1/27/19)
- [ ] Push Version 2.0 to production! (1/29/19)
