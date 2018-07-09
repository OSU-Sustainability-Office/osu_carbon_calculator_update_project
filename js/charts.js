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

    labelData.push(d.getMonth() + "/"+ d.getDate());
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
    labels: ['', '', '', '', '', ''], // Labels are coded in HTML
    series: [[2500], [200], [7600], [10640], [5100], [carbon_num_total.toFixed(1)]]
  };
}

/*******************************************************************************
                                   Pie Charts
 ******************************************************************************/
var options = {
  height: "25em",
  showLabel: false,
  plugins: [
    Chartist.plugins.tooltip({appendToBody: true})
  ]
};

var responsiveOptions = [
  ['screen and (max-width: 640px)', {
    //seriesBarDistance: 15,
    axisX: {
      labelInterpolationFnc: function(value) {
        // Will return Mon, Tue, Wed etc. on medium screens
        return value[0];
      }
    }
  }],
  ['screen and (max-width: 1024px)', {
    //seriesBarDistance: 20
  }]
];

var responsiveOptions2 = [
  ['screen and (max-width: 640px)', {
    //seriesBarDistance: 15,
    axisX: {
      offset: -10
      // labelInterpolationFnc: function(value) {
      //   // Will return Mon, Tue, Wed etc. on medium screens
      //   return value[0];
      // }
    }
  }],
  ['screen and (max-width: 1024px)', {
    //seriesBarDistance: 20
  }]
];

/*******************************************************************************
                                   Bar Charts
 ******************************************************************************/


const ctEqualBarWidth = function(options) {
  return function(chart) {
    chart.on('created', function(ctx) {
      const bars = ctx.svg.querySelectorAll('.ct-bar');
      // !important is needed because CSS will override attributes
      bars.attr({
        style: `stroke-width: ${ctx.axisX.stepLength-2}px !important;`
      });
    });
  }
}

const ctEqualHalfBarWidth = function(options) {
  return function(chart) {
    chart.on('created', function(ctx) {
      const bars = ctx.svg.querySelectorAll('.ct-bar');

      // !important is needed because CSS will override attributes
      bars.attr({
        style: `stroke-width: 29px !important;`
      });
    });
  }
}

const ctXLabelRotate = function(options) {
  return function(chart) {
    chart.on('created',function(ctx) {
      const xLabels = ctx.svg.querySelectorAll('.ct-label.ct-horizontal');
      var fontSize = ctx.axisX.stepLength/2;
      if (fontSize < 10)
        fontSize = 10;
      else if (fontSize > 16)
        fontSize = 16;
      xLabels.attr({
        style: `-ms-transform: rotate(-45deg) !important;
                -webkit-transform: rotate(-45deg) !important;
                transform: rotate(-45deg) !important;
                display: block !important;
                font-size: ${fontSize}px !important;`
      });
    });
  }
}


var bar_options = { //you vs us graph
 seriesBarDistance: 30,
 fullWidth: true,
 height: "20em",
 axisX: {
    offset: 60,
    scaleMinSpace: 30
  },
  low: 0,
 chartPadding: {
  top: 50
 },
 axisY: {
    onlyInteger: true,
    scaleMinSpace: 20,
 },
 plugins: [
   Chartist.plugins.tooltip({appendToBody: true}),
   ctEqualHalfBarWidth() ]
};

var country_bar_options = { //country avg
 height: "20em",
 fullWidth: true,
 seriesBarDistance: 30,
 axisX: {
  scaleMinSpace: 30
 },
 low: 0,
 chartPadding: {
  top: 50
 },
 axisY: {
    onlyInteger: true,
    scaleMinSpace: 20,
 },
 plugins: [
   Chartist.plugins.tooltip({appendToBody: true}),
   ctEqualHalfBarWidth()
 ]
};

var trend_bar_options = { //user trend
  stackBars: true,
  seriesBarDistance: 35,
  axisX: {
    scaleMinSpace: 35,
  },
    axisY: {
    onlyInteger: true,
    scaleMinSpace: 30,
 },
 height: "20em",
 low: 0,
 chartPadding: {
  top: 50
 },
 plugins: [
   Chartist.plugins.tooltip({appendToBody: true}),
   ctEqualBarWidth(),
   ctXLabelRotate()
  ]
};

/*******************************************************************************
                                 Create SVGs
 ******************************************************************************/
function updateGraphs() {
  var user_total_pie = new Chartist.Pie('.user-total-pie', user_data, options);
  var us_avg_pie = new Chartist.Pie('.us-avg-pie', us_avg, options);
  var user_previous_pie = new Chartist.Pie('.user-previous-pie', user_previous_data, options);

  var user_trend_bar = new Chartist.Bar('.user-trend-bar', user_historical_data, trend_bar_options);
  var user_us_bar = new Chartist.Bar('.user-us-bar', user_us_comparison, bar_options, responsiveOptions);
  var country_avg_bar = new Chartist.Bar('.country-avg-bar', country_avg_data, country_bar_options, responsiveOptions);
}
