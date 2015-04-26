---
---
(function() {
  var runs = {{ site.data.run | jsonify }}, 
      rides = {{ site.data.ride | jsonify }};
  
  milesRan(runs);
  milesRidden(rides);
  updateProgress(runs);
})();

function milesRan(runs) {
  var totalMiles = 0,
      $milesRun = $('.miles-run');

  $.each(runs, function(i, run) {
    totalMiles = totalMiles + run.distance;
  });
  $milesRun.text("Miles Ran: " + (Math.round(totalMiles * 10) / 10));
  return totalMiles;
}

function milesRidden(rides) {
  var totalMiles = 0,
      $milesRidden = $('.miles-ridden');

  $.each(rides, function(i, ride) {
    totalMiles = totalMiles + ride.distance;
  });
  $milesRidden.text("Miles Ridden: " + (Math.round(totalMiles * 10) / 10));
  return totalMiles;
}

function updateProgress(runs) {
  var milesThisWeek = 0,
      $progress = $('progress'),
      sunday = moment().weekday(0);

  $.each(runs, function(index, item) {
    var date = moment(item.date);
    if (date.isAfter(sunday)) {
      milesThisWeek += item.distance;
    }
  });
  $progress.attr('value', milesThisWeek);
}