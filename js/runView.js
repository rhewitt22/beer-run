---
---
(function() {
  var runs = {{ site.data.run | jsonify }},
    longestRuns = runs.sort(sortDistance).slice(0, 3);
  updateDistance(longestRuns);
})();

function sortDistance(a,b) {
  if (a.distance > b.distance)
     return -1;
  if (a.distance < b.distance)
    return 1;
  return 0;
}

function updateDistance(runs) {
  $('#first-distance').text(runs[0].distance + ' miles');
  $('#second-distance').text(runs[1].distance + ' miles');
  $('#third-distance').text(runs[2].distance + ' miles');
}