
function wypozycjonujTerminarz() {
  var wysokoscOkna = (($(window).height() - $('#kafelek-terminarz').height()) / 3);
  $('#kafelek-terminarz').css({
    'margin-top': wysokoscOkna + 'px',
    'margin-bottom': (wysokoscOkna * 2) + 'px',
  });
  $('.container-terminarz').css({ 'min-height': ($(window).height() - 50) + 'px' });
}

function initMap() {
  var uluru = { lat: 51.109, lng: 17.032 };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: uluru,
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
}

$(function () {
  $('#kafelek-terminarz').click( function () {
    $('#modalTerminarz').modal({'backdrop': 'static'});
    $('.background-image').css({ 'filter': 'blur(3px)' });
    $('.content').css({ 'filter': 'blur(2px)' });
  });

  $('#modalTerminarz').on('hidden.bs.modal', function () {
    $('.background-image').css({ 'filter': 'blur(0)' });
    $('.content').css({ 'filter': 'blur(0)' });
  });
});

$(function () {
  $('.btn-uslugi').click( function () {
    $('#modalUslugi').modal({'backdrop': 'static'});
    $('.background-image').css({ 'filter': 'blur(3px)' });
    $('.content').css({ 'filter': 'blur(2px)' });
  });

  $('#modalUslugi').on('hidden.bs.modal', function () {
    $('.background-image').css({ 'filter': 'blur(0)' });
    $('.content').css({ 'filter': 'blur(0)' });
  });
});

$(function () {
  wypozycjonujTerminarz();
});

$(function () {
  $('#mainNavbar a').click( function (event) {
    if (this.hash !== '') {
      event.preventDefault();
      var hash = this.hash;
      $('.kafelek-uslugi').css({ 'border-color': 'transparent' });
      $('.kafelek-kontakt').css({ 'border-color': 'transparent' });
      $('.kafelek-onas').css({ 'border-color': 'transparent' });
      $(hash).css({ 'border-color': '#e70404' });
      $('html, body').animate({
        scrollTop: ($(hash).offset().top - 65)
      }, 800, function () {
        window.location.hash = hash;
      });
    }
  });
});

$(function () {
  $('.btn-uslugi').mouseover(function (event) {
    var ktory = $(this).attr('data-podswietl');
    $('#' + ktory).css({ 'box-shadow': '0px 0px 10px 0px #f30202' });
  });

  $('.btn-uslugi').mouseout(function (event) {
    var ktory = $(this).attr('data-podswietl');
    $('#' + ktory).css({ 'box-shadow': '0px 0px 10px 0px #9c0000' });
  });
});
