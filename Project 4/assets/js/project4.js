//-----------loader----------
$(window).on('load', function () {
    $('.loading').fadeOut();
    $('html').css('overflow','auto')
})

//-----------OWL-carousel library----------
$('#brands').owlCarousel({
    // center: true,
    loop:true,
    nav:true,
    // stagePadding:-80,
    autoplay: true,
    autoplayTimeout:2000,
    responsive:{
        300:{
            items:2
        },
        600:{
            items:2
        },
        1000:{
            items:4
        }
    }
})

$('#people').owlCarousel({
    // center: true,
    loop:true,
    margin:10,
    nav:true,
    responsive:{
        300:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:3
        }
    }
})

// ----------show/hide-navbar-----------
$(window).on('scroll',function () {
    if(window.pageYOffset > 400){
        $('.navbar').addClass('fixed-top')
    } else{
        $('.navbar').removeClass('fixed-top')
    }
})

// ----------shuffle-pics-----------
function shufflePics() {
    var shuffle = [1,2,3,4,5,6];
    var i, j, k;
    for (i = shuffle.length -1; i > 0; i--) {
        j = Math.floor(Math.random() * 5)
        k = shuffle[i]
        shuffle[i] = shuffle[j]
        shuffle[j] = k
    }
    console.log(shuffle)

    for (let c = 0; c < shuffle.length; c++) {
        console.log(shuffle[0]);
        $('#pic' + c).attr('src','assets/images/types' + shuffle[c] + '.png');
    }
}
$('.types p').click(function () {
    if(this.classList.contains('active')){

    } else{
        $('.types').children().removeClass('active');
        $(this).addClass('active');
        shufflePics();
    }
})

// ----------go to top-----------
$(window).scroll(function () {
    if(window.pageYOffset > 400){
        $('.top').fadeIn();
    }else{
        $('.top').fadeOut();
    }
})
$('.top').click(function () {
    $("html,body").animate({scrollTop:0},1000);
})