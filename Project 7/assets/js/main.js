$(document).ready(function () {

    //-----------preloader----------
    $(window).on('load', function () {
        $('.loader').fadeOut();
    })

    // search-form
    $('.search,.close-icon').click(function () {
        $('.navbar-right,.navbar-left').toggle();
        $('.form-search').toggle();
    });

    // move fa-angle-right when hover
    $('.dropdown-item').hover(function () {
        if (this.classList.contains('dropdown-item')) {
            this.children[0].classList.toggle('fa-move')
        }
    })

    // show & hide navbar when window < 992px
    $('.btn-collapse').click(function () {
        this.classList.toggle('change');
        $('.navbar-nav').toggleClass('show')
    })

    //changing backgroundColor of navbar when scrolling
    $(window).scroll(function () {
        if (window.pageYOffset > 10) {
            if (window.innerWidth > 992) {
                $('.navbar').addClass('scroll')
            }
        } else {
            $('.navbar').removeClass('scroll')
        }
    })

    // changing size of fa-ellipsis when click
    $('.dropdown-toggle-i').click(function () {
        $('.fa-ellipsis-v').toggleClass('fa-2x')
    })

    // smoothing scroll
    $(".fa-down, .fa-up").on('click', function (event) {
        var hash = this.hash;
        $('html, body').animate({
            scrollTop: $(hash).offset().top - 66
        }, 1200, function () {
        });
    });

    // scroll to top
    let top = document.querySelector('.top');
    $(window).scroll(function () {
        if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
            $(top).css('transform', 'translateY(0)')
        } else {
            $(top).css('transform', 'translateY(110px)')
        }
    })
    $(top).click(function () {
        $("html,body").animate({ scrollTop: 0 }, 1200);
    })

})