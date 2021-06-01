'use strict';

(function ($) {
  $(document).ready(function () {
    $('.event .zmdi-eye, .event .zmdi-eye-off').on('click', function () {
      if ($(this).hasClass('zmdi-eye')) {
        $(this).removeClass('zmdi-eye');
        $(this).addClass('zmdi-eye-off');
        $(this).parents('tr').addClass('current');
        $(this).parents('tr').next('.subLine').addClass('flex');
      } else if ($(this).hasClass('zmdi-eye-off')) {
        $(this).removeClass('zmdi-eye-off');
        $(this).addClass('zmdi-eye');
        $(this).parents('tr').removeClass('current');
        $(this).parents('tr').next('.subLine').removeClass('flex');
      }
    });
    $('.subMenu').on('click', function () {
      $(this).toggleClass('openMenu');
      $('.header').toggleClass('pdb60');
    });
    $('.main-table tr').on('click', function () {
      // $(this).toggleClass('current');
      // $(this).next('.subLine').addClass('flex');
    });
    $('.inputCheck').on('click', function () {
      $(this).parents('tr').addClass('current');
    });
    $('.main-btn.icon').on('click', function () {
      $('.wrapperNewBox').addClass('open');
      $('.overley').addClass('open');
    });
    $('.wrapperNewBox .zmdi-close').on('click', function () {
      $('.wrapperNewBox').removeClass('open');
      $('.overley').removeClass('open');
    });
  });
})(jQuery);
