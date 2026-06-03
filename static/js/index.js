$(document).ready(function () {

    // Accordion Logic
    $('.accordion-title').click(function () {
        const item = $(this).parent();

        if (item.hasClass('active')) {
            item.removeClass('active');
            item.find('.accordion-content').slideUp();
        } else {
            $('.accordion-item').removeClass('active');
            $('.accordion-content').slideUp();

            item.addClass('active');
            item.find('.accordion-content').slideDown();
        }
    });

    // Counter Animation Logic
    function startCounter() {
        $('.counter').each(function () {
            let $this = $(this);
            let countTo = $this.data('count');

            $({
                countNum: 0
            }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'swing',
                step: function () {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function () {
                    // Specific logic to append 'K' or 'L' based on original numbers if desired
                    // For now, it animates beautifully up to the dataset count.
                    $this.text(countTo);
                }
            });
        });
    }

    startCounter();

    // Partner Logo Slider
    $('.partner-slider').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2
                }
            }
        ]
    });

    // Testimonials Slider
    $('.testimonial-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: false,
        dots: true,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

});