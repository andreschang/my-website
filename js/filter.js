
var stateModule = (function () {
    var state;
    var pub = {};

    pub.changeState = function (newstate) {
        state = newstate;
        console.log('state changed - '+state);
    };

    pub.getState = function() {
        console.log('current state - '+state);
        return state;
    }

    return pub; // expose externally
}());

stateModule.changeState("shown");

// Set video iFrame size
function getVidHeight() {
  if ($('.projVid')[0]) {
    var vidHeight = 0.5625*$('.projVid')[0].getBoundingClientRect().width;
    $(".projVid").height(vidHeight);
  }
}

getVidHeight()

// Draw sidebar icon
var iconY = $('#sidebar')[0].getBoundingClientRect().height/3+20,
  drawing = SVG("sidebarIconContainer").size(50,100).translate(0,iconY),
  sidebarIcon = drawing.polygon('10,25 30,50 10,75').fill('blue').addClass('sidebarIcon');
  // sidebarIcon = drawing.rect(100,100).fill('blue').addClass('sidebarIcon');


// Make filter SVGs
var filters = $("#filter").find("li"),
projects = $("#projectList").find("li"),
projIDs = ['businessAsUsual', 'arcticTimeline', 'eternalOcean', 'eternalOceanPortal', 'chaos1701', 'arcticSeaIce', 
'mythologies', 'hustle']
colors = ['', '#0000FF', '#780DFF', 'yellow', 'green']

for (i = 1; i < (filters.length); i++) {
  var elmnt = filters[i],
    height = elmnt.getBoundingClientRect().height,
    // dY = -.8*height,
    dY = -.5*height,
    fWidth = $("#filter")[0].getBoundingClientRect().width,
    width = fWidth > 100 ? 100 : fWidth;

  var draw = SVG(filters[i]).translate(-2,dY).size(300,50).opacity(0),
    rect = draw.rect(width, .4*height).fill(colors[1]).opacity('1');
};

for (i = 1; i < (projects.length); i++) {
  var elmnt = projects[i],
    height = elmnt.getBoundingClientRect().height,
    // dY = -.8*height,
    dY = -.83*height,
    fWidth = $("#projectList")[0].getBoundingClientRect().width,
    width = fWidth > 300 ? 300 : fWidth;

  var draw = SVG(projects[i]).translate(0,dY).size(300,50).opacity(0).addClass('hover'),
    rect = draw.rect(width, .65*height).fill(colors[1]).opacity('1');
};

for (i = 1; i < (projects.length); i++) {
  var elmnt = projects[i],
    height = elmnt.getBoundingClientRect().height,
    // dY = -.8*height,
    dY = -.83*height,
    fWidth = $("#projectList")[0].getBoundingClientRect().width,
    width = fWidth > 300 ? 300 : fWidth;

  var draw = SVG(projects[i]).translate(0,dY).size(300,50).opacity(0).addClass('click'),
    rect = draw.rect(width, .65*height).fill(colors[1]).opacity('1');
};


// Filter by combination of tags
// And other mouseover functionality
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

 $("#projectList").find("li").hover(function(){
    if ($(this).find("svg.click").hasClass("projSelect") == false) {
    $(this).find("svg.hover").toggleClass("fOver");
   }
  })

  $("#projectList").find("li").click(function(){
    $(this).find("svg.click").addClass("fSelect projSelect");
  })

});

// Animation functions
// function animationClick(trigger, element, animation){
//     element = $(element);
//   trigger = $(trigger);
//     trigger.click(
//         function() {
//             element.addClass('animated ' + animation);          
//             //wait for animation to finish before removing classes
//             window.setTimeout( function(){
//                 element.removeClass('animated ' + animation);
//             }, 2000);           
 
//         });
// }

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

// Show sidebar icon, hide sidebar
function sidebarSlideLeft() {
  stateModule.changeState("transition");
  $("#sidebarIconContainer").addClass('sidebarShow');
  $(".sidebarSlide").removeClass('slideBack'); 
  $(".mainSlide").removeClass('mainSlideBack');        
  $(".sidebarSlide").addClass('slideOver');
  $(".mainSlide").addClass('mainSlideOver');
  $("#main").width('74%');
  setTimeout( function() {
    $("#siteName").addClass('slideVertical');
  }, 200)
  setTimeout( function() {
      getVidHeight()
      stateModule.changeState("hidden");
    }, 300);
}

function sidebarSlideRight() {
  stateModule.changeState("transition");
  $("#siteName").removeClass('slideVertical');
  $("#sidebarIconContainer").removeClass('sidebarShow');
  $(".sidebarSlide").removeClass('slideOver');
  $(".mainSlide").removeClass('mainSlideBack');
  $(".sidebarSlide").addClass('slideBack');
  $(".mainSlide").addClass('mainSlideBack');
  $("#main").width('50%');
  setTimeout( function() {
      getVidHeight()
      stateModule.changeState("shown");
    }, 300);
}

function hoverIcon() {
  $('.sidebarIcon').mouseover( function(event) {
    var stateOn = stateModule.getState();
    if (stateOn == "hidden") {
      console.log('show menu');
      sidebarSlideRight();
      // stateModule.changeState("transition");
      // $(".sidebarSlide").addClass('slideBack');
      // $(".sidebarSlide").removeClass('slideOver');
      // $("#sidebarIconContainer").removeClass('sidebarShow');
      setTimeout( function() {
        stateModule.changeState("shown");
      }, 300);
    }
  });

  $('#main').mouseover( function(event) {
    var stateOff = stateModule.getState();
    if (stateOff == "shown") {
      // stateModule.changeState("transition");
      // $(".sidebarSlide").removeClass('slideBack');
      sidebarSlideLeft();
      setTimeout( function() {
        stateModule.changeState("hidden");
      }, 300)};
    }
  )}