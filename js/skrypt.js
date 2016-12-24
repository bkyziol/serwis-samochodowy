
function wypozycjonujTerminarz() {
  var wysokoscOkna = (($(window).height() - $('#kafelek-terminarz').height()) / 3);
  $('#kafelek-terminarz').css({
    'margin-top': wysokoscOkna + 'px',
    'margin-bottom': (wysokoscOkna * 2) + 'px',
  });
  $('.container-terminarz').css({ 'min-height': ($(window).height()-50) + 'px' });
}

function btnTerminarzBlink() {
  $('.btn-terminarz').animate({ 'box-shadow': '10px 10px 10px 10px yellow' }, 1000);
  //setTimeout(btnTerminarzBlink, 2000);
}

$(function () {
  wypozycjonujTerminarz();
  btnTerminarzBlink();
});

$(function () {
  $('#mainNavbar a').on('click', function (event) {
    if (this.hash !== '') {
      event.preventDefault();
      var hash = this.hash;
      $('.kafelek-uslugi').css({ 'border-color': 'transparent' });
      $('.kafelek-kontakt').css({ 'border-color': 'transparent' });
      $('.kafelek-onas').css({ 'border-color': 'transparent' });
      $(hash).css({ 'border-color': '#e70404' });
      $('html, body').animate({
        scrollTop: ($(hash).offset().top-65)
      }, 800, function () {
        window.location.hash = hash;
      });
    }
  });
});
