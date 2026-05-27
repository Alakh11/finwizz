jQuery(document).ready(function($) {
    "use strict";

    $('.navbar-nav > li > a:not(.dropdown-toggle)').on('click', function(){
        $('.navbar-collapse').collapse('hide');
    });

    $(window).scroll(function() {
        if ($(window).scrollTop() > 50) {
            $('.navbar').addClass('shadow-sm');
        } else {
            $('.navbar').removeClass('shadow-sm');
        }
    });
});