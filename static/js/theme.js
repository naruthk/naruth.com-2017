"use strict";

$(document).ready(function () {

    activateScrollingButton();
    changeActivityBackgroundWhenScroll();

    function activateScrollingButton() {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('.scroll-to-top').fadeIn();
            } else {
                $('.scroll-to-top').fadeOut();
            }
        });

        $('.scroll-to-top').click(function () {
            $("html, body").animate({
                scrollTop: 0
            }, 600);
            return false;
        });
    }

    function changeActivityBackgroundWhenScroll() {
        $(document).scroll(function() {
            var dHeight = $("#status").height();
            var alpha = (($(this).scrollTop() / dHeight ) / 10);
            $('#status').css('background', 'rgba(239,239,239,' +(alpha * 2)  + ')');
          });
    }

});