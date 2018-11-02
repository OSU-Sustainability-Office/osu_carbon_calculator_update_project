{
  categories: [
    {
      title: 'Transportation',
      questions: [
        {
          text: 'Do you own a car or motorcycle?',
          input: {
            type: 'list',
            values: [
              {val: 'No, I walk, bike, or stakeboard etc.', coef: 0},
              {val: 'Motorcycle', coef: 0.197},
              {val: '40+ MPG Car', coef: 0.2652},
              {val: '30-40 MPG Car', coef: 0.3547},
              {val: '20-30 MPG Car', coef: 0.4817},
              {val: 'Hybrid or Electric Car', coef: 0.202}
            ]
          },
          visible: true,
          trigger: {
            parentQuestion: null,
            triggerValue: null
          },
          metaData: 'Source: http://shrinkthatfootprint.com/calculate-your-driving-emissions'
        },
        {
          text: 'Approximately how many miles do you drive per month?',
          input: {
            type: 'dependentValue',
            values: [{val: 0, coef: 0}]
          },
          visible: false,
          trigger: {
            parentQuestion: 0,
            triggerValue: 'any'
          },
          metaData: ''
        },
        {
          text: 'Do you commute using the Corvallis or Albany Transit?',
          input: {
            type: 'list',
            values: [
              {val: 'No', coef: 0},
              {val: 'Yes', coef: 0.136}
            ]
          },
          visible: true,
          trigger: {
            parentQuestion: null,
            triggerValue: null
          },
          metaData: 'Source: https://www.buses.org/assets/images/uploads/general/Report%20-%20Energy%20Use%20and%20Emissions.pdf'
        },
        {
          text: 'Approximately how many miles per month do you travel on Corvallis or Albany Transit?',
          input: {
            type: 'dependentValue',
            values: [{val: 0, coef: 0}]
          },
          visible: false,
          trigger: {
            parentQuestion: 2,
            triggerValue: 'Yes'
          },
          metaData: ''
        },
        {
          text: 'Do you use the Greyhound, Bolt, Hut Shuttle, or Amtrak buses?',
          input: {
            type: 'list',
            values: [
              {val: 'No', coef: 0},
              {val: 'Yes', coef: 0.043}
            ]
          },
          visible: true,
          trigger: {
            parentQuestion: null,
            triggerValue: null
          },
          metaData: 'Source: https://www.buses.org/assets/images/uploads/general/Report%20-%20Energy%20Use%20and%20Emissions.pdf'
        },
        {
          text: 'Approximately how many miles/year do you travel on these buses?',
          input: {
            type: 'dependentValue',
            values: [{val: 0, coef: 0}]
          },
          visible: false,
          trigger: {
            parentQuestion: 4,
            triggerValue: 'Yes'
          },
          metaData: ''
        },
        {
          text: 'Do you travel by train?',
          input: {
            type: 'list',
            values: [
              {val: 'No', coef: 0},
              {val: 'Yes', coef: 0.147}
            ]
          },
          visible: true,
          trigger: {
            parentQuestion: null,
            triggerValue: null
          },
          metaData: 'Source: https://www.buses.org/assets/images/uploads/general/Report%20-%20Energy%20Use%20and%20Emissions.pdf'
        },
        {
          text: 'Approximately how many miles/year do you travel on train?',
          input: {
            type: 'dependentValue',
            values: [{val: 0, coef: 0}]
          },
          visible: false,
          trigger: {
            parentQuestion: 6,
            triggerValue: 'Yes'
          },
          metaData: ''
        },
        {
          text: 'Have you traveled or do you plan to travel by airplane this year?',
          input: {
            type: 'list',
            values: [
              {val: 'No', coef: 0},
              {val: 'Yes', coef: 0.2281697}
            ]
          },
          visible: true,
          trigger: {
            parentQuestion: null,
            triggerValue: null
          },
          metaData: 'Source: https://www.epa.gov/sites/production/files/2015-07/documents/emission-factors_2014.pdf'
        },
        {
          text: 'How many miles have you traveled or do you plan to fly this year?',
          input: {
            type: 'dependentValue',
            values: [{val: 0, coef: 0}]
          },
          visible: false,
          trigger: {
            parentQuestion: 8,
            triggerValue: 'Yes'
          },
          metaData: ''
        },
      ],
      color: '#AA9D2E'
    },
    {
      title: 'Consumption',
      questions: [
        {
          text: 'How much do you spend on furniture and appliances each year?',
          input: {
            type: 'value',
            values: [{val: 0, coef: 0.614}]
          },
          visible: true,
          trigger: {
            parentQuestion: null,
            triggerValue: null
          },
          metaData: 'Source: Carbon Calculator Spreadsheet: https://docs.google.com/spreadsheets/d/1FbkcWkPXmCwyWeBAtjH0eaR_kPtbDcLa3SFdK2iswAY/edit#gid=1428571633'
        },
        {
          text: 'How much do you spend on paper products (newspapers, books, textbooks, magazines etc.) each month?',
          input: {
            type: 'value',
            values: [{val: 0, coef: 2.1}]
          },
          visible: true,
          trigger: {
            parentQuestion: null,
            triggerValue: null
          },
          metaData: 'Source: Carbon Calculator Spreadsheet: https://docs.google.com/spreadsheets/d/1FbkcWkPXmCwyWeBAtjH0eaR_kPtbDcLa3SFdK2iswAY/edit#gid=1428571633'
        },
        {
          text: 'How much do you spend on personal care and cleaning supplies each month?',
          input: {
            type: 'value',
            values: [{val: 0, coef: 0.954}]
          },
          visible: true,
          trigger: {
            parentQuestion: null,
            triggerValue: null
          },
          metaData: 'Source: Carbon Calculator Spreadsheet: https://docs.google.com/spreadsheets/d/1FbkcWkPXmCwyWeBAtjH0eaR_kPtbDcLa3SFdK2iswAY/edit#gid=1428571633'
        },
        {
          text: 'How much do you spend on computers, tablets, phones, and other electronics in a year?',
          input: {
            type: 'value',
            values: [{val: 0, coef: 0.396}]
          },
          visible: true,
          trigger: {
            parentQuestion: null,
            triggerValue: null
          },
          metaData: 'Source: Carbon Calculator Spreadsheet: https://docs.google.com/spreadsheets/d/1FbkcWkPXmCwyWeBAtjH0eaR_kPtbDcLa3SFdK2iswAY/edit#gid=1428571633'
        },
        {
          text: 'How much do you spend on new clothing in a given month?',
          input: {
            type: 'value',
            values: [{val: 0, coef: 2.772}]
          },
          visible: true,
          trigger: {
            parentQuestion: null,
            triggerValue: null
          },
          metaData: 'Source: http://www.carbonfootprint.com/calculatorfaqs.html Dollars * 0.3kg/english pound * conversion rate (updated 5.5.17) * 12 months.'
        },
        {
          text: 'How much do you spend on entertainment and other recreational activities per month?',
          input: {
            type: 'value',
            values: [{val: 0, coef: 5.0323}]
          },
          visible: true,
          trigger: {
            parentQuestion: null,
            triggerValue: null
          },
          metaData: 'Source: http://www.carbonfootprint.com/calculatorfaqs.html'
        },
        {
          text: 'If you drink your water from nonrefillable plastic bottles, how many do you buy per week?',
          input: {
            type: 'value',
            values: [{val: 0, coef: 0.06826625}]
          },
          visible: true,
          trigger: {
            parentQuestion: null,
            triggerValue: null
          },
          metaData: 'Source: http://www.carbonfootprint.com/calculatorfaqs.html'
        }
      ],
      color: '#0D5257'
    },
    {
      title: 'Energy and Heating',
      questions: [
        {
          text: 'If you\'re an on campus resident, choose from the following dorms:',
          input: {
            type: 'list',
            values: [
              {val: 'None', coef: 0},
              {val: 'Bloss', coef: 1154.00},
              {val: 'Buxton', coef: 1343.37},
              {val: 'Callahan', coef: 576.00},
              {val: 'Cauthorn', coef: 703.2},
              {val: 'Finley', coef: 1448.00},
              {val: 'Halsell', coef: 1345.87},
              {val: 'Hawley', coef: 1394.51},
              {val: 'ILLC', coef: 4525.11},
              {val: 'McNary', coef: 3759.93},
              {val: 'Poling', coef: 225.43},
              {val: 'Sackett', coef: 1097.95},
              {val: 'Weatherford', coef: 2297.60},
              {val: 'West', coef: 2096.40},
              {val: 'Wilson', coef: 568.80},
              {val: 'Tebeau', coef: 1745.24}
            ]
          },
          visible: true,
          trigger: {
            parentQuestion: null,
            triggerValue: null
          },
          metaData: 'Baseline for dorms only counts heating and lighting of each building. Data provided by OSU Sustainability Office & updated on 1/28/17 to reflect FY16 school year.'
        },
        {
          text: 'If you receive energy bills, select the "Simple" option. If not, select the "Complex" option.',
          input: {
            type: 'list',
            values: [
              {val: 'Simple', coef: 0},
              {val: 'Complex', coef: 0}
            ]
          },
          visible: true,
          trigger: {
            parentQuestion: null,
            triggerValue: null
          },
          metaData: 'Baseline for dorms only counts heating and lighting of each building. Data provided by OSU Sustainability Office & updated on 1/28/17 to reflect FY16 school year.'
        },
        {
          text: 'How much do you usually pay for electricity each month (in Dollars)?',
          input: {
            type: 'dependentValue',
            values: [
              {val: 0, coef: 3.54452690167}
            ]
          },
          visible: false,
          trigger: {
            parentQuestion: 1,
            triggerValue: 'Simple'
          },
          metaData: 'Need to add source for this calculation.'
        },
        {
          text: 'How much do you usually pay for gas each month (in Dollars)?',
          input: {
            type: 'dependentValue',
            values: [
              {val: 0, coef: 5.65092592593}
            ]
          },
          visible: false,
          trigger: {
            parentQuestion: 1,
            triggerValue: 'Complex'
          },
          metaData: 'Need to add source for this calculation.'
        },
        {
          text: 'From the following list of appliances, electronics, lighting, etc, input how many of each item are in your room and how many hours a day each item is in use or plugged in. If you own an item not listed below please be sure to fill in extra fields: What is the item and wattage? You can find the wattage on the bottom of most appliances. Be sure to multiply by 1000 if the wattage is given in kilowatts.',
          input: {
            type: 'table',
            values: [ //TODO
              {val: 0, coef: 5.65092592593}
            ]
          },
          visible: false,
          trigger: {
            parentQuestion: 1,
            triggerValue: 'Complex'
          },
          metaData: 'Need to add source for this calculation.'
        }
      ],
      color: '#D3832B'
    },

    {
      title: 'Food',
      questions: [

      ],
      color: '#003B5C'
    },
    {
      title: 'Water',
      questions: [

      ],
      color: '#7A6855'
    },
    {
      title: 'Waste',
      questions: [

      ],
      color: '#FFFFFF'
    }
  ]
}
