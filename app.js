let casesList = [],
deathsList = [],
datesList = [],
formattedDateList = [],
arrdateCases = [],
arrdateDeaths = [];
const totalCasesElement = document.querySelector(".total-cases .value");
const newCasesElement = document.querySelector(".total-cases .new-value");
const totalDeathsElement = document.querySelector(".total-deaths .value");
const newDeathsElement = document.querySelector(".total-deaths .new-value");

fetchData();



function fetchData(){
	var requestOptions = {
	method:"GET",
	redirect: "follow",
	};
	const apiFetch = async () => {	
		await fetch("https://api.covid19api.com/total/country/united-states/status/confirmed", requestOptions)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
		data.forEach((entry) => {
				datesList.push(entry.Date);
				casesList.push(entry.Cases);
			});
			formatDate();
		});

		await fetch("https://api.covid19api.com/total/country/united-states/status/deaths", requestOptions)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			data.forEach((entry) => {
				deathsList.push(entry.Cases);
			})
		});
		const totalCases = casesList[casesList.length - 1];
		const newCases = totalCases - casesList[casesList.length - 2];
		const totalDeaths = deathsList[deathsList.length - 1];
		const newDeaths = totalDeaths - deathsList[deathsList.length - 2];
		
		totalCasesElement.innerHTML = totalCases;
		newCasesElement.innerHTML = `+${newCases}`;
		totalDeathsElement.innerHTML = totalDeaths;
		newDeathsElement.innerHTML = `+${newDeaths}`;
		let series = toSeries(); 
		createChart(series);
	};


	
	apiFetch();	
}



function formatDate(){
	var date, month, day, year;
	var dateFormatted;
	datesList.forEach((entry) => {
		date = new Date(entry);
		month = date.getMonth() + 1;
		day = date.getDate();
		year = date.getFullYear();
		dateFormatted = month + "/" + day + "/" + year;
		formattedDateList.push(dateFormatted);
	})
}
function toSeries() {
	for(i = 0; i < casesList.length; i++){
		arrdateCases.push({x: formattedDateList[i], y: casesList[i]});
		arrdateDeaths.push({x: formattedDateList[i], y: deathsList[i]});
	}
	return [
		{name: 'Cases', points: arrdateCases},
		{name: 'Deaths', points: arrdateDeaths}
	];
	
}
function createChart(series) {
	JSC.Chart('line-chart', {
		type: 'line',
		title_label_text: "Coronavirus Cases and Deaths in the United States",
		legend_template: "%icon,%name",
		series: series,
		xAxis: {
			defaultTick_enabled: false

		}	
	});
}










	

	



	