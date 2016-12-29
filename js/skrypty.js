function wypozycjonujTerminarz() {
  var wysokoscOkna = (($(window).height() - $('#divTerminarz').height()) / 3);
  $('#divTerminarz').css({
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
    $('.kafelek-uslugi').removeClass('ramka');
    $('.kafelek-kontakt').removeClass('ramka');
    $('.kafelek-onas').removeClass('ramka');
    $(hash).addClass('ramka');
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
  $('.background-image').removeClass('wyostrzenie');
  $('.content').removeClass('wyostrzenie');
  $('.background-image').addClass('rozmycie');
  $('.content').addClass('rozmycie');
}

function wyostrzenie() {
  $('.background-image').removeClass('rozmycie');
  $('.content').removeClass('rozmycie');
  $('.background-image').addClass('wyostrzenie');
  $('.content').addClass('wyostrzenie');
}

function podswietl() {
  var ktory = $(this).attr('data-podswietl');
  $('#' + ktory).removeClass('przygas');
  $('#' + ktory).addClass('podswietl');
}

function przygas() {
  var ktory = $(this).attr('data-podswietl');
  $('#' + ktory).removeClass('podswietl');
  $('#' + ktory).addClass('przygas');
}

$(window).resize(function () {
  wypozycjonujTerminarz();
  dostosujWysokosc();
});

$(function () {

  wypozycjonujTerminarz();

  dostosujWysokosc();

  $('#divTerminarz').on('click', function () {
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

});
