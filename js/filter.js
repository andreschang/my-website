
var iconBox = SVG("menuIcon").size(100,100),
icon = iconBox.rect(30,30).fill('yellow')

// Show/hide menu

$(document).ready(function(){

  function animationClick(trigger, element, animation){
    element = $(element);
  trigger = $(trigger);
    trigger.click(
        function() {
            element.addClass('animated ' + animation);          
            //wait for animation to finish before removing classes
            window.setTimeout( function(){
                element.removeClass('animated ' + animation);
            }, 2000);           
 
        });
}

  function animationHover(trigger, element, animation){
    element = $(element);
    trigger = $(trigger);
    trigger.hover(
        function() {
            element.addClass('animated ' + animation);          
        },
        function(){
            //wait for animation to finish before removing classes
            window.setTimeout( function(){
                element.removeClass('animated ' + animation);
            }, 2000);           
        });
}

});

// Make filter SVGs

var filters = document.getElementById('filter').querySelectorAll('li'),
colors = ['', 'blue', 'red', 'yellow', 'green']

for (i = 1; i < (filters.length); i++) {
  var elmnt = filters[i],
    height = elmnt.getBoundingClientRect().height,
    // dY = -.8*height,
    dY = -.5*height,
    // width = .8*elmnt.querySelector('div').getBoundingClientRect().width;
    width = 100;
    console.log(filters[i])
    console.log(height)

  var draw = SVG(filters[i]).translate(-2,dY).size(300,50).opacity(0),
    rect = draw.rect(width, .4*height).fill(colors[1]).opacity('1');
    // rect = draw.rect(width, .height).fill(colors[1]).opacity('1');
};


// Filter by combination of tags

var selectedFilters = []

$(document).ready(function(){
  $("#filter").find("li").click(function(){
    $(this).find("svg").toggleClass("fSelect");
    $(this).toggleClass("fSelect");

    var prjId = '.'+$(this).attr("id");
    if (selectedFilters.includes(prjId)) {
      var index = selectedFilters.indexOf(prjId);
      if (index > -1) {
        selectedFilters.splice(index, 1);
        console.log('restore '+selectedFilters.join(''))
        $(".pTitle"+selectedFilters.join('')).removeClass("fSelect", 200);
          }
    } else {
      selectedFilters.push(prjId)
      console.log('keep '+(selectedFilters.join('')))
      $(".pTitle").not(selectedFilters.join('')).addClass("fSelect", 200);
    }
  });
});