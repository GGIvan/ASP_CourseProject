$(document).ready(function() {
	var cookieBarOptions = {
		name: 'government.bg',
		message: i18n.cookiebar_text,
		acceptText: i18n.cookiebar_btn
	};
	$.cookieBar(cookieBarOptions);

	$(window).scroll(function (event) {
		var scrollTop = $(window).scrollTop();

		if ($(window).width() < 1025) {
			return false;
		}

		if (scrollTop < 100) {
			if ($("header").hasClass("lock")) {
				$("header").removeClass("lock");

				$(".eu18bg").animate({
					'width': '100px',
					'margin-top': '-11px',
				}, 80);

				$(".live-stream").animate({
					'top': '135px',
				}, 80);

				$(".header-content").animate({
					'padding': '20px 0'
				}, 80);

				$(".header-content .left").animate({
					'font-size': 18,
					'line-height': 18,
					'width': 184,
				}, 80);

				$(".header-content .center img").animate({
					'width': 100,
					'height': 85,
				}, 80);

				$(".header-content .right").animate({
					'font-size': 18,
					'line-height': 18,
					'width': 215,
				}, 80);

				$("header .search").animate({
					'margin': '21px 0 0 0'
				}, 80);

				$("header .navigation").animate({
					'opacity': '1',
				}, 300);

				$("header .navigation nav .menu li > a").animate({
					'padding': '22px 0',
				}, 80);
			}
		}
		else {
			if (!$("header").hasClass("lock")) {
				$("header").addClass("lock");

				$(".eu18bg").animate({
					'width': '50px',
					'margin-top': '-5px',
				}, 80);

				$(".live-stream").animate({
					'top': '64px',
				}, 300);

				$(".header-content").animate({
					'padding': '10px 0'
				}, 300);

				$(".header-content .left").animate({
					'font-size': 11,
					'line-height': 11,
					'width': 150,
				}, 300);

				$(".header-content .center img").animate({
					'width': 50,
					'height': 42,
				}, 300);

				$(".header-content .right").animate({
					'font-size': 11,
					'line-height': 11,
					'width': 140,
				}, 300);

				$("header .search").animate({
					'margin': '12px 0 0 0'
				}, 300);

				$("header .navigation").animate({
					'opacity': '0.9',
				}, 300);

				$("header .navigation nav .menu li > a").animate({
					'padding': '14px 0',
				}, 300);
			}
		}
	});

	$(".mobile-navigation label").on('click', function() {
		$("#navbar").toggle();
	});

	$("#navbar a").on('click', function() {
		var el = $(this);
		var attr = el.attr('data-value');
		
		if (!el.parent().hasClass('active')) {
			$("#navbar .submenu").slideUp(400);
			$("#navbar li").removeClass('active');
			$("#navbar li a span").removeClass('rotate180');

			el.find('span').addClass('rotate180');
			el.parent().addClass('active');
			$(attr).slideDown(400);
		}
		else {
			el.find('span').removeClass('rotate180');
			el.find('span').addClass('rotate0');
			$(attr).slideUp(400,function() {
				el.parent().removeClass('active');
				el.find('span').removeClass('rotate0');
			});	
		}

	});

	$(".menu li > a").mouseenter(function(event) {
		var lock = false;
		$(".menu li a").each(function(i, el) {
			if ($(el).hasClass('open')) {
				lock = true;
			}
		});

		if (lock) {
			return false;
		}

		$(this).addClass('open');
		
		var attr = $(this).attr('data-value');
		if (typeof attr !== typeof undefined && attr !== false) {
			$(attr).show();
			$(".groupmenu").slideDown(200);
		}

		event.stopPropagation();
	}).mouseleave(function(event) {
		$('.groupmenu-wrapper').on('mouseenter', function(e) {
			$('.row.groupmenu-wrapper').addClass('open');
			e.stopPropagation();
		});

		var timer = setTimeout(function() {
			if ($('.groupmenu-wrapper').hasClass('open')) {
				return false;
			}

			$(".groupmenu").slideUp(100, function() {
				$(".horizontal-menu").hide();
				$(".menu li a").removeClass('open');
			});
		}, 100);

		event.stopPropagation();
	});

	$('.groupmenu-wrapper').on('mouseleave', function(event) {
		$(".groupmenu").slideUp(100, function() {
			$(".horizontal-menu").hide();
			$(".menu li a").removeClass('open');
			$('.groupmenu-wrapper').removeClass('open');
		});
		event.stopPropagation();
	});

	$(".search .magnifier").on('click', function() {
		var el = $(this);
		if (el.hasClass('lock')) {
			return false;
		}

		if (!el.hasClass('open')) {
			el.addClass('lock');
			$(".search").addClass("active");
			setTimeout(function() {
				el.removeClass('lock');
				$(".search input").focus();
				el.addClass('open');
			}, 500);

			return false;
		} else {
			var val = $(".search input").val();
			if (!isNullOrEmpty(val) && val.length > 2) {
				el.parent().submit();
			}
			$(".search input").focus();
			return false;	
		}
	});

	$(".navigation li").on('mouseenter', function() {
		$(".search input").val("");
		$(".search").removeClass('active');
		$(".search .magnifier").removeClass('open');
	});

	$(".navigation").on('mouseleave', function() {
		$(".search input").val("");
		$(".search").removeClass('active');
		$(".search .magnifier").removeClass('open');
	});
       
	function keepAspectRatio(container) {
        var width = 16;
        var height = 9;

        var box = $(container);
        var iframe_width = box.width();
		
		if ($("#videocode").length > 0) {
			iframe_width = $("#videocode").width() - 20;
		}
		
        var iframe_height = Math.ceil(iframe_width / (width / height));
        
        $(container).each(function(i, el) {
        	$(el).find('iframe').css({"width": iframe_width + "px", "height": iframe_height + "px"});
        });
    }

    keepAspectRatio(".videocode");
    
    window.onresize = function (event) {
        keepAspectRatio(".videocode");
    }

}); 

function isNullOrEmpty(value)
{
	value = value.replace(/\s/g, "");
	switch (value) {
        case "":
        case 0:
        case "0":
        case null:
        case false:
        case undefined:
        case typeof this === 'undefined':
            return true;
        default: 
        	return false;
    }
}