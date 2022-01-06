// Settings are here
//console.log(min_of_remaining_items);
var total_items = 50;
var min_items_left = 12;
var max_items_left = 20;
var min_of_remaining_items = 1;
var d = new Date();
var remaining_items = randomIntFromInterval(min_items_left, max_items_left);
var decrease_after = 1.7; 
var decrease_after_first_item = 1.17; 

function randomIntFromInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

// Davy Jones' Locker

(function($){
	$.fn.progressbar=function(){
		var a="<p>BURUAN! HANYA SISA <span class='count'>"+remaining_items+"</span> STOK TERSEDIA</p>"+"<div class='progressbar'><div style='width:100%'></div></div>";
		this.addClass('items-count');
		this.html(a+this.html());
		updateMeter(this);
		var b=this;

		setTimeout(function(){
			remaining_items--;
			if(remaining_items<min_of_remaining_items){
				remaining_items=randomIntFromInterval(min_items_left,max_items_left)
			}
			$('.count').css('background-color','#CE0201');
			$('.count').css('color','#fff');
			setTimeout(function(){
				$('.count').css('background-color','#fff');
				$('.count').css('color','#CE0201')
			},1000*60*0.03);
			b.find(".count").text(remaining_items);
			updateMeter(b)
		},1000*60*decrease_after_first_item);

		setInterval(function(){
			remaining_items--;
			if(remaining_items<min_of_remaining_items){
				remaining_items=randomIntFromInterval(min_items_left,max_items_left)
			}
			$('.count').css('background-color','#CE0201');
			$('.count').css('color','#fff');
			setTimeout(function(){
				$('.count').css('background-color','#fff');
				$('.count').css('color','#CE0201')
			},1000*60*0.03);
			b.find(".count").text(remaining_items);
			updateMeter(b)
		},1000*60*decrease_after)
	};
	function updateMeter(a){
		var b=100*remaining_items/total_items;
		if(remaining_items<10){
			a.find('.progressbar div:first').addClass('less-than-ten')
		}
		a.find('.progressbar').addClass('active progress-striped');
		setTimeout(function(){
			myanimate(a.find('.progressbar div:first'),b);
			a.find('.progressbar').removeClass('active progress-striped')
		},1000)
	}
}(jQuery));

function myanimate(a,b){
	var c=0;
	var d=parseInt(a.closest('.progressbar').css('width'));
	var e=Math.floor(100*parseInt(a.css('width'))/d);
	if(e>b){c=e}function frame(){
		if(e>b){c--}
			else{c++}
				a.css('width',c+'%');
			if(c==b||c<=0||c>=100)clearInterval(f)
		}
	var f=setInterval(frame,40);
}

var getDaysInMonth = function(month,year) {
	// Here January is 1 based
	//Day 0 is the last day in the previous month
	return new Date(year, month, 0).getDate();
	// Here January is 0 based
	// return new Date(year, month+1, 0).getDate();
};

jQuery.noConflict()(function($){
	$(document).ready(function(){
		$(".progress_bar").progressbar();
		var item = $('.clock');
		item.each(function(){
			var tag="ctdn-12-12".match(/\d+/g);
			var hour=$(this).data('hour');
			var date=$(this).data('date');
			if(!date){date = 0};
			if(!hour){hour = 9};
			var d=new Date();
			var n=d.getDay();
			var gg=0;
			var hh=0;
			var ii=0;
			var days_of_month = getDaysInMonth(d.getMonth(), d.getYear());
			var nsec=0-d.getSeconds();
			if(nsec<0){
				nsec=60-d.getSeconds();gg=1
			}
			var nmin=60-d.getMinutes()-gg;
			if(nmin<0){
				nmin=60-d.getMinutes()-gg;hh=1
			}
			var nhrs=hour-d.getHours()-1;
			if(nhrs<0){
				nhrs=24+hour-d.getHours()-1-hh;ii=1
			}
			if(date != 0){
				var ndat=date-d.getDate()-1;
				if(ndat<0){
					var mmon=d.getMonth();
					ndat=days_of_month+date-d.getDate()-ii
				}
			}else{
				ndat = date;
			}
			
			var theSecsBox = $(this).find('.numsecs');
			var theMinsBox = $(this).find('.nummins');
			var theHoursBox = $(this).find('.numhours');
			var theDaysBox = $(this).find('.numdays');

			theSecsBox.html(nsec);
			theMinsBox.html(nmin);
			theHoursBox.html(nhrs);
			theDaysBox.html(ndat);
			var refreshId = setInterval(function(){
				
				var e=theSecsBox.text();
				var a=theMinsBox.text();
				var c=theHoursBox.text();
				var b=theDaysBox.text();

				if(e==0&&a==0&&c==0&&b==0){}else{
					if(e==0&&a==0&&c==0){
						theDaysBox.html(b-1);
						theHoursBox.html("23");
						theMinsBox.html("59");
						theSecsBox.html("59")}else{
						if(e==0&&a==0){
							theHoursBox.html(c-1);
							theMinsBox.html("59");
							theSecsBox.html("59")
						}else{
							if(e==0){
								theMinsBox.html(a-1);
								theSecsBox.html("59")
							}else{
								theSecsBox.html(e-1)
							}
						}
					}
				}

			},1000);
		});
	});
});
