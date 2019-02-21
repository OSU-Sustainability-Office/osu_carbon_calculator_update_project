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
osu_carbon_calculator_update_project/  \n
├───docs  \n
├───node_modules  \n
│   └─── A lot of stuff...  \n
├───public  \n
│   ├───legacy - Contains the old calculator for compatibility with IE 8.  \n
│   │   ├───BootFlat  \n
│   │   │   ├───css  \n
│   │   │   ├───js  \n
│   │   │   └───scss  \n
│   │   │       └───bootflat  \n
│   │   ├───css  \n
│   │   ├───download  \n
│   │   ├───fonts  \n
│   │   │   └───Stratum 1 & Stratum 2  \n
│   │   ├───img  \n
│   │   ├───js  \n
│   │   └───php  \n
│   └───static  \n
│       ├───fonts  \n
│       └───images  \n
├───src  \n
│   ├───assets  \n
│   │   └───theme-chalk-custom - Custom Element UI Theme  \n
│   │       ├───lib  \n
│   │       │   └───fonts  \n
│   │       └───src  \n
│   │           ├───common  \n
│   │           ├───date-picker  \n
│   │           ├───fonts  \n
│   │           └───mixins  \n
│   ├───components - Vue Components  \n
│   │   ├───administration  \n
│   │   └───calculator  \n
│   │       ├───graphs  \n
│   │       │   └───chartComponents  \n
│   │       └───questions  \n
│   ├───router - This is a single page application, so the router isn't used.  \n
│   ├───store  \n
│   │   └───modules - The VueX store is modularized.  \n
│   └───utils  \n
│       └───api  \n
└───tests - Currently, there are no tests.  \n
    └───unit  \n

### Component Diagram
[Check it out!](docs/CarbonCalculatorDiagram.png)
