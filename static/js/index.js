$(document).ready(function () {

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
                    $this.text(countTo);
                }
            });
        });
    }

    startCounter();

});