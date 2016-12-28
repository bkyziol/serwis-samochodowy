
function wypozycjonujTerminarz() {
  var wysokoscOkna = (($(window).height() - $('#kafelek-terminarz').height()) / 3);
  $('#kafelek-terminarz').css({
    'margin-top': wysokoscOkna + 'px',
    'margin-bottom': (wysokoscOkna * 2) + 'px',
  });
  $('.container-terminarz').css({ 'min-height': ($(window).height() - 50) + 'px' });
}

function dostosujWysokosc() {
  var najwyzszy = 0;
  var wysokosc = 0;
  var dzieciTab = $('#row-eq-height').children();
	for (var i = 0; i < dzieciTab.length; i++) {
    $(dzieciTab[i]).children('.kafelek-uslugi').css({ 'min-height': 'auto' });
    wysokosc = $(dzieciTab[i]).height();
    if (wysokosc > najwyzszy) {
      najwyzszy = wysokosc;
    }
  }
  najwyzszy = najwyzszy + 20;
  for (var j = 0; j < dzieciTab.length; j++) {
    $(dzieciTab[j]).children('.kafelek-uslugi').css({ 'min-height': najwyzszy + 'px' });
  }
}

function powolneScrollowanie() {
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

function rozmycie() {
  $('.background-image').css({ 'filter': 'blur(3px)' });
  $('.content').css({ 'filter': 'blur(2px)' });
}

function wyostrzenie() {
  $('.background-image').css({ 'filter': 'blur(0)' });
  $('.content').css({ 'filter': 'blur(0)' });
}

function podswietl() {
  var ktory = $(this).attr('data-podswietl');
  $('#' + ktory).css({ 'box-shadow': '0px 0px 10px 0px #f30202' });
  // console.log(this);
}

function przygas() {
  var ktory = $(this).attr('data-podswietl');
  $('#' + ktory).css({ 'box-shadow': '0px 0px 10px 0px #9c0000' });
}

$(window).resize(function () {
  wypozycjonujTerminarz();
  dostosujWysokosc();
});

$(function () {

  wypozycjonujTerminarz();

  dostosujWysokosc();

  $('#kafelek-terminarz').on('click', function () {
    $('#modalTerminarz').modal({ 'backdrop':'static' });
    rozmycie();
  });

  $('.btn-uslugi').on('click', function () {
    $('#modalUslugi').modal({ 'backdrop':'static' });
    rozmycie();
  });

  $('#modalTerminarz').on('hidden.bs.modal', wyostrzenie);

  $('#modalUslugi').on('hidden.bs.modal', wyostrzenie);

  $('.btn').mouseover(function () {
    podswietl.call(this);
  });

  $('.btn').mouseout(function () {
    przygas.call(this);
  });

  $('.btn').focus(function () {
    podswietl.call(this);
  });

  $('.btn-uslugi').blur(function () {
    przygas.call(this);
  });

  $('#mainNavbar a').click(function (event) {
    powolneScrollowanie.call(this);
  });

  $('#modalTerminarz').modal({ 'backdrop':'static' });
  
});
