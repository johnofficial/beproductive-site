$(function() {
	window.scrollBy(0, -1);
	mobileMenu();
	//scrollMenu();
	contactForm();
	parallaxHero();
	triggerAnimation();
    testimonialsTrigger();

});
function mobileMenu(){
  $(".mobile-nav-toggle").on('click', function(){
    var status = $(this).hasClass('is-open');
    if(status){
      $(".mobile-nav-toggle, .mobile-header").removeClass("is-open");
    }else{
      $(".mobile-nav-toggle, .mobile-header").addClass("is-open");
    }
});
}

/* Ajax Contact Form */
function contactForm() {
  // Get the form.
	var form = $('#ajax-contact');

	// Get the messages div.
	var formMessages = $('#form-messages');

	// Set up an event listener for the contact form.
	$(form).submit(function(e) {
		// Stop the browser from submitting the form.
		e.preventDefault();

		// Serialize the form data.
		var formData = $(form).serialize();

		// Submit the form using AJAX.
		$.ajax({
			type: 'POST',
			url: $(form).attr('action'),
			data: formData
		})
		.done(function(response) {
			// Make sure that the formMessages div has the 'success' class.
			$(formMessages).removeClass('error');
			$(formMessages).addClass('success');

			// Set the message text.
			$(formMessages).text(response);

			// Clear the form.
			$('#name').val('');
			$('#email').val('');
			$('#message').val('');
		})
		.fail(function(data) {
			// Make sure that the formMessages div has the 'error' class.
			$(formMessages).removeClass('success');
			$(formMessages).addClass('error');

			// Set the message text.
			if (data.responseText !== '') {
				$(formMessages).text(data.responseText);
			} else {
				$(formMessages).text('Oops! An error occured and your message could not be sent.');
			}
		});

	});

}

/*
function scrollMenu(){
  var top = 0;
  $(window).scroll(function(){
    var position =$(this).scrollTop();

    if (position > top && position > 500 ){
            //For devices with display smaller then 775px
            if ($(window).width()< 775) {
              $(".mobile-header, .novis-header").fadeOut();
            }else{
              $(".novis-header").fadeOut();
            }

    } else if(position < top-20) {

            if ($(window).width()< 775) {
              $(".novis-header, .mobile-header").fadeIn();
            }else{
              $(".novis-header").fadeIn();
                }
    }
    top = position;
});
}
*/
function parallaxHero() {
	$(".text-wrap, .hero-img").addClass("show");
    $(window).scroll(function() {
        var wScroll = $(this).scrollTop();
        /* Cover Section Animation */
        $('.clouds, .img-wrap').css({
            '-webkit-transform': 'translateY('+ wScroll/3 +'px)'
        });
		$('.img-wrap').css({
			'-webkit-transform': 'translateY('+ wScroll/6 +'px)'
		});
    });
    $(".hero-section").mousemove(function(event) {
        $(".clouds").css({"-webkit-transform": "translate(-" +event.pageX/25+ "px, -"+event.pageY/25+"px)"});
    });
}

function triggerAnimation() {
    function isScrolledIntoView(elem) {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();

        return (elemTop <= docViewBottom-100);
    }

    $(window).scroll(function () {
        $('[animate]').each(function () {
            if (isScrolledIntoView(this) === true) {
                $(this).addClass('trigger-animation');
            }
        });

    });

}

function testimonialsTrigger() {
    $('.next, .prev').click(function(e){
        e.stopPropagation();
        e.preventDefault();
        var $this 			= $(this),
            curActiveClient = $('.testimonials-wrap').find('.active'),
            position		= $('.testimonials-wrap').children().index(curActiveClient),
            clientNum 		= $('.testimonial').length;

        if($this.hasClass('next')){
            if(position < clientNum - 1){
                $('.active').removeClass('active').next().addClass('active');
            }else{
                $('.testimonial').removeClass('active').first().addClass('active');
            }
        }else{
            if(position == 0){
                $('.testimonial').removeClass('active').last().addClass('active');
            }else{
                $('.active').removeClass('active').prev().addClass('active');
            }
        }
    });
}