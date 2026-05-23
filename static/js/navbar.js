jQuery(document).ready(function($) {
    // 1. Mobile Navbar Toggle
    $('.navbar-toggle').on('click', function() {
        $(this).toggleClass('active');
        $($(this).data('target')).slideToggle();
    });

    // 2. Dropdown behavior for mobile
    $('.menu-item-has-children > a').on('click', function(e) {
        if ($(window).width() <= 991.98) {
            e.preventDefault();
            $(this).siblings('.sub-menu').slideToggle();
        }
    });

    // 3. Anchor tag smooth color transition (as per your request)
    $('a').css({
        'transition': 'color 1000ms ease 0s, background-color 1500ms ease 0s'
    });
});