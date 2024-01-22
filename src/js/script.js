// var name = "Ivan";

// let number = 7;
// const pi = 3.14;

// number = 4;

// let leftBorderWidth;

// number
// string - "", '', ``
// true/false
// null - не существует
// undefined - существует но не заполнено
/* let obj = {
	name: 'apple',
	color: 'green',
	weight: 200
} */
// Symbol

// alert(1234)
// console.log(number);
/* let answer = confirm ("Вам есть 18?");
console.log(answer); */

/* let answer = prompt("Вам есть 18?", "");
console.log(answer); */

// console.log(4 + 'fdd');

// let isChecked = true,
//     isClosed = true;

// console.log(isChecked && isClosed); /* оператор И */

// console.log(isChecked || isClosed); /* оператор или */

// if (2*5 == 8*1) {
// 	console.log('Верно')
// } else {
// 	console.log('Ошибка')
// }

// let answer = confirm ("Вам есть 18?");
// if (answer) {
// 	console.log('Прозодите')
// } else {
// 	console.log('Уходи')
// }

// const num = 50;

// if (num < 49) {
// 	console.log('Неправильно')
// } else if (num > 100) {
// 	console.log('Много')
// } else {
// 	console.log('Верно')
// }

// for(let i = 1; i < 8; i++) {
// 	console.log(i);
// }

// function logging(a, b) {
// 	console.log( a + b )
// }

// logging(3, 5);

// logging(6, 8);


$(document).ready(function(){
	$('.carousel__inner').slick({
		speed: 1200,
		// adaptiveHeight: true,
		prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
		nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
		// responsive: [
		// 	{
		// 		breakpoint: 992,
		// 		settings: {
		// 			dots: true,
					
		// 		}
		// 	}
		// ]
	});

	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
		$(this)
		  .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
		  .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	});

	function toggleSlide(item) {		// item - ссылка
		$(item).each(function(i) {
			$(this).on('click', function(e) {
				e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
			})
		});
	};

	toggleSlide('.catalog-item__link');		// toggleSlide - переменная в которую передаётся класс
	toggleSlide('.catalog-item__back');

	//Modal

	$('[data-modal=consultation]').on('click', function() {
		$('.overlay, #consultation').fadeIn('slow');
	});
	$('.modal__close').on('click', function() {
		$('.overlay, #consultation, #thanks, #order').fadeOut('slow');
	});
	// $('.button_mini').on('click', function() {
	// 	$('.overlay, #order').fadeIn('slow');
	// });

	$('.button_mini').each(function(i) {
		$(this).on('click', function() {
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn('slow');
		})
	});

	function valideForms(form){
		$(form).validate({
			rules: {
				name: {
					required: true,
					minlength: 2
				  },
				phone: "required",
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: {
					required: "*Пожалуйста, введите свое имя",
					minlength: jQuery.validator.format("*Минимум {0} символа")
				  },
				phone: "*Пожалуйста, введите свой номер телефона",
				email: {
				  required: "*Пожалуйста, введите свою почту",
				  email: "*Неправильно введен адрес почты"
				}
			}
		});
	};

	valideForms('#consultation-form');
	valideForms('#consultation form');
	valideForms('#order form');

	$('input[name=phone]').mask("+7 (999) 999-9999");

	$('form').submit(function(e) {
		e.preventDefault();

		if (!$(this).valid()) {
			return;
		}

		$.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");
			$('#consultation, #order').fadeOut();
			$('.overlay, #thanks').fadeIn('slow');

			$('form').trigger('reset');
		});
		return false;
	});

	// Smooth sdroll and pageup
	
	$(window).scroll(function() {
		if ($(this).scrollTop() > 1600) {
			$('.pageup').fadeIn();
		} else {
			$('.pageup').fadeOut();
		}
	});

	$("a[href^='#']").click(function(){
		const _href = $(this).attr("href");
		$("html, body").animate({scrollTop: $(_href).offset().top+"px"});
		return false;
	})
});
