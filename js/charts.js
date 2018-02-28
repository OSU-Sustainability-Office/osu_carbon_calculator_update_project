/*******************************************************************************
                                      Data
 ******************************************************************************/
var user_data = {
  series: data, // Data
  labels: ["Transportation: " + data[0] + " kgC02", "Consumption: " + data[1] + " kgC02", "Energy and Heat: " + data[2] + " kgC02", "Food: " + data[3] + " kgC02", "Water: " + data[4] + " kgC02"] // Labels
};

var user_previous_data = {
  series: [1, 1, 1, 1, 1], // Data is replaced by updateData
  labels: ["Transportation: " + data[0] + " kgC02", "Consumption: " + data[1] + " kgC02", "Energy and Heat: " + data[2] + " kgC02", "Food: " + data[3] + " kgC02", "Water: " + data[4] + " kgC02"] // Labels
};

var us_avg = {
  labels: ["Transportation: 4808.4 kgC02", "Consumption: 4979.9 kgC02", "Energy and Heat: 3692.1 kgC02", "Food: 2404.2 kgC02", "Water: 515.2 kgC02"], // Labels
  series: [4808.4, 4979.9, 3692.1, 2404.2, 515.2] // Data
};

// This gets updated in updateData.
var user_historical_data = {
  labels: ["Today"],
  series: [
    [1], [1], [1], [1], [1]
  ]
};

var user_us_comparison = {
  labels: ['Transportation', 'Consumption', 'Energy and Heat', 'Food', 'Water'],
  series: [data, [4808.4, 4979.9, 3692.1, 2404.2, 515.2]]
};

var country_avg_data = {
  labels: ['Brazil', 'Burkina Faso', 'China', 'France', 'Oregon', 'You'],
  series: [[2500], [200], [7600], [10640], [5100], [1000]]
};

function updateData() {
  var labelData = [];
  var seriesData = [
    [], [], [], [], [] // One column for each category.
  ];
  var d = new Date();

  // Push the totals from each dataObject to chartist.js-compatible lists.
  historicalData.forEach( function(dataObject, err){
    // Push the totals for each category to the array.
    for (var i = 0; i < seriesData.length; i++) seriesData[i].push(dataObject.totals[i]);


    // Corvert the date into a user friendly format. In the DB, it looks like
    // this: mmddyyy. Ex: 0220118 = Feb 20, 2018.
    var year = dataObject.date.substring(5);
    d.setYear(20 + year); // 20 + 18 = 2018.

    var month = dataObject.date.substring(0,2) - 1;
    d.setMonth(month);

    var day = dataObject.date.substring(2,4);
    d.setDate(day);

    labelData.push(d.toDateString());
  });
  user_historical_data = {
    series: seriesData,
    labels: labelData
  };

  var hd = historicalData[historicalData.length - 2].totals; // Length - 1 yields the current results.
  user_previous_data = { // For previous data pie chart.
    series: hd,
    labels: ["Transportation: " + data[0] + " kgC02", "Consumption: " + data[1] + " kgC02", "Energy and Heat: " + data[2] + " kgC02", "Food: " + data[3] + " kgC02", "Water: " + data[4] + " kgC02"] // Labels
  };

  country_avg_data = {
    labels: ['Brazil', 'Burkina Faso', 'China', 'France', 'Oregon', 'You'],
    series: [[2500], [200], [7600], [10640], [5100], [carbon_num_total.toFixed(1)]]
  };
}

/*******************************************************************************
                                   Pie Charts
 ******************************************************************************/
var options = {
  labelInterpolationFnc: function(value) {
    return value[0]
  },
  height: "25em",
  showLabel: false,
  plugins: [
    Chartist.plugins.tooltip({appendToBody: true})
  ]
};

var responsiveOptions = [
  ['screen and (min-width: 640px)', {
    chartPadding: 30,
    showLabel: false,
    labelInterpolationFnc: function(value) {
      return value;
    }
  }],
  ['screen and (min-width: 1024px)', {
    labelOffset: 80,
    chartPadding: 20,
    showLabel: false
  }]
];


/*******************************************************************************
                                   Bar Charts
 ******************************************************************************/
var bar_options = {
  axisX: {
    offset: 60
  },
  axisY: {
    offset: 80,
    scaleMinSpace: 15
 },
 seriesBarDistance: 30,
 height: "20em",
 plugins: [
   Chartist.plugins.tooltip({appendToBody: true})
 ]
};

var country_bar_options = {
 seriesBarDistance: 80,
 height: "20em",
 plugins: [
   Chartist.plugins.tooltip({appendToBody: true})
 ]
};

var trend_bar_options = {
  stackBars: true,
  seriesBarDistance: 10,
  axisX: {
    offset: 60
  },
  axisY: {
    offset: 80,
    scaleMinSpace: 15
 },
 seriesBarDistance: 10,
 height: "20em",
 plugins: [
   Chartist.plugins.tooltip({appendToBody: true})
 ]
};

var bar_responsiveOptions = [
  ['screen and (max-width: 640px)', {
    seriesBarDistance: 5,
    axisX: {
      labelInterpolationFnc: function (value) {
        return value[0];
      }
    }
  }]
];

/*******************************************************************************
                                 Create SVGs
 ******************************************************************************/
function updateGraphs() {
  var user_total_pie = new Chartist.Pie('.user-total-pie', user_data, options, responsiveOptions);
  var us_avg_pie = new Chartist.Pie('.us-avg-pie', us_avg, options, responsiveOptions);
  var user_previous_pie = new Chartist.Pie('.user-previous-pie', user_previous_data, options, responsiveOptions);

  var user_trend_bar = new Chartist.Bar('.user-trend-bar', user_historical_data, trend_bar_options);
  var user_us_bar = new Chartist.Bar('.user-us-bar', user_us_comparison, bar_options);
  var country_avg_bar = new Chartist.Bar('.country-avg-bar', country_avg_data, country_bar_options);
}
