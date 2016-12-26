
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
  alignHeights();
});

$(window).resize(function() {
  wypozycjonujTerminarz();
  alignHeights();
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
  $('.btn').mouseover(function (event) {
    var ktory = $(this).attr('data-podswietl');
    $('#' + ktory).css({ 'box-shadow': '0px 0px 10px 0px #f30202' });
  });

  $('.btn').mouseout(function (event) {
    var ktory = $(this).attr('data-podswietl');
    $('#' + ktory).css({ 'box-shadow': '0px 0px 10px 0px #9c0000' });
  });

  $('.btn').focus(function (event) {
    var ktory = $(this).attr('data-podswietl');
    $('#' + ktory).css({ 'box-shadow': '0px 0px 10px 0px #f30202' });
  });
});

$('.btn-uslugi').blur(function (event) {
  var ktory = $(this).attr('data-podswietl');
  $('#' + ktory).css({ 'box-shadow': '0px 0px 10px 0px #9c0000' });
});

function alignHeights() {
  var tallest = 0;
  var thisHeight = 0;
  var boxArray = $('#row-eq-height').children();
  console.log('Odpalam funkcje');
	for (var i = 0; i < boxArray.length; i++) {
    $(boxArray[i]).children('.kafelek-uslugi').css({ 'min-height': 'auto' });
    console.log(i);
    // boxArray[i].style.height = 'auto';
    thisHeight = $(boxArray[i]).height();
    console.log('Wyskosc: ' + thisHeight);
    if (thisHeight > tallest) {
      tallest = thisHeight;
    }
  }

  console.log('Najwyzszy: ' + tallest);
  tallest = tallest + 20;
  for (var j = 0; j < boxArray.length; j++) {
    $(boxArray[j]).children('.kafelek-uslugi').css({ 'min-height': tallest + 'px' });
  }
}

// $(function () {
//   alignHeights();
// });
// // window.onresize = function () {
// // 	setTimeout(alignHeights, 200);
// // }
