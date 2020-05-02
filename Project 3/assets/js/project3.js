//-----------navbar-vertical-dropdown----------
$(".has-sub-menu").click(function () {
	$('.sub-menu').toggle();
})


//-----------create-resume----------
$('.docs').hover(function () {
	$(this).children('p:first').toggle()
})
//-----------feedback----------
$('.feedback').hover(function () {
	$('.feedback small').fadeToggle(300)
})

//-----------contact us----------
$('.contact').hover(function () {
	$('.contact small').fadeToggle(300)
})


//-----------Get the year----------
var date = new Date();
var year = date.getFullYear();
$('.date').html(year);


//-----------WOW library----------
new WOW().init();


//-----------OWL-carousel library----------
$('.owl-carousel').owlCarousel({
	center: true,
	loop:true,
	margin:10,
	nav:true,
	responsive:{
		0:{
			items:1
		},
		200:{
			items:2
		},
		600:{
			items:3
		},
		1000:{
			items:5
		}
	}
})


//-----------data-lightbox library----------
$(document).on('click', '[data-lightbox]', lity);

//-----------nav-dropdown----------
$('.dropdown').hover(function () {
	if (this.classList.contains('dropdown')) {
		this.children[1].classList.toggle('show');
		this.children[1].classList.add('x')
	}
})


//-----------smooth scrolling----------
$(".question-hd a").on('click', function(event) {
	var hash = this.hash; 
	$('html, body').animate({
		scrollTop: $(hash).offset().top
	}, 1200, function(){
	});
});