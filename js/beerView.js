---
---
(function() {
  var beers = {{ site.data.beer | jsonify }},
      beerList = {{ site.data.beer-glossary | jsonify }},
      $beers = $('.beers'),
      beerSource = $('#beer-template').html(),
      beerTemplate = Handlebars.compile(beerSource),
      $select = $('select');

  $select.change(function() {
    compileTemplate(beers);
  });
  
  function compileTemplate() {
    var sort = $select.val();

    function sortField(field, reverse) {
      beers.sort(function(a, b){
        if (field == 'name') {
          var a=a.name.toLowerCase(), b=b.name.toLowerCase();
        } else if (field == 'style') {
          var a=a.style.toLowerCase(), b=b.style.toLowerCase();
        } else if (field == 'abv') {
          var a=a.abv, b=b.abv;
        } else if (field == 'recent') {
          var a=new Date(a.date), b=new Date(b.date);
        }
       if (a < b)
        return -1;
       if (a > b)
        return 1;
       return 0;
      });
      if(reverse)
        beers.reverse();
    }

    switch(sort) {
      case "a-to-z":
        sortField('name');
        break;
      case "z-to-a":
        sortField('name', true);
        break;
      case "abv-low":
        sortField('abv');
        break;
      case "abv-high":
        sortField('abv', true);
        break;
      case "style":
        sortField('style');
        break;
      case "recent":
        sortField('recent', true);
        break;
    }
    $beers.html(beerTemplate(beers));
  }

  function init() {
    var beerInfo;

    // Grab the abv & style information from the glossary
    $.each(beers, function(i, beer){
      beerInfo = $.grep(beerList, function(el, i) {
        return beer.name == el.name;
      });
      beer.style = beerInfo[0].style;
      beer.abv = beerInfo[0].abv
      beer.location = beerInfo[0].location;
      beer.brewery = beerInfo[0].brewery;
      beer.styleClass = beerInfo[0].style.replace(/\s+/g, '-').toLowerCase();
    });
    // Show in reverse chronological order
    $beers.append(beerTemplate(beers));
    return beers;
  }

  beers = init();
})();



