document.addEventListener('DOMContentLoaded', function () {
  function parseCSV(data) {
    var rows = data.trim().split('\n');
    var header = rows[0].split(',');

    var result = [];

    for (var i = 1; i < rows.length; i++) {
      var values = rows[i].split(',');
      var entry = {};

      for (var j = 0; j < header.length; j++) {
        entry[header[j]] = values[j];
      }

      result.push(entry);
    }

    return result;
  }

  function getRandomGame(data) {
    var randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex];
  }

  function createChart(gameData) {
    var ctx = document.getElementById('myChart').getContext('2d');

    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var avgPlayers = months.map(function (month) {
      var entry = gameData.find(function (data) {
        return data.Month.includes(month);
      });
      return entry ? parseFloat(entry["Avg. Players"]) : 0;
    });

    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: months,
        datasets: [{
          label: 'Average Players',
          data: avgPlayers,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      }
    });
  }

  document.getElementById('loadDataButton').addEventListener('click', function () {
    var csvFilePath = "https://github.com/chunguyentest01/test/blob/main/test_data.csv";
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          var csvData = xhr.responseText;
          var parsedData = parseCSV(csvData);
          var randomGame = getRandomGame(parsedData);
          createChart([randomGame]);
        } else {
          alert('Failed to load CSV file.');
        }
      }
    };

    xhr.open('GET', csvFilePath, true);
    xhr.send();
  });
});
