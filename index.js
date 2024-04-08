const apiKey = '3fc4605bd8mshd425fc3443144c3p16a1a1jsn95dd632fd3da';
//const apiKey = '6026878845msh33d766234823759p1b10b7jsna380009f7b85'; //alternate APIkey
let matchId = '89770'; //update matchID here from url of crickbuzz website
let url = `https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${matchId}/hscard`;


const matchIdInput = document.getElementById('matchIdInput');
const updateMatchIdButton = document.getElementById('updateMatchIdButton');

updateMatchIdButton.addEventListener('click', function(){
const newMatchId = matchIdInput.value;
matchId = newMatchId;
url = `https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${matchId}/hscard`;

getScore();
})

async function getScore() {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data);

if (data.scoreCard.length == 1) {
  document.querySelector('.name').innerHTML = data.scoreCard[0].batTeamDetails.batTeamName + ' v/s ' + data.scoreCard[0].bowlTeamDetails.bowlTeamShortName;
  document.querySelector('.runs').innerHTML = 'Runs - ' + data.scoreCard[0].scoreDetails.runs;
  document.querySelector('.wickets').innerHTML = 'Wickets - ' + data.scoreCard[0].scoreDetails.wickets;
  document.querySelector('.overs').innerHTML = 'Overs - ' + data.scoreCard[0].scoreDetails.overs;
  document.querySelector('.rate').innerHTML = 'Runrate - ' + data.scoreCard[0].scoreDetails.runRate;
  document.querySelector('.extras').innerHTML = 'Extras - ' + data.scoreCard[0].extrasData.total;

} else {
  
  document.querySelector('.name').innerHTML = data.scoreCard[1].batTeamDetails.batTeamName + ' v/s ' + data.scoreCard[1].bowlTeamDetails.bowlTeamShortName;
  document.querySelector('.runs').innerHTML = 'Runs - ' + data.scoreCard[1].scoreDetails.runs;
  document.querySelector('.wickets').innerHTML = 'Wickets - ' + data.scoreCard[1].scoreDetails.wickets;
  document.querySelector('.overs').innerHTML = 'Overs - ' + data.scoreCard[1].scoreDetails.overs;
  document.querySelector('.rate').innerHTML = 'Runrate - ' + data.scoreCard[1].scoreDetails.runRate;
  document.querySelector('.extras').innerHTML = 'Extras - ' + data.scoreCard[1].extrasData.total;
}

document.querySelector('.status').innerHTML = 'Status - ' + data.status;
const battingBatsmen = data.scoreCard[0].batTeamDetails.batsmenData;

    let foundFirstBatsman = false;
    for (const key in battingBatsmen) {
      if (!foundFirstBatsman && battingBatsmen[key].outDesc === 'batting') {
        document.querySelector('.batm1').innerHTML = `${battingBatsmen[key].batShortName} - ${battingBatsmen[key].runs} Runs`;
        foundFirstBatsman = true;
      } else if (foundFirstBatsman && battingBatsmen[key].outDesc === 'batting') {
        document.querySelector('.batm2').innerHTML = `${battingBatsmen[key].batShortName} - ${battingBatsmen[key].runs} Runs`;
        break;
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}


