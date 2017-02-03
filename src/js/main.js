require("./lib/social"); //Do not delete

var filter = document.getElementsByClassName('filter');

// clicking for mobile map interactive
var qsa = s => Array.prototype.slice.call(document.querySelectorAll(s));
qsa(".filter").forEach(function(f,index) {
  f.addEventListener("click", function(e) {

    // add active class to chosen filter
    var filter_list = document.getElementsByClassName("filter");
    for (var i=0; i<filter_list.length; i++) {
      filter_list[i].classList.remove("active");
    };
    f.classList.add("active");

    // show only events that match the chosen filter
    var event_list = document.getElementsByClassName("event-item");
    // no need to check for filter if the person wanted to show everything
    if (f.id == "showall") {
      for (var j=0; j<event_list.length; j++) {
        event_list[j].classList.add("active");
      }
    // checking each element for the filter
    } else {
      for (var j=0; j<event_list.length; j++) {
        if (event_list[j].classList.toString().indexOf(f.id) >= 0) {
          event_list[j].classList.add("active");
        } else {
          event_list[j].classList.remove("active");
        }
      }
    }

  });
});
