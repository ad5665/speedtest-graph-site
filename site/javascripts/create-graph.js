/*
 * Parse the data and create a graph with the data.
 */
function parseData(createGraph) {
	Papa.parse("../data/tests.csv", {
		download: true,
		complete: function(results) {
			createGraph(results.data);
			console.log(results.data);
		}
	});
}

function createGraph(data) {
	var datetime = [];
	var download = ["Download"];
	var upload = ["Upload"];

	for (var i = 1; i < data.length; i++) {
		if (data[i][5] != undefined && data[i][5] !== null) {
			datetime.push(data[i][5]);
		} else {
			 //datetime.push(0);
		}
		if (data[i][3] != undefined && data[i][3] !== null) {
			download.push(data[i][3]);
		} else {
			//download.push(0);
		}
		if (data[i][4] != undefined && data[i][4] !== null) {
		        upload.push(data[i][4]);
		} else {
		        //download.push(0);
		}
	}

	console.log(datetime);
	console.log(download);
	console.log(upload)
	datetime.unshift('datetime');

	var chart = c3.generate({
		data: {
			x: 'datetime',
			xFormat: '%Y%m%d%H%M%S',
			columns: [datetime, download, upload]
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

parseData(createGraph);
