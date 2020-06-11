jQuery(document).ready(function ($) {
  var secondaryNav = $(".cd-secondary-nav"),
    secondaryNavTopPosition = secondaryNav.offset().top,
    taglineOffesetTop =
      $("#cd-intro-tagline").offset().top +
      $("#cd-intro-tagline").height() +
      parseInt($("#cd-intro-tagline").css("paddingTop").replace("px", "")),
    contentSections = $(".cd-section");

  $(window).on("scroll", function () {
    //on desktop - assign a position fixed to logo and action button and move them outside the viewport
    $(window).scrollTop() > taglineOffesetTop
      ? $("#cd-logo, .cd-btn").addClass("is-hidden")
      : $("#cd-logo, .cd-btn").removeClass("is-hidden");

    //on desktop - fix secondary navigation on scrolling
    if ($(window).scrollTop() > secondaryNavTopPosition) {
      //fix secondary navigation
      secondaryNav.addClass("is-fixed");
      //push the .cd-main-content giving it a top-margin
      $(".cd-main-content").addClass("has-top-margin");
      //on Firefox CSS transition/animation fails when parent element changes position attribute
      //so we to change secondary navigation childrens attributes after having changed its position value
      setTimeout(function () {
        secondaryNav.addClass("animate-children");
        $("#cd-logo").addClass("slide-in");
        $(".cd-btn").addClass("slide-in");
      }, 50);
    } else {
      secondaryNav.removeClass("is-fixed");
      $(".cd-main-content").removeClass("has-top-margin");
      setTimeout(function () {
        secondaryNav.removeClass("animate-children");
        $("#cd-logo").removeClass("slide-in");
        $(".cd-btn").removeClass("slide-in");
      }, 50);
    }

    //on desktop - update the active link in the secondary fixed navigation
    updateSecondaryNavigation();
  });

  function updateSecondaryNavigation() {
    contentSections.each(function () {
      var actual = $(this),
        actualHeight =
          actual.height() +
          parseInt(actual.css("paddingTop").replace("px", "")) +
          parseInt(actual.css("paddingBottom").replace("px", "")),
        actualAnchor = secondaryNav.find(
          'a[href="#' + actual.attr("id") + '"]'
        );
      if (
        actual.offset().top - secondaryNav.height() <= $(window).scrollTop() &&
        actual.offset().top + actualHeight - secondaryNav.height() >
          $(window).scrollTop()
      ) {
        actualAnchor.addClass("active");
      } else {
        actualAnchor.removeClass("active");
      }
    });
  }

  //on mobile - open/close secondary navigation clicking/tapping the .cd-secondary-nav-trigger
  $(".cd-secondary-nav-trigger").on("click", function (event) {
    event.preventDefault();
    $(this).toggleClass("menu-is-open");
    secondaryNav.find("ul").toggleClass("is-visible");
  });

  //smooth scrolling when clicking on the secondary navigation items
  secondaryNav.find("ul a").on("click", function (event) {
    event.preventDefault();
    var target = $(this.hash);
    $("body,html").animate(
      {
        scrollTop: target.offset().top - secondaryNav.height() + 1,
      },
      400
    );
    //on mobile - close secondary navigation
    $(".cd-secondary-nav-trigger").removeClass("menu-is-open");
    secondaryNav.find("ul").removeClass("is-visible");
  });

  //on mobile - open/close primary navigation clicking/tapping the menu icon
  $(".cd-primary-nav").on("click", function (event) {
    if ($(event.target).is(".cd-primary-nav"))
      $(this).children("ul").toggleClass("is-visible");
  });


  /*Personal projects  */
  $(".hover").mouseleave(function () {
    $(this).removeClass("hover");
  });


});

(function ($) {
  "use strict";

  /*==================================================================
    [ Validate ]*/
  var input = $(".validate-input .input100");

  $(".validate-form").on("submit", function () {
    var check = true;

    for (var i = 0; i < input.length; i++) {
      if (validate(input[i]) == false) {
        showValidate(input[i]);
        check = false;
      }
    }

    return check;
  });

  $(".validate-form .input100").each(function () {
    $(this).focus(function () {
      hideValidate(this);
    });
  });

  function validate(input) {
    if ($(input).attr("type") == "email" || $(input).attr("name") == "email") {
      if (
        $(input)
          .val()
          .trim()
          .match(
            /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
          ) == null
      ) {
        return false;
      }
    } else {
      if ($(input).val().trim() == "") {
        return false;
      }
    }
  }

  function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass("alert-validate");
  }

  function hideValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass("alert-validate");
  }

  function openInNewTab(url) {
    var win = window.open(url, "_blank");
    win.focus();
  }
})(jQuery);



$( document ).ready(function() {
  // Main variables
    var $aboutTitle = $('.about-myself .content h2');
    var $developmentWrapper = $('.development-wrapper');
    var developmentIsVisible = false;


  /* ####### HERO SECTION ####### */

  $('.hero .content .header').delay(500).animate({
    'opacity':'1',
    'top': '50%'
  },1000);


  $(window).scroll( function(){

    var bottom_of_window = $(window).scrollTop() + $(window).height();


  /* ##### EXPERIENCE SECTION #### */

      // Check the location of each element hidden */
      $('.experience .content .hidden').each( function(i){

          var bottom_of_object = $(this).offset().top + $(this).outerHeight();

          /* If the object is completely visible in the window, fadeIn it */
          if( bottom_of_window > bottom_of_object ){

            $(this).animate({
              'opacity':'1',
              'margin-left': '0'
            },600);
          }
      });

  /*###### SKILLS SECTION ######*/

    var middle_of_developmentWrapper = $developmentWrapper.offset().top + $developmentWrapper.outerHeight()/2;

    if((bottom_of_window > middle_of_developmentWrapper)&& (developmentIsVisible == false)){

      $('.skills-bar-container li').each( function(){

        var $barContainer = $(this).find('.bar-container');
        var dataPercent = parseInt($barContainer.data('percent'));
        var elem = $(this).find('.progressbar');
        var percent = $(this).find('.percent');
        var width = 0;

        var id = setInterval(frame, 15);

        function frame() {
          if (width >= dataPercent) {
              clearInterval(id);
          } else {
            width++;
            elem.css("width", width+"%");
            percent.html(width+" %");
          }
        }
      });
      developmentIsVisible = true;
    }
  }); // -- End window scroll --
});