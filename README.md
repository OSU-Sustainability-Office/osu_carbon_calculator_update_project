# Carbon Calculator - [![Build Status](https://api.travis-ci.com/OSU-Sustainability-Office/osu_carbon_calculator_update_project.svg?branch=VueJS-Migration)](https://travis-ci.com/OSU-Sustainability-Office/osu_carbon_calculator_update_project)

## [Production Build](https://myco2.sustainability.oregonstate.edu)

## [Test Build](http://carbon-calculator.s3-website-us-west-2.amazonaws.com)

## Documentation

### [API Documentation](https://osusustainability.gitbook.io/energy-dashboard/frontend-documentation#carbon-calculator)

### Introduction
Version 2.x of the Carbon Calculator is a complete redesign of Version 1.x from the ground-up. It features a new look in addition to a completely new component-based approach to frontend development. In an effort to improve maintainability, ease-of-development, and legacy browser compatibility, we migrated the calculator from plain-old HTML/CSS/JS to a standard VueJS software stack configured with Vue CLI Version 3.

Benefits:
  - Libraries and dependencies are now managed with NPM.
  - Component-based VueJS framework facilitates easy bug fixing and allows for the application to scale.
  - VueX provides a convenient central data store.
  - Element UI is included, allowing (supposedly) effortless UI design with a unified custom theme.
  - Webpack & Babel transpile ES5 and ES6 syntax into syntax compatible with older browsers.

### File Structure
osu_carbon_calculator_update_project/
├───docs
├───node_modules
│   └─── A lot of stuff...
├───public
│   ├───legacy - Contains the old calculator for compatibility with IE 8.
│   │   ├───BootFlat
│   │   │   ├───css
│   │   │   ├───js
│   │   │   └───scss  
│   │   │       └───bootflat
│   │   ├───css
│   │   ├───download
│   │   ├───fonts
│   │   │   └───Stratum 1 & Stratum 2
│   │   ├───img
│   │   ├───js
│   │   └───php
│   └───static
│       ├───fonts
│       └───images
├───src
│   ├───assets
│   │   └───theme-chalk-custom - Custom Element UI Theme
│   │       ├───lib
│   │       │   └───fonts
│   │       └───src
│   │           ├───common
│   │           ├───date-picker
│   │           ├───fonts
│   │           └───mixins
│   ├───components - Vue Components
│   │   ├───administration
│   │   └───calculator
│   │       ├───graphs
│   │       │   └───chartComponents
│   │       └───questions
│   ├───router - This is a single page application, so the router isn't used.
│   ├───store
│   │   └───modules - The VueX store is modularized.
│   └───utils
│       └───api
└───tests - Currently, there are no tests.
    └───unit

### Component Diagram
[Check it out!](docs/CarbonCalculatorDiagram.png)
