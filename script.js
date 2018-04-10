
    $(window).trigger('hashchange')

	
  var alarms = [];
  var added = "";

    function padfield(f){
    return (f<10)? "0"+f : f
  }
  
  function renderAlarmList(){
  if ( alarms.length == 0 ){
  
    $('#noAlarms').css("display", "block");
  }
  else{
		$('#noAlarms').css("display", "none");
		$.each(alarms, function(key,val) {
		if((key == added+1)|| added === "" ){
			$('#alist').append("<li class='item'><label href='#' data-template='about' data-context-name='about' class='item-link item-content'><strong>"+ alarms[key].time + "</strong><small>" + alarms[key].label + "</small></label></li>");
			added = key;  } 
	});
  }
  $('.alarmslist').css('display','block');
}
  var weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];


    setInterval(function(){ 
     var dateobj=new Date();
        var ct=this.padfield(dateobj.getHours())+":"+this.padfield(dateobj.getMinutes())+":"+this.padfield(dateobj.getSeconds());
        var cd = weekdays[dateobj.getDay()] + " " + this.padfield(dateobj.getDate()) + " " + month[dateobj.getMonth()] + "," + dateobj.getFullYear();
        document.getElementById("currentDate").innerHTML=cd;
        document.getElementById("currentTime").innerHTML=ct;
		$.each(alarms, function(key,val) {
			if(dateobj.getHours() == (alarms[key].time).split(':')[0] && dateobj.getMinutes() == (alarms[key].time).split(':')[1]){
				renderActiveAlarm();
			}
		});}, 1000);
		
	function renderActiveAlarm(){
		$('.main-content .page').addClass('alarm');
		$('#activeA').append('<div><p class="">Morning Walk</p></div><div class="action"><a href="#" data-panel="left" class="button open-panel">Snooze</a><a href="#" data-panel="left" class="button small">Stop</a></div>');
	}
		
	$('#saveAlarm').click(function(){
		var repId = [];
		$("input:checkbox[name=rep]:checked").each(function () {
            repId.push($(this).attr("id"));
        })
		var ala = {time: $('#time').val(),
					label: $('#label').val(), 
					repeat: repId,
					sound: $('input[type=radio][name=sound]:checked').attr('id')
				};
		alarms.push(ala);
		window.location.hash = '#listroute';
		    document.getElementById("setAlarm").reset();

	});
$(window).on('hashchange', function(){
		render(decodeURI(window.location.hash));
	}).trigger('hashchange');
	
function render(url) {

		// Get the keyword from the url.
		var temp = url.split('/')[0];

		// Hide whatever page is currently shown.
		$('.main-content .pg').css('display', 'none');


		var	map = {

			// The "Homepage".
			'': function() {
				$('.homeclock').css('display','block');
			},
			'#listroute': function(){
				renderAlarmList();
			},
			
			'#addroute': function(){
				$('.addalarm').css('display','block');
			},
			

		};

		// Execute the needed function depending on the url keyword (stored in temp).
		if(map[temp]){
			map[temp]();
		}
		// If the keyword isn't listed in the above - render the error page.
		else {
			renderErrorPage();
		}

	}


