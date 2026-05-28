$(document).ready(function () {

    $('.blog-card').mouseenter(function () {

        $(this).addClass('active-card');

    });

    $('.blog-card').mouseleave(function () {

        $(this).removeClass('active-card');

    });

});