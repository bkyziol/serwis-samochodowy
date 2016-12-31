var scrollTimeout;
var procent = -40;

function wykrytoScrollowanie() {
  var goraOkna = $(window).scrollTop();
  var dolOkna = $(window).scrollTop() + $(window).height();
  var koniecKaflaTermiarz = $('#divTerminarz').height() + $('#divTerminarz').offset().top + 70;
  var poczatekKafelkow = $('.kafelek-uslugi').first().offset().top;
  var $dzieciTab = $('.ukryty');

  if (poczatekKafelkow < dolOkna) {
    $.each($dzieciTab, function (i, kafelek) {
      if (dolOkna > $(kafelek).offset().top) {
        $(kafelek).fadeTo(150, 1);
        $(kafelek).removeClass('ukryty')
      }
    });
  }

  if (koniecKaflaTermiarz <  goraOkna) {
    $('.terminarz-maly').animate({
      left: '0px',
    }, 200);

  }
  if (koniecKaflaTermiarz >=  goraOkna)  {
    $('.terminarz-maly').animate({
      left: '-30px',
    }, 200);
    $('.kafelek-terminarz').animate({
      left: '0px',
    }, 300);
  }
};

function wypozycjonujTerminarz() {
  var trzeciaCzescWysokosciOkna = (($(window).height() - $('#divTerminarz').height()) / 3);
  $('#divTerminarz').css({
    'margin-top': trzeciaCzescWysokosciOkna + 'px',
    'margin-bottom': (trzeciaCzescWysokosciOkna * 2) + 'px',
  });
  $('.container-terminarz').css({ 'min-height': ($(window).height() - 50) + 'px' });
}

function dostosujWysokosc() {
  var najwyzszy = 0;
  var wysokosc = 0;
  var dzieciTab = $('#row-uslugi').children();
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

function poczatekTapety() {
  var polecenie = 'radial-gradient(rgba(0,0,0,0) ' + procent + '%, black ' + (procent + 30) + '%)';
  $('.container-terminarz').css('background', polecenie);
  procent++;
  if (procent < 100) {
    setTimeout(poczatekTapety, 1);
  }
}

function podswietlonyPrzycisk() {
  $('.btn-terminarz').animate({
    // 'background': 'linear-gradient(to right, red , yellow)',
    'background-color': '#ff0000',
  }, 300);
  $('.btn-terminarz').animate({
    'background-color': '#dc0000',
  }, 300);
  setTimeout(podswietlonyPrzycisk, 4000);
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
  $('.background-image').addClass('rozmycie');
  $('.content').addClass('rozmycie');
}

function wyostrzenie() {
  $('.background-image').removeClass('rozmycie');
  $('.content').removeClass('rozmycie');
}

function podswietl() {
  var ktory = $(this).attr('data-podswietl');
  $('#' + ktory).removeClass('przygas').addClass('podswietl');
}

function przygas() {
  var ktory = $(this).attr('data-podswietl');
  $('#' + ktory).removeClass('podswietl').addClass('przygas');
}

$(window).scroll(function () {
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
    scrollTimeout = null;
  };
  scrollTimeout = setTimeout(wykrytoScrollowanie, 50);
});

$(window).resize(function () {
  wypozycjonujTerminarz();
  dostosujWysokosc();
});

$(function () {
  wypozycjonujTerminarz();
  dostosujWysokosc();
  poczatekTapety();
  podswietlonyPrzycisk();


  $('.ukryty').fadeTo(0 , 0.4);
  $('.navbar').fadeTo(0 ,0.4);

  setTimeout(function(){
    $('.kafelek-terminarz').animate({
      left: '0',
    }, 400);
    $('.navbar').fadeTo(400, 0.94);
  }, 600);

  $('#divTerminarz').on('click', function () {
    $('#modalTerminarz').modal({ 'backdrop':'static' });
  });

  $('.terminarz-maly').on('click', function () {
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
