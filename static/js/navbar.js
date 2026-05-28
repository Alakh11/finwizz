jQuery(document).ready(function ($) {

    "use strict";

    $('.navbar-nav > li > a:not(.dropdown-toggle)')
        .on('click', function () {

            $('.navbar-collapse')
                .collapse('hide');

        });

    $(window).scroll(function () {

        if ($(window).scrollTop() > 50) {

            $('.navbar')
                .addClass('shadow-sm');

        } else {

            $('.navbar')
                .removeClass('shadow-sm');

        }

    });

    $('.contact-dropdown').hover(

        function () {

            $(this)
                .addClass('show');

            $(this)
                .find('.dropdown-menu')
                .addClass('show');

        },

        function () {

            $(this)
                .removeClass('show');

            $(this)
                .find('.dropdown-menu')
                .removeClass('show');

        }

    );

    $('.contact-link').focus(function () {

        $(this)
            .closest('.contact-dropdown')
            .addClass('show')
            .find('.dropdown-menu')
            .addClass('show');

    });

});