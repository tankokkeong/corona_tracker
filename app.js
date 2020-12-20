window.onload = function()
{
    getCovidStats();
    startTime();
}

function getCovidStats()
{
    fetch('https://coronavirus-tracker-api.herokuapp.com/v2/locations/171')
    .then(function(resp) { return resp.json() })
    .then(function(data) {
        let population = data.location.country_population;
        let update = data.location.last_updated;
        let confirmedCases = data.location.latest.confirmed;
        let deaths = data.location.latest.deaths;
        
        
        document.getElementById('population').innerHTML = population.toLocaleString('en');
		document.getElementById('update').innerHTML = update.substr(0, 10);
		document.getElementById('cases').innerHTML = confirmedCases.toLocaleString('en');
		document.getElementById('deaths').innerHTML = deaths.toLocaleString('en');
		document.getElementById('percent').innerHTML = ((Number(deaths)/Number(confirmedCases))*100).toLocaleString("en", {minimumFractionDigits: 2, maximumFractionDigits: 2}) + "%";
    
    })
    .catch(function(){
        console.log("error");
    })
    setTimeout(getCovidStats, 3600000)
}

function startTime()
{
	var Today = new Date();
	
	//date
	var dt = Today.getDate();
	var month = Today.getMonth()+1 ;
	var year = Today.getFullYear();
	
	//time
	var hour = Today.getHours();
	var minutes = Today.getMinutes();
	var seconds = Today.getSeconds();
    
    minutes = checkTime(minutes);
	seconds = checkTime(seconds);

	document.getElementById('display-time').innerHTML = dt + "/" + month + "/" + year + "<br>" + hour + ":" + minutes + ":" + seconds;
	
	setTimeout(function(){ startTime(); }, 500);
}

function checkTime(i)
{
	if(i<10)
	{
		i = "0" + i;
	}
	
	return i;
}