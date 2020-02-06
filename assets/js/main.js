$(document).ready(function () {
	$(window).on("scroll", function () {
		if ($(window).scrollTop() >= 20) {
			$(".navbar").addClass("compressed");
			$("#scrollup").fadeIn();
		} else {
			$(".navbar").removeClass("compressed");
			$("#scrollup").fadeOut();
		}
	});
});

function lazyLoad() {
	$('iframe').each(function () {
		var frame = $(this),
			vidSource = $(frame).attr('data-src'),
			distance = $(frame).offset().top - $(window).scrollTop(),
			distTopBot = window.innerHeight - distance,
			distBotTop = distance + $(frame).height();

		if (distTopBot >= 0 && distBotTop >= 0) {
			$(frame).attr('src', vidSource);
			$(frame).removeAttr('data-src');
		}
	});
}
var throttled = _.throttle(lazyLoad, 50);
$(window).scroll(throttled);

var allowedKeys = {
	37: 'left',
	38: 'up',
	39: 'right',
	40: 'down',
	65: 'a',
	66: 'b'
};

var konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];
var konamiCodePosition = 0;
document.addEventListener('keydown', function (e) {
	var key = allowedKeys[e.keyCode];
	var requiredKey = konamiCode[konamiCodePosition];
	if (key == requiredKey) {
		konamiCodePosition++;
		if (konamiCodePosition == konamiCode.length) {
			activateCheats();
			konamiCodePosition = 0;
		}
	} else {
		konamiCodePosition = 0;
	}
});

function activateCheats() {
	$('#modalDisplay').show();
}

$('body').click(function (event) 
{
   if(!$(event.target).closest('#openModal').length && !$(event.target).is('#openModal')) {
     $("#modalDisplay").hide();
   }     
});