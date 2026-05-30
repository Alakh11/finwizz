jQuery(document).ready(function ($) {

  $(".selectCity select").on("change", function () {
    var stateVal = $(this).val();
    
    $(".location_boxes .mapBox").hide();
    
    if (stateVal !== "") {
      $('.location_boxes .mapBox[data-termid="' + stateVal + '"]').fadeIn(300);
    }
  });
});