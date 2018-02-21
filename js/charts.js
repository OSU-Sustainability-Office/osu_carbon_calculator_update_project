/*******************************************************************************
                                      Data
 ******************************************************************************/
var user_data = {
  series: data, // Data
  labels: ["Transportation: " + data[0] + " kgC02", "Consumption: " + data[1] + " kgC02", "Energy and Heat: " + data[2] + " kgC02", "Food: " + data[3] + " kgC02", "Water: " + data[4] + " kgC02"] // Labels
};

var us_avg = {
  labels: ["Transportation: 4808.4 kgC02", "Consumption: 4979.9 kgC02", "Energy and Heat: 3692.1 kgC02", "Food: 2404.2 kgC02", "Water: 515.2 kgC02"], // Labels
  series: [4808.4, 4979.9, 3692.1, 2404.2, 515.2] // Data
};

var user_us_comparison = {
  labels: ['Transportation', 'Consumption', 'Energy and Heat', 'Food', 'Water'],
  series: [data, [4808.4, 4979.9, 3692.1, 2404.2, 515.2]]
};

var country_avg_data = {
  labels: ['Brazil', 'Burkina Faso', 'China', 'France', 'Oregon', 'You'],
  series: [2500, 200, 7600, 16400, 5100, 10000]
};

/*******************************************************************************
                                   Pie Charts
 ******************************************************************************/
var options = {
  labelInterpolationFnc: function(value) {
    return value[0]
  },
  height: "35em"
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
  seriesBarDistance: 10,
  axisX: {
    offset: 60
  },
  axisY: {
    offset: 80,
    scaleMinSpace: 15
 },
 seriesBarDistance: 10,
 height: "35em"
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
  var user_us_bar = new Chartist.Bar('.user-us-bar', user_us_comparison, bar_options);
  var country_avg_bar = new Chartist.Bar('.country-avg-bar', data, options, responsiveOptions);
}
