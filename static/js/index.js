$(document).ready(function () {

    $(document).on('click', '.accordion-title', function () {
        let $item = $(this).closest('.accordion-item');

        if ($item.hasClass('active')) {
            $item.removeClass('active');
            $item.find('.accordion-content').stop(true, true).slideUp(300);
            $(this).find('span').text('+');
        } else {
            $('.accordion-item').removeClass('active');
            $('.accordion-content').stop(true, true).slideUp(300);
            $('.accordion-title span').text('+');

            $item.addClass('active');
            $item.find('.accordion-content').stop(true, true).slideDown(300);
            $(this).find('span').text('-');
        }
    });

    let counterStarted = false;

    function runCounters() {
        $('.counter').each(function () {
            let $this = $(this);
            let countTo = parseInt($this.data('count'));
            let suffix = $this.data('suffix') || '';

            $({ countNum: 0 }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'swing',
                step: function () {
                    $this.text(Math.floor(this.countNum) + suffix);
                },
                complete: function () {
                    $this.text(countTo + suffix);
                }
            });
        });
    }

    $(window).on('scroll', function() {
        if (!counterStarted && $('.stats-wrapper-section').length) {
            let oTop = $('.stats-wrapper-section').offset().top - window.innerHeight;
            if ($(window).scrollTop() > oTop) {
                runCounters();
                counterStarted = true;
            }
        }
    });

    $(window).trigger('scroll');

});