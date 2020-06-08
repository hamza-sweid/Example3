// ----- navbar -----
$('.dropdown').hover(function () {
	if (this.classList.contains('dropdown')) {
		this.children[1].classList.toggle('show');
		this.children[1].classList.add('x')
	}
})

// ----- carousel.js -----
$('.carousel').carousel({
	interval: 2500
})


// ----- typed.js -----
var typed = new Typed('#typed', {
	stringsElement: '#type-strings',
	backSpeed: 10,
	backDelay: 2000,
	typeSpeed: 20,
	loop: true,
	loopCount: Infinity,
});