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
            values: [
              ['Item', 'Quantity', 'Watts', 'Active Use (Hours/Day)', 'Standby Use (Hours/Day)'],
              ['Refrigerator', '1', '160', '24', '0'],
              ['Microwave', '1', '1000', '0', '0'],
              ['Clock Radio', '1', '10', '0', '0'],
              ['iPod Dock', '1', '100', '0', '0'],
              ['Stereo Sound System', '1', '150', '0', '0'],
              ['Desktop Computer', '1', '400', '0', '0'],
              ['Computer Monitor', '1', '35', '0', '0'],
              ['Laptop Computer', '1', '60', '0', '0'],
              ['Printer', '1', '100', '0', '0'],
              ['TV', '1', '115', '0', '0'],
              ['Poirtable Fan', '1', '115', '0', '0'],
              ['Floor Lamp', '1', '300', '0', '0'],
              ['Game Console', '1', '140', '0', '0'],
              ['Other', '1', '0', '0', '0']
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
        {
          text: 'On average, how many portions of red meat do you eat in a week?',
          input: {
            type: 'value',
            values: [{val: 0, coef: 3.48875}]
          },
          visible: true,
          trigger: {
            parentQuestion: null,
            triggerValue: null
          },
          metaData: 'A portion consists of: 1/2 lbs of ground beef, or 4-5 ounces of cooked steak.'
        },
        {
          text: 'On average, how many portions of dairy products or eggs do you eat in a week?',
          input: {
            type: 'value',
            values: [{val: 0, coef: 1.2192}]
          },
          visible: true,
          trigger: {
            parentQuestion: null,
            triggerValue: null
          },
          metaData: 'A portion consists of: 3 eggs, 1 cup of yogurt or milk, or 4 slices of cheese.'
        },
        {
          text: 'On average, how many portions of fruits and vegetables do you eat in a week?',
          input: {
            type: 'value',
            values: [{val: 0, coef: 0.09725}]
          },
          visible: true,
          trigger: {
            parentQuestion: null,
            triggerValue: null
          },
          metaData: 'A portion consists of: 1 apple, orange or banana; 1 cup of diced fruit; 2 apricots, kiwis, or plums; 1 potato or tomatol; 1/2 cup of marinara sauce; 3/4 cup of cooked vegetables; 1 cup of salad.'
        },
        {
          text: 'On average, how many portions of grains and baked products do you eat in a week?',
          input: {
            type: 'value',
            values: [{val: 0, coef: 0.1595}]
          },
          visible: true,
          trigger: {
            parentQuestion: null,
            triggerValue: null
          },
          metaData: 'A portion consists of: 2 slices of bread; 1 bagel, roll, or english muffin, 1/2 cup of rice, pasta, quinoa, or oatmeal; 1 cup of dry cereal; 1 slice of cake; 2 medium chocolate chip cookies.'
        },
        {
          text: 'On average, how many portions of poultry do you eat in a week?',
          input: {
            type: 'value',
            values: [{val: 0, coef: 0.515}]
          },
          visible: true,
          trigger: {
            parentQuestion: null,
            triggerValue: null
          },
          metaData: 'A portion consists of: 4-5 ounces of cooked chicken/turkey; 7 chicken nuggets; 4 chicken wings; 5 slices of deli turkey.'
        },
        {
          text: 'On average, how many portions of pork do you eat in a week?',
          input: {
            type: 'value',
            values: [{val: 0, coef: 0.73125}]
          },
          visible: true,
          trigger: {
            parentQuestion: null,
            triggerValue: null
          },
          metaData: 'A portion consists of: 4-5 ounces of cooked pork.'
        },
        {
          text: 'On average, how many portions of seafood do you eat in a week?',
          input: {
            type: 'value',
            values: [{val: 0, coef: 0.55125}]
          },
          visible: true,
          trigger: {
            parentQuestion: null,
            triggerValue: null
          },
          metaData: 'A portion consists of: 4-5 ounces of cooked fish; 8 pieces of sushi/sashimi; 10 pieces of shrimp; 4-5 large scallops or 6-8 clams.'
        },
        {
          text: 'On average, how many portions of nuts do you eat in a week?',
          input: {
            type: 'value',
            values: [{val: 0, coef: 0.0426}]
          },
          visible: true,
          trigger: {
            parentQuestion: null,
            triggerValue: null
          },
          metaData: 'A portion consists of: 24 almonds; 18 cashews; 35 peanuts; 12 macadamia nuts; 7 walnuts.'
        },
        {
          text: 'How often do you eat processed food?',
          input: {
            type: 'list',
            values: [
              {val: 'Below Average', coef: .015},
              {val: 'Average', coef: .05},
              {val: 'Above Average', coef: -0.05}
            ]
          },
          visible: true,
          trigger: {
            parentQuestion: null,
            triggerValue: null
          },
          metaData: 'This question is not factored into your final score, but will be once we find a source for CO2e conversions.'
        },
        {
          text: 'On average, how much do you spend while eating out each month?',
          input: {
            type: 'value',
            values: [{val: 0, coef: 2.8756}]
          },
          visible: true,
          trigger: {
            parentQuestion: null,
            triggerValue: null
          },
          metaData: 'Source: http://www.carbonfootprint.com/calculatorfaqs.html'
        },
        {
          text: 'If you drink coffee or tea, please select from the following options:',
          input: {
            type: 'list',
            values: [
              {val: 'Black Coffee', coef: 21},
              {val: 'Coffee with Cream or Sugar', coef: 71},
              {val: 'Lattes or Cappuccinos', coef: 340},
              {val: 'Tea', coef: 0}
            ]
          },
          visible: true,
          trigger: {
            parentQuestion: null,
            triggerValue: null
          },
          metaData: 'This question was added from the previous carbon calculator, but has no source attributed. Metadata will be updated when a source is found.'
        },
        {
          text: 'How often do you drink the beverage you selected?',
          input: {
            type: 'dependentValue',
            values: [{val: 0, coef: 0.052}]
          },
          visible: false,
          trigger: {
            parentQuestion: 9,
            triggerValue: null // Means this is triggered by any value
          },
          metaData: 'This question was added from the previous carbon calculator, but has no source attributed. Metadata will be updated when a source is found.'
        },
        {
          text: 'Do you purchase food from farmers markets?',
          input: {
            type: 'list',
            values: [
              {val: 'Yes', coef: 0.06826625},
              {val: 'No', coef: 0.06826625}
            ]
          },
          visible: true,
          trigger: {
            parentQuestion: null,
            triggerValue: null
          },
          metaData: 'This question is not factored into your final score, but will be once we find a source for CO2e conversions.'
        }
      ],
      color: '#003B5C'
    },
    {
      title: 'Water',
      questions: [
        {
          text: 'On average, how long are your showers?',
          input: {
            type: 'value',
            values: [{val: 0, coef: 2.17686}]
          },
          visible: true,
          trigger: {
            parentQuestion: null,
            triggerValue: null
          },
          metaData: 'This question is not factored into your final score, but will be once we find a source for CO2e conversions.'
        },
        {
          text: 'On average, how many loads of laundry do you wash each month?',
          input: {
            type: 'value',
            values: [{val: 0, coef: 1.0366}]
          },
          visible: true,
          trigger: {
            parentQuestion: null,
            triggerValue: null
          },
          metaData: 'This question is not factored into your final score, but will be once we find a source for CO2e conversions.'
        },
        {
          text: 'On average, how many times do you flush a toilet each day?',
          input: {
            type: 'value',
            values: [{val: 0, coef: 3.73176}]
          },
          visible: true,
          trigger: {
            parentQuestion: null,
            triggerValue: null
          },
          metaData: 'This question is not factored into your final score, but will be once we find a source for CO2e conversions.'
        },
        {
          text: 'On average, how many cups of water do you drink every day (from the tap or a water fountain)?',
          input: {
            type: 'value',
            values: [{val: 0, coef: 0.0647875}]
          },
          visible: true,
          trigger: {
            parentQuestion: null,
            triggerValue: null
          },
          metaData: 'This question is not factored into your final score, but will be once we find a source for CO2e conversions.'
        },
        {
          text: 'Do you use a refillable water bottle?',
          input: {
            type: 'value',
            values: [
              {val: 'Yes', coef: 0},
              {val: 'No', coef: 0}
            ]
          },
          visible: true,
          trigger: {
            parentQuestion: null,
            triggerValue: null
          },
          metaData: 'This question is not factored into your final score, but will be once we find a source for CO2e conversions.'
        }
      ],
      color: '#7A6855'
    },
    {
      title: 'Waste',
      questions: [
        {
          text: '<p>Why are there no solid waste questions? Direct disposal emissions from solid waste in Corvallis are negligible for a few reasons. About 10 miles North of Corvallis, the Coffin Butte landfill captures methane, which substantially reduces emissions associated with waste. Additionally, the OSU Corvallis campus composts and recycles enough tons of waste per year to counteract most of those emissions.</p> <p>But what’s more important? While it’s great we have minimal waste disposal-related emissions, what really matters is purchasing and consumption – they have a significantly larger impact on your carbon footprint. So focus on reducing how much you consume, which will in turn create less waste! Buy used clothes and furniture, purchase food in bulk, print less, etc! More tips on reducing your footprint can be found in the “Next Steps” tab.</p>',
          input: {
            type: 'text',
            values: [
              {val: 0, coef: 0}
            ]
          },
          visible: true,
          trigger: {
            parentQuestion: null,
            triggerValue: null
          },
          metaData: 'This question is not factored into your final score, but will be once we find a source for CO2e conversions.'
        }
      ],
      color: '#FFFFFF'
    }
  ]
}
