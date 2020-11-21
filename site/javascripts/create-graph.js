/*
 * Parse the data and create a graph with the data.
 */
Papa.parse("../data/tests.csv", {
	skipEmptyLines: true,
	header: true,
	download: true,
	complete: function(results) {
		console.log(results.data)
		createGraph(results.data);
	}
});


function createGraph(data) {
	var datetime = ["Datetime", ...data.map(row => row.DATETIME)];
	var download = ["Download", ...data.map(row => row.DOWNLOAD)];
	var upload = ["Upload", ...data.map(row => row.UPLOAD)];
	var latency = ["Latency", ...data.map(row => row.LATENCY)];
	var jitter = ["Jitter", ...data.map(row => row.JITTER)];

	var chart = c3.generate({
		data: {
			x: 'Datetime',
			xFormat: '%Y%m%d%H%M%S',
			columns: [datetime, download, upload, latency, jitter]
		},
		axis: { 
			x: {
				type: 'timeseries',
				tick: {
					format: '%d-%m-%Y %H:%M'
				},
				label: {
					text: 'Time Stamp',
					position: 'outer-top'
				}
			},
			y: {
				label: {
					text: 'Throughput (Mbps)',
					position: 'outer-top'
				}
			}
		}, 
		zoom: {
			enabled: true
		},
	});
}
