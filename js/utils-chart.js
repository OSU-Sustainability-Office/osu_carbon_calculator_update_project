window.chartColors = {
	red: 'rgb(170, 157, 46)',
	orange: 'rgb(13, 82, 87)',
	yellow: 'rgb(211, 131, 43)',
	green: 'rgb(0, 59, 92)',
	blue: 'rgb(122, 104, 85)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(231,233,237)'
};

window.randomScalingFactor = function() {
	return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
}
