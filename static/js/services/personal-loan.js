$(document).ready(function () {

    $('.faq-title').on('click', function () {

        let parent = $(this).closest('.faq-item');

        if (parent.hasClass('active')) {
            parent.removeClass('active');
            parent.find('.faq-content').stop(true, true).slideUp(250);
        } else {
            $('.faq-item').removeClass('active');
            $('.faq-content').stop(true, true).slideUp(250);

            parent.addClass('active');
            parent.find('.faq-content').stop(true, true).slideDown(250);
        }
    });

});