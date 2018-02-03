;(function($) {

"use strict";

var $body = $('body');
var $head = $('head');
// var $mainWrapper = $('#main-wrapper');

$(document).ready(function() {

  /* -------------------------------------------------------------------------
    USER LOGIN HOVER
  ------------------------------------------------------------------------- */
  jQuery('#login-link').click(function() {
        jQuery(this).parent("li#login").addClass('active');
        jQuery("#login-shadow").css('height',$("html").height()).fadeIn(500);
        jQuery(this).parent("li#login").find("#login-form").animate({ top: '80px' }, 500);
        jQuery(this).parent("li#login").find("#login-form").find("#login-form-container").fadeIn(750);
  });

  jQuery("#login-shadow").click(function() {
      var loginform = jQuery("#login-form");
      loginform.parent("li#login").removeClass('active');
      jQuery("#login-shadow").fadeOut(500);
      loginform.animate({ top: '-400px' }, 500);
      loginform.find("#login-form-container").fadeOut(500);
  });

  /* -------------------------------------------------------------------------
    MOBILE USER LOGIN HOVER
  ------------------------------------------------------------------------- */
  jQuery('.nav-wrapper-mobile .login-link').click(function() {
        jQuery(this).parent("li.login").addClass('active');
        jQuery("#login-shadow").css('height',$("html").height()).fadeIn(500);
        jQuery(this).parent("li.login").find(".login-form").animate({ top: '-200px' }, 500);
        jQuery(this).parent("li.login").find(".login-form").find(".login-form-container").fadeIn(750);
  });

  jQuery("#login-shadow").click(function() {
      var loginform = jQuery(".nav-wrapper-mobile .login-form");
      loginform.parent("li.login").removeClass('active');
      jQuery("#login-shadow").fadeOut(500);
      loginform.animate({ top: '-1600px' }, 500);
      loginform.find(".login-form-container").fadeOut(500);
  });
  /* -------------------------------------------------------------------------
    SEARCH NAV TOGGLE
  ------------------------------------------------------------------------- */
  var advanced_button = jQuery(".search-nav .advanced-search-button");
  var submenu = jQuery(".search-nav .sub-menu");

  $(advanced_button).on('click', function() {
    jQuery(this).parent('.search-nav').find('.sub-menu').slideToggle(500);
    if (jQuery(this).hasClass('active')) {
        jQuery(this).removeClass('active');
    } else {
        jQuery(this).addClass('active');
    }
  });

  submenu.find("li").click(function() {
    submenu.find("li").removeClass('active');
    jQuery(this).addClass('active');
    var getclass = jQuery(this).attr('class');
    jQuery(this).addClass('active');
    jQuery(".search-nav .advanced-search-button").val(getclass);
    var geticon = jQuery(this).find('i').attr('class');
    advanced_button.find('i').attr('class',geticon + ' fa-lg');
    advanced_button.removeClass('active');
    jQuery('.search-nav').find('ul').slideUp(500);
  });

  /* -------------------------------------------------------------------------
    ADVANCED SEARCH TOGGLE
  ------------------------------------------------------------------------- */
  var $AdvancedSearchToggle = $('.map-search .advanced-search');
  var mapHeight;
  var wrapper = $("#map_canvas_wrapper");
  var mapToggle = $(".map-control");

  $AdvancedSearchToggle.hide();

  $('.select-button button').on('click', function(e){
    $('.search-shadow').fadeToggle("slow");
    $(this).toggleClass('active');
    e.preventDefault();
    $AdvancedSearchToggle.slideToggle("slow");
    if(mapToggle.hasClass("active")){
      $(mapToggle).removeClass("active");
      wrapper.animate({"height": mapHeight}, "slow");
      $(mapToggle).find('.fa').removeClass("fa-chevron-circle-down");
      $(mapToggle).find('.fa').addClass("fa-chevron-circle-up");
      $(mapToggle).find('span').text("Hide map");
    }
  });

  /* -------------------------------------------------------------------------
    MENU NAV
  ------------------------------------------------------------------------- */
  $('.nav').each(function() {

    var self = $(this);

    // HOVER SUBMENU
    self.find('li.has-submenu').hover(function() {
        $(this).addClass('hover');
        $(this).find('>.sub-menu').stop(true, true).fadeIn(200);
    }, function() {
        $(this).removeClass('hover');
        $(this).find('>.sub-menu').stop(true, true).delay(10).fadeOut(200);
    });
  });

  /* -------------------------------------------------------------------------
    HEADER TOGGLES
  ------------------------------------------------------------------------- */

  // SEARCH TOGGLE
  $( '.search-toggle' ).click(function(){
    if ( $( '.nav-wrapper-mobile' ).is( ':visible' ) ) {
      $( '.nav-wrapper-mobile' ).slideUp(300);
    }
    $( '.search-nav.mobile' ).slideToggle(300, function(){
    });
  });

  // NAVBAR TOGGLE
  $( '.navbar-toggle' ).click(function(){
    if ( $( '.search-nav.mobile' ).is( ':visible' ) ) {
      $( '.search-nav.mobile' ).slideUp(300);
    }
    $( '.nav-wrapper-mobile' ).slideToggle(300, function(){
    });
  });

  /* -------------------------------------------------------------------------
     HEADER MENU MOBILE
   ------------------------------------------------------------------------- */
  $('.nav-wrapper-mobile > .main-menu').each(function() {

    var self = $(this);

    // CREATE TOGGLE BUTTONS
    self.find( 'li.has-submenu' ).each(function(){
      $(this).append( '<button class="submenu-toggle"><i class="fa fa-chevron-down"></i></button>' );
    });

    // TOGGLE SUBMENU
    self.find('.submenu-toggle').each(function() {
      $(this).click(function() {
        $(this).parent().find('> .sub-menu').slideToggle(200);
        $(this).find('.fa').toggleClass('fa-chevron-up fa-chevron-down');
      });
    });

  });

  /* -------------------------------------------------------------------------
    PRICE FILTER
  ------------------------------------------------------------------------- */
  $( "#slider-distance-search" ).slider({
    range: "min",
    value: 1500,
    min: 1,
    max: 5000,
    slide: function( event, ui ) {
      $( "#distance-search" ).val( ui.value +   "km" );
    }
  });
  $( "#distance-search" ).val( $( "#slider-distance-search" ).slider( "value" ) +  "km");

  $( "#slider-publication-search" ).slider({
    range: "min",
    value: 7,
    min: 0,
    max: 30,
    slide: function( event, ui ) {
      $( "#publication-search" ).val( "<" + ui.value );
    }
  });
  $( "#publication-search" ).val( "<" + $( "#slider-publication-search" ).slider ( "value" ));

  /* -------------------------------------------------------------------------
    FLICKR
  ------------------------------------------------------------------------- */
  $("#flickr-feed").each(function() {
    var flickr_id = jQuery(this).html();
    jQuery(this).html('<ul></ul>');
    jQuery(this).find('ul').jflickrfeed({
        limit           : 6,
        qstrings        : { id: flickr_id },
        itemTemplate    : '<li><a class="opacity" href="{{image_b}}"><img src="{{image_s}}" alt="{{title}}" /></a></li>'
    });
  });

  /* -------------------------------------------------------------------------
      HIDE/SHOW CONTACT FORM (SIDEBAR)
  ------------------------------------------------------------------------- */
  jQuery('.claim-company .btn').click(function() {
      jQuery('.claim-company-form').slideToggle(500);
      if (jQuery(this).find('i').hasClass('fa-chevron-circle-down')) {
          jQuery(this).find('i').removeClass('fa-chevron-circle-down').addClass('fa-chevron-circle-up');
      } else {
          jQuery(this).find('i').removeClass('fa-chevron-circle-up').addClass('fa-chevron-circle-down');
      }
  });

  /* -------------------------------------------------------------------------
    RATING
  ------------------------------------------------------------------------- */
  $('.company-ratings li.single-rate').each(function() {

    var self = $(this);

    // HOVER SUBMENU
    self.find('.box-details').hover(function() {
        self.addClass('hover');
        self.find('.user-values').stop(true, true).fadeIn(200);
    }, function() {
        self.removeClass('hover');
        self.find('.user-values').stop(true, true).delay(10).fadeOut(200);
    });
  });


  /* -------------------------------------------------------------------------
      MAPS
  ------------------------------------------------------------------------- */
  
  // MAP CONTACT
  $("#map_canvas_contact").each(function initialize() {
    $(this).goMap({
      maptype: 'ROADMAP',
      scrollwheel: false,
      navigationControl: false,
      zoom: 5,
      markers: [{
        latitude: 46.454889270677576,
        longitude: 7.45697021484375,
        icon: 'img/map-marker-contact.png',
        html: 'Metrodir'
      }]
    });
  });



  //MAP SIDEBAR
  $("#map_canvas_sidebar").each(function() {
    $(this).goMap({
      maptype: 'ROADMAP',
      scrollwheel: false,
      navigationControl: false,
      zoom: 6,
      markers: [{
        latitude: 46.454889270677576,
        longitude: 7.45697021484375,
        icon: 'img/map-marker-contact.png',
        html: 'Metrodir'
      }]
    });
  });

  // STREET VIEW
  var fenway = new google.maps.LatLng(42.345573,-71.098326);
  $("#map_street_view").each(function() {
    $(this).gmap3({
      streetviewpanorama:{
        options:{
          container: $("#map_street_view"),
          opts:{
            scrollwheel: false,
            position: fenway,
            pov: {
              heading: 166,
              pitch: 1,
              zoom: 1
            }
          }
        }
      }
    });
  });

  $("#main-wrapper.listing").each(function() {
    var map_width = $(window).width() - (60 + $("#main-wrapper").width());
    $("#map_canvas_wrapper").width(map_width);
  });

  $(window).resize(function(){
    var map_width = $(window).width() - (60 + $("#main-wrapper").width());
    $("#main-wrapper.listing #map_canvas_wrapper").width(map_width);
  });

  /* -------------------------------------------------------------------------
      HIDE/SHOW MAP
  ------------------------------------------------------------------------- */
  jQuery(".map-control").click(function() {
    var wrapper = $("#map_canvas_wrapper");
    if($(this).hasClass("active")){
      $(this).removeClass("active");
      wrapper.animate({"height": mapHeight}, "slow");
      $(this).find('a.btn>i.fa').removeClass("fa-chevron-circle-down");
      $(this).find('a.btn>i.fa').addClass("fa-chevron-circle-up");
      $(this).find('a.btn>span').text("Hide map");
    } else{
      mapHeight = wrapper.height();
      $(this).addClass("active");
      wrapper.animate({"height": 62}, "slow");
      $(this).find('a.btn>i.fa').removeClass("fa-chevron-circle-up");
      $(this).find('a.btn>i.fa').addClass("fa-chevron-circle-down");
      $(this).find('a.btn>span').text("Show map");
      if($('.select-button button').hasClass('active')){
        $('.search-shadow').fadeToggle("slow");
        $('.select-button button').toggleClass('active');
        $AdvancedSearchToggle.slideToggle("slow");
      }
    }
    return false;
  });

  /* -------------------------------------------------------------------------
    MATCH HEIGHT (SECTION CATEGORIES)
  ------------------------------------------------------------------------- */
  $(function() {
    $('.list .category-box, .listing-box').matchHeight();
  });

  /* -------------------------------------------------------------------------
    REVOLUTION SLIDER
  ------------------------------------------------------------------------- */
  $(function() {
    $('.tp-banner').revolution({
      delay:9000,
      startwidth:1170,
      startheight:500,
      hideThumbs:10,
      navigationType:"bullet",
      navigationArrows:"solo",
      navigationStyle:"round"
    });
  });

  /* -------------------------------------------------------------------------
    TABS
  ------------------------------------------------------------------------- */
  $('.responsive-tabs').each(function() {
    $(this).responsiveTabs({
      accordionOn: ['xs'] // xs, sm, md, lg
    });
  });

  /* -------------------------------------------------------------------------
    COMPANIES ADVERTS SLIDERS
  ------------------------------------------------------------------------- */
  $(".companies-slider.latest").owlCarousel({
    paginationNumbers: true,
    slideSpeed : 300,
    autoPlay: true,
    paginationSpeed : 400,
    singleItem:true
  });

  $(".companies-slider.featured").owlCarousel({
    paginationNumbers: true,
    slideSpeed : 300,
    autoPlay: false,
    paginationSpeed : 400,
    items: 4,
    itemsDesktop : [1199,4],
    itemsDesktopSmall : [980,2],
    itemsTablet: [768,2],
    itemsMobile : [479,1],
  });

  $(".partners-slider").owlCarousel({
    pagination: true,
    slideSpeed : 300,
    autoPlay: false,
    paginationSpeed : 400,
    itemsDesktop : [1199,5],
    itemsDesktopSmall : [980,5],
    itemsTablet: [768,3],
    itemsMobile : [479,3],
  });

  /* -------------------------------------------------------------------------
  MEDIA QUERY BREAKPOINT
  ------------------------------------------------------------------------- */
  var uouMediaQueryBreakpoint = function() {

    if ($('#media-query-breakpoint').length < 1) {
      $('body').append('<var id="media-query-breakpoint"><span></span></var>');
    }
    var value = $('#media-query-breakpoint').css('content');
    if (typeof value !== 'undefined') {
      value = value.replace("\"", "").replace("\"", "").replace("\'", "").replace("\'", "");
      if (isNaN(parseInt(value, 10))) {
        $('#media-query-breakpoint span').each(function() {
          value = window.getComputedStyle(this, ':before').content;
        });
        value = value.replace("\"", "").replace("\"", "").replace("\'", "").replace("\'", "");
      }
      if (isNaN(parseInt(value, 10))) {
        value = 1199;
      }
    } else {
      value = 1199;
    }
    return value;

  };

  /* -------------------------------------------------------------------------
    SELECT BOX 
  ------------------------------------------------------------------------- */
  $.fn.uouSelectBox = function() {

    var self = $(this),
      select = self.find('select');
    self.prepend('<ul class="select-clone custom-list"></ul>');

    var placeholder = select.data('placeholder') ? select.data('placeholder') : select.find('option:eq(0)').text(),
      clone = self.find('.select-clone');
    self.prepend('<input class="value-holder" type="text" disabled="disabled" placeholder="' + placeholder + '"><div class="advanced-select-button"><i class="fa fa-chevron-down"></i></div>');
    var value_holder = self.find('.value-holder');

    // INPUT PLACEHOLDER FIX FOR IE
    if ($.fn.placeholder) {
      self.find('input, textarea').placeholder();
    }

    // CREATE CLONE LIST
    select.find('option').each(function() {
      if ($(this).attr('value')) {
        clone.append('<li data-value="' + $(this).val() + '">' + $(this).text() + '</li>');
      }
    });

    // CLICK TOGGLE
    self.click(function() {
      var media_query_breakpoint = uouMediaQueryBreakpoint();
      if (media_query_breakpoint > 991) {
        clone.slideToggle(300);
        self.toggleClass('active');
        var searchButton = self.find('.advanced-select-button');
        searchButton.toggleClass('active');
        if(self.hasClass("active")){
          searchButton.find(".fa").removeClass("fa-chevron-down");
          searchButton.find(".fa").addClass("fa-chevron-up");
        } else{
          searchButton.find(".fa").addClass("fa-chevron-down");
          searchButton.find(".fa").removeClass("fa-chevron-up");
        }
      }
    });

    // CLICK
    clone.find('li').click(function() {

      value_holder.val($(this).text());
      select.find('option[value="' + $(this).attr('data-value') + '"]').attr('selected', 'selected');

      // IF LIST OF LINKS
      if (self.hasClass('links')) {
        window.location.href = select.val();
      }

    });

    // HIDE LIST
    self.bind('clickoutside', function(event) {
      clone.slideUp(100);
    });

    // LIST OF LINKS
    if (self.hasClass('links')) {
      select.change(function() {
        window.location.href = select.val();
      });
    }

  };

  /* -------------------------------------------------------------------------
    RADIO INPUT
  ------------------------------------------------------------------------- */
  $.fn.uouRadioInput = function(){

    var self = $(this),
    input = self.find( 'input' ),
    group = input.attr( 'name' );

    // INITIAL STATE
    if ( input.is( ':checked' ) ) {
      self.addClass( 'active' );
    }

    // CHANGE STATE
    input.change(function(){
      if ( group ) {
        $( '.radio-input input[name="' + group + '"]' ).parent().removeClass( 'active' );
      }
      if ( input.is( ':checked' ) ) {
        self.addClass( 'active' );
      }
    });
  };

  /* -------------------------------------------------------------------------
      BACK TO TOP BUTTON
  ------------------------------------------------------------------------- */
  $('#back-to-top').each(function () {

    var $this = $(this);

    $this.on('click', function (event) {
      event.preventDefault();
      $('html, body').animate({ scrollTop: 0 }, 300);
    });

    $(window).scroll(function () {
      if ($(this).scrollTop() > 300) {
        $this.fadeIn(200);
      } else if ($(this).scrollTop() < 250) {
        $this.fadeOut(200);
      }
    });

  });

  // GET ACTUAL MEDIA QUERY BREAKPOINT
  var media_query_breakpoint = uouMediaQueryBreakpoint();

  // SELECT BOX
  $( '.select-box' ).each(function(){
    $(this).uouSelectBox();
  });

  // RADIO INPUT
  $( '.radio-input' ).each(function(){
    $(this).uouRadioInput();
  });

  $(window).resize(function(){
    if ( uouMediaQueryBreakpoint() !== media_query_breakpoint ) {
      media_query_breakpoint = uouMediaQueryBreakpoint();

      /* RESET HEADER ELEMENTS */
      $( '.search-nav.mobile, .nav-wrapper-mobile' ).removeAttr( 'style' );
    }
  });
});

// Touch
// ---------------------------------------------------------
var dragging = false;

$body.on('touchmove', function() {
	dragging = true;
});

$body.on('touchstart', function() {
	dragging = false;
});



}(jQuery));
