---
---
(function() {
  var runs = {{ site.data.run | jsonify }}, 
      rides = {{ site.data.ride | jsonify }};
  
  milesRan(runs);
  milesRidden(rides);
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