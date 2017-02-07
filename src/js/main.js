require("./lib/social"); //Do not delete

var filter = document.getElementsByClassName('filter');

// var days_vector = new Array(100+1).join('0').split('').map(parseFloat);
// console.log(days_vector);

// clicking for mobile map interactive
var qsa = s => Array.prototype.slice.call(document.querySelectorAll(s));
qsa(".filter").forEach(function(f,index) {
  f.addEventListener("click", function(e) {

    // reset all the days
    var days_vector = new Array(100+1).join('0').split('').map(parseFloat);

    // add active class to chosen filter
    var filter_list = document.getElementsByClassName("filter");
    for (var i=0; i<filter_list.length; i++) {
      filter_list[i].classList.remove("active");
    };
    f.classList.add("active");

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
          document.getElementById("day"+kday).classList.remove("active");          // day_list[k].classList.remove("active");
        }
      }

    }

  });
});
