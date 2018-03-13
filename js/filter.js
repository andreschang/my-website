
// Run page functions

buildPage()
setupInteraction()

// Functions
// Set video iFrame size

function setProjectPage(pName, pFilters) {
    window.onload = function(){
      $(pName).find('a').click();
      $( "#main").find(".proj").removeClass('fSlideLeft')
      $( "#main").find(".proj").addClass('fSlideRight')
      hoverIcon()
      filterSlideRight()
      for (i=0; i < (pFilters.length); i++) {
        $(pFilters[i]).find("div").addClass('fOver');
        $(pFilters[i]).find("div").click();
      }
  }
}

function getVidHeight() {
  if ($('.projVid')[0]) {
    var vidHeight = 0.5625*$('.projVid')[0].getBoundingClientRect().width;
    $(".projVid").height(vidHeight);
  }
}

function buildPage() {

    // Draw sidebar icon
  var iconY = $('#sidebar')[0].getBoundingClientRect().height/2.5+20,
    drawing = SVG("sidebarIconContainer").size(50,100),
    sidebarIcon = drawing.polygon('10,25 30,50 10,75').fill('blue').addClass('sidebarIcon');
  $('#sidebarIconContainer').css({'transform':'translate(0,'+iconY+'px)'});
  console.log(iconY);
    // sidebarIcon = drawing.rect(100,100).fill('blue').addClass('sidebarIcon');
}

function setupInteraction() {

  // Show and hide filter menu
    $('#plusFilter').click( function() {
      if ($('#plusFilter').text() == '+ Filter') {
        filterSlideRight()
      } else {
        filterSlideLeft()
      }
    })

  // Filter by combination of tags
  // And other mouseover functionality
  
  var selectedFilters = []
  $(document).ready(function(){
    $("#filter").find("li").click(function(){
      $(this).find("div").toggleClass("fSelect");
      $(this).toggleClass("fSelect");

      var prjId = '.'+$(this).attr("id");
      if (selectedFilters.includes(prjId)) {
        var index = selectedFilters.indexOf(prjId);
        if (index > -1) {
          selectedFilters.splice(index, 1);
          console.log('restore '+selectedFilters.join(''))
          $(".pTitle"+selectedFilters.join('')).removeClass("fSelect", 200);
          $(this).find("div").toggleClass("fOver");
            }
      } else {
        selectedFilters.push(prjId)
        console.log('keep '+(selectedFilters.join('')))
        $(".pTitle").not(selectedFilters.join('')).addClass("fSelect", 200);
        $(this).find("div").toggleClass("fOver");
      }
    });

     $("#filter").find("li").hover(function() {
      if ($(this).find("div").hasClass("fSelect") == false) {
          $(this).find("div").toggleClass("fOver");
        }
       }
       )

    $("#projectList").find("li").find(".pTitle").hover(function(){
      if ($(this).parent().find("div.click").hasClass("projSelect") == false) {
      $(this).parent().find("a.hover").toggleClass("fOver");
     }
    })

    $("#projectList").find("li").find(".pTitle").click(function(){
      console.log('select')
      $(this).parent().find("a.click").addClass("projHighlight projSelect");
    })

  });
}

  // Show sidebar icon, hide sidebar
function sidebarSlideLeft() {
  stateModule.changeState("transition");
  $(".sidebarSlide").removeClass('slideBack'); 
  $(".mainSlide").removeClass('mainSlideBack');        
  $(".sidebarSlide").addClass('slideOver');
  $(".mainSlide").removeClass('fmSlideRight');
  $(".mainSlide").removeClass('fmSlideLeft');
  $(".mainSlide").addClass('mainSlideOver');
  $("#main").width('74%');
  $("#siteName").addClass('slideVertical');
  setTimeout( function() {
      getVidHeight()
      $("#sidebarIconContainer").addClass('sidebarShow');
      stateModule.changeState("hidden");
    }, 300);
}

function sidebarSlideRight() {
  stateModule.changeState("transition");
  if ($('#plusFilter').text() == '+ Filter') {
    $('#filter').removeClass('fSlideLeft')
    $('#filter').addClass('fSlideRight')
    $('#plusFilter').text('- Filter')
  }
  $("#siteName").removeClass('slideVertical');
  $("#sidebarIconContainer").removeClass('sidebarShow');
  $(".sidebarSlide").removeClass('slideOver');
  $(".mainSlide").removeClass('mainSlideBack');
  $(".mainSlide").removeClass('mainHybridSlideOver');
  $(".sidebarSlide").addClass('slideBack');
  $(".mainSlide").addClass('mainSlideBack');

  $("#main").width('50%');
  setTimeout( function() {
      getVidHeight()
      stateModule.changeState("shown");
    }, 300);
}

function filterSlideLeft() {
  $('#filter').removeClass('fSlideRight')
  $('#filter').addClass('fSlideLeft')
  $('#plusFilter').text('+ Filter')
  $(".mainSlide").removeClass('fmSlideRight');
  $(".mainSlide").addClass('fmSlideLeft');
  $(".fixedWidth").removeClass('ffwSlideRight');
  $(".fixedWidth").addClass('ffwSlideLeft');
  $("#main").not($(".mainVid")).width('58%');
}

function filterSlideRight() {
  $('#filter').removeClass('fSlideLeft')
  $('#filter').addClass('fSlideRight')
  $('#plusFilter').text('- Filter')
  $(".mainSlide").removeClass('fmSlideLeft');
  $(".mainSlide").addClass('fmSlideRight');
  $(".fixedWidth").removeClass('ffwSlideLeft');
  $(".fixedWidth").addClass('ffwSlideRight');
  $("#main").not($(".mainVid")).width('50%');
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
    });
}

// function arrowKeys() {

//   var arrowY = 50+($("#main")[0].getBoundingClientRect().height)*.95;
//   $("#container").append("<div id = 'lArrow'>Last project</div>")
//   $("#lArrow").css({
//     "position":"absolute", 
//     "left": "5%", 
//     "top": arrowY,
//   })

// }

// State module

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
