require("./lib/social"); //Do not delete

var filter = document.getElementsByClassName('filter');

if (screen.width <= 480) {
  var screenPos = 200;
} else {
  var screenPos = 150;
}

// searchbar code
$("#searchbar").bind("input propertychange", function () {

  document.getElementById("allevents-wrapper").classList.add("active");
  document.getElementById("keyevents-wrapper").classList.remove("active");
  document.getElementById("keyevent").classList.remove("active");

  // remove active class from all other filters
  var filter_list = document.getElementsByClassName("filter");
  for (var i=0; i<filter_list.length; i++) {
    filter_list[i].classList.remove("active");
  };

  // hide all subfilter containers
  var subfilter_list = document.getElementsByClassName("sub-filter-container");
  for (var i=0; i<subfilter_list.length; i++) {
    subfilter_list[i].classList.remove("active");
  };

  var filter = $(this).val().toLowerCase().replace(/ /g,'');
  var class_match = 0;
  var event_count = 0;

  // reset all the days
  var day_list = document.getElementsByClassName("day-title");
  var days_vector = new Array(100+1).join('0').split('').map(parseFloat);

  $(".event-item").filter(function() {

    var classes = this.className.split(" ");
    for (var i=0; i< classes.length; i++) {

      var current_class = classes[i].toLowerCase();
      if ( current_class.match(filter)) {
        class_match = class_match + 1;
      }
    }
    if (class_match > 0) {
      $(this).addClass("active");
      days_vector[this.parentNode.classList[1]-1] = 1;
      event_count += 1;
    } else {
      $(this).removeClass("active");
    }
    class_match = 0;

  });

  // show days that have events
  for (var k=0; k<day_list.length; k++) {
    var kday = k+1;
    if (days_vector[k] == 1){
      document.getElementById("day"+kday).classList.add("active");
    } else {
      document.getElementById("day"+kday).classList.remove("active");
    }
  }

  if (event_count == 0) {
    document.getElementById("search-noresults").classList.remove("hide");
  } else {
    document.getElementById("search-noresults").classList.add("hide");
  }

});


// var days_vector = new Array(100+1).join('0').split('').map(parseFloat);
// console.log(days_vector);

// clicking for mobile map interactive
var qsa = s => Array.prototype.slice.call(document.querySelectorAll(s));
qsa(".filter").forEach(function(f,index) {
  f.addEventListener("click", function(e) {

    document.getElementById("search-noresults").classList.add("hide");

    document.getElementById('searchbar').value = "";

    document.getElementById("allevents-wrapper").classList.add("active");
    document.getElementById("keyevents-wrapper").classList.remove("active");
    document.getElementById("keyevent").classList.remove("active");

    var classes = f.getAttribute("class");
    var classes_ls = classes.split(" ");

    // clicked on a filter level filter
    if (classes.indexOf("subfilter") == -1) {

      // hide all subfilter containers to start
      var subfilter_list = document.getElementsByClassName("sub-filter-container");
      for (var i=0; i<subfilter_list.length; i++) {
        subfilter_list[i].classList.remove("active");
      };
      // check for subfilters that we should display
      var subfilter_container = document.getElementById("subfilter"+classes_ls[2]);
      if (subfilter_container) {
        subfilter_container.classList.add("active");
      }

      // add active class to chosen filter (if it is a subfilter, we don't need to hide stuff)
      var filter_list = document.getElementsByClassName("filter");
      for (var i=0; i<filter_list.length; i++) {
        filter_list[i].classList.remove("active");
      };
      f.classList.add("active");

    // clicked on a subfilter level filter
    } else {

      // we just need to add an active class to the subfilter
      var filter_list = document.getElementsByClassName("subfilter");
      for (var i=0; i<filter_list.length; i++) {
        filter_list[i].classList.remove("active");
      };
      f.classList.add("active");
    }

    $('body,html').animate({ scrollTop: $('#top-of-content').position().top-screenPos },200);

    // reset all the days
    var days_vector = new Array(100+1).join('0').split('').map(parseFloat);

    // show only events that match the chosen filter
    var event_list = document.getElementsByClassName("event-item");
    var day_list = document.getElementsByClassName("day-title");
    // no need to check for filter if the person wanted to show everything
    if (f.id == "showall") {
      // show all events
      for (var j=0; j<event_list.length; j++) {
        event_list[j].classList.add("active");
      }
      // show all days
      for (var k=0; k<day_list.length; k++) {
        day_list[k].classList.add("active");
      }
    // checking each element for the filter
    } else {
      // show matching events
      for (var j=0; j<event_list.length; j++) {
        if (event_list[j].classList.toString().indexOf(f.id) >= 0) {
          event_list[j].classList.add("active");
          days_vector[eventsData[j].Day-1] = 1;
        } else {
          event_list[j].classList.remove("active");
        }
      }

      // show days that have events
      for (var k=0; k<day_list.length; k++) {
        var kday = k+1;
        if (days_vector[k] == 1){
          document.getElementById("day"+kday).classList.add("active");
        } else {
          document.getElementById("day"+kday).classList.remove("active");
        }
      }

    }

  });
});

document.getElementById("keyevent").addEventListener("click",function() {
  document.getElementById("keyevents-wrapper").classList.add("active");
  document.getElementById("allevents-wrapper").classList.remove("active");

  document.getElementById('searchbar').value = "";
  document.getElementById("search-noresults").classList.add("hide");

  $('body,html').animate({ scrollTop: $('#top-of-content').position().top-10 },200);

  // remove active class from all other filters
  var filter_list = document.getElementsByClassName("filter");
  for (var i=0; i<filter_list.length; i++) {
    filter_list[i].classList.remove("active");
  };

  // hide all subfilter containers
  var subfilter_list = document.getElementsByClassName("sub-filter-container");
  for (var i=0; i<subfilter_list.length; i++) {
    subfilter_list[i].classList.remove("active");
  };

  this.classList.add("active");
});
